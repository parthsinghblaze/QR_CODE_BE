import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from "./auth.routers";

const routes = Router();

// Use the user routes
routes.use('/api/user', userRoutes);
routes.use('/api/auth', authRoutes);

export default routes;