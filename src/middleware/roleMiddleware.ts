import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';  // Adjust this import as needed

// Middleware to check if the user is authenticated and an admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];  // Get the token from the Authorization header

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Check if the role is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, only admins can access this resource' });
        }

        // Attach the user info to the request object
        req.user = decoded;  // Optionally, you can use this to get user details in future requests

        next();  // Allow the request to proceed
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default isAdmin;
