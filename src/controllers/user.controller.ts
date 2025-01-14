import {NextFunction, Request, Response} from 'express';
import User from '../models/User';

const userController = {
    // Get all users with role 'user'
    getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Find all users with role 'user'
            const users = await User.find({ role: 'user' }).exec();

            // If no users are found
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users found with role "user"' });
            }

            // Return the users
            return res.status(200).json({ data:  users });
        } catch (err) {
            // Handle errors
            return next()
        }
    },

    getMyInfo: async (req: Request, res: Response, next: NextFunction) => {
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

export default userController;
