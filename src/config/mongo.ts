import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config({ path: '.env' });

console.log("process.env.MONGO_URI", process.env.MONGO_URI)

const mongoConfig = {
    url: process.env.MONGO_URI || '', // Load connection URL from environment variable
};

export const connectToDatabase = async () => {
    try {
        if (!mongoConfig.url) {
            throw new Error('MongoDB connection URL is not defined in the environment variables.');
        }
        await mongoose.connect(mongoConfig.url);
        console.log('Connected to MongoDB successfully!');
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process if connection fails
    }
};

export default mongoConfig;
