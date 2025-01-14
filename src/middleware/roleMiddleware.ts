import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';  // Adjust this import as needed

// Middleware to check if the user is authenticated and an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];  // Get the token from the Authorization header

        if (!token) {
            return res.status(401).json({ message: 'INVALID TOKEN' });
        }

        // Verify the token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Check if the role is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'INVALID TOKEN' });
        }

        // Attach the user info to the request object
        req.user = decoded;  // Optionally, you can use this to get user details in future requests

        next();  // Allow the request to proceed
    } catch (err) {
        return res.status(401).json({ message: 'INVALID TOKEN' });
    }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];  // Get the token from the Authorization header

        if (!token) {
            return res.status(401).json({ message: 'INVALID TOKEN' });
        }

        // Verify the token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Check if the role is admin
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: 'INVALID TOKEN' });
        }

        // Attach the user info to the request object
        req.user = decoded;  // Optionally, you can use this to get user details in future requests

        next();  // Allow the request to proceed
    } catch (err) {
        return res.status(401).json({ message: 'INVALID TOKEN' });
    }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];  // Get the token from the Authorization header

        if (!token) {
            return res.status(401).json({ message: 'INVALID TOKEN' });
        }

        // Verify the token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Attach the user info to the request object
        req.user = decoded;  // Optionally, you can use this to get user details in future requests

        console.log("decoded", decoded)

        next();  // Allow the request to proceed
    } catch (err) {
        return res.status(401).json({ message: 'INVALID TOKEN' });
    }
};
