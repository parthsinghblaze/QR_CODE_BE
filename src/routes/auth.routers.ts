import { Router } from 'express';
import authController from "../controllers/auth.controller";
import {isAdmin, isUser, verifyToken} from "../middleware/roleMiddleware";

const authRoutes = Router();

authRoutes.post("/create", authController.create);
authRoutes.post("/login", authController.userLogin);
authRoutes.post("/admin/login", authController.adminLogin);
authRoutes.post("/validate-admin", isAdmin, authController.validateAdminToken);
authRoutes.post("/validate-user", isUser, authController.validateUserToken);

export default authRoutes;
