import { Router } from 'express';
// Import the user controller
import userController from '../controllers/user.controller';
import { isAdmin, verifyToken } from "../middleware/roleMiddleware";
const userRoutes = Router();

// Define user-related routes
userRoutes.get("/users", isAdmin, userController.getAllUsers);
userRoutes.get("/my-info", verifyToken, userController.getMyInfo);
userRoutes.post("/verify/:user_id", verifyToken, userController.verify);

export default userRoutes;
