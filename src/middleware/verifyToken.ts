import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

    if (!token) return res.status(403).json({ message: "Token is required" });

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid or expired token" });

        req.user = decoded; // Add user info to the request object for use in protected routes
        next();
    });
};

export default verifyToken;
