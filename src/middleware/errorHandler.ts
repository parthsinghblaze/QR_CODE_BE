import { Request, Response, NextFunction } from 'express';

// A simple error handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("error", err); // Log the error for debugging purposes

    const status = err.statusCode || 500; // Default to 500 if no status code is specified
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message, status });
};

export default errorHandler;
