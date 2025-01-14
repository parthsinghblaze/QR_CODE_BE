import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bcryptConfig from '../config/bcrypt';
import jwtConfig from '../config/jwtConfig';

const authController = {
    // Create a new user with default role 'user'
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password: passwordBody } = req.body;

            if (!name || !email || !passwordBody) {
                return next({ statusCode: 400, message: "Missing data" });
            }

            // Check if user already exists
            const isUserExists = await User.findOne({ email }).exec();
            if (isUserExists) {
                return next({ statusCode: 401, message: "User Already Exists" });
            }

            // Hash the password
            const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);

            // Create a new user with default 'user' role
            const newUser = await new User({
                name,
                email,
                password,
                role: 'user', // Default role is 'user'
            }).save();

            return res.status(201).json(newUser);

        } catch (err) {
            return next(err); // Pass the error to the next middleware (error handler)
        }
    },

    // Login for User
    userLogin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next({ statusCode: 400, message: "Missing Data" });
            }

            // Find user by email
            const user = await User.findOne({ email }).exec();

            if (!user) {
                return next({ statusCode: 401, message: "Email or Password is Wrong!" });
            }

            // Check if password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return next({ statusCode: 401, message: "Email or Password is Wrong!" });
            }

            // Generate JWT Token for User
            const token = jwt.sign(
                { _id: user._id, name: user.name, email: user.email, role: user.role },
                jwtConfig.secret,
                { expiresIn: jwtConfig.expiresIn } // Token expires in the duration specified in jwtConfig
            );

            if(user.role === 'admin') {
                return res.status(401).json({
                    message: 'Only user can you login this'
                })
            }

            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // Include role in the response
                token,
            });

        } catch (err) {
            return next(err); // Pass the error to the next middleware (error handler)
        }
    },

    // Login for Admin
    adminLogin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next({ statusCode: 400, message: "Missing Data" });
            }

            // Find user by email
            const user = await User.findOne({ email }).exec();

            if (!user || user.role !== 'admin') {
                return next({ statusCode: 401, message: "Admin credentials are incorrect" });
            }

            // Check if password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return next({ statusCode: 401, message: "Email or Password is Wrong!" });
            }

            // Generate JWT Token for Admin
            const token = jwt.sign(
                { _id: user._id, name: user.name, email: user.email, role: user.role },
                jwtConfig.secret,
                { expiresIn: jwtConfig.expiresIn } // Token expires in the duration specified in jwtConfig
            );

            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // Include role in the response
                token,
            });

        } catch (err) {
            return next(err); // Pass the error to the next middleware (error handler)
        }
    },

    validateAdminToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId);

            return res.status(200).json({ data:  user });
        } catch (err) {
            // Handle errors
            return next()
        }
    },

    validateUserToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId);

            return res.status(200).json({ data:  user });
        } catch (err) {
            // Handle errors
            return next()
        }
    },
};

export default authController;
