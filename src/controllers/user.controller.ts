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

    verify: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.is_verify = !user.is_verify;

            await user.save();

            return res.status(200).json({
                message: "User verification status updated successfully",
                data: user,
            });
        } catch (err) {
            // Handle errors
            return next()
        }
    },
};

export default userController;
