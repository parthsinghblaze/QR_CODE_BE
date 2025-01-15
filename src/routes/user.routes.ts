import { Router } from 'express';
// Import the user controller
import userController from '../controllers/user.controller';
import { isAdmin, verifyToken } from "../middleware/roleMiddleware";
const userRoutes = Router();

// Define user-related routes
userRoutes.get("/users", isAdmin, userController.getAllUsers);
userRoutes.get("/my-info", verifyToken, userController.getMyInfo);
userRoutes.post("/verify/:user_id", isAdmin, userController.verify);
userRoutes.get("/:user_id", isAdmin, userController.userDetails);
userRoutes.get("/generate-qr-code/:user_id", isAdmin, userController.generateQRCode);

export default userRoutes;
