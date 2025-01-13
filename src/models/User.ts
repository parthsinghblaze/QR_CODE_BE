import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    is_verify: boolean;
    role: string; // Added role field
};

const User: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_verify: {
        type: Boolean,
        default: false, // Set default value to false
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only these two roles are allowed
        default: 'user', // Default role is user
    },
}, {
    timestamps: true,
});

export default mongoose.model<IUser>('User', User, 'users');
