import { Router } from 'express';
// Import the user controller
import userController from '../controllers/user.controller';
import isAdmin from "../middleware/roleMiddleware";

const userRoutes = Router();

// Define user-related routes
userRoutes.get("/users", isAdmin, userController.getAllUsers);

export default userRoutes;
