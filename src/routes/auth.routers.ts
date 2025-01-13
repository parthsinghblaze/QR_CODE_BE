import { Router } from 'express';
import authController from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/create", authController.create);
authRoutes.post("/login", authController.userLogin);
authRoutes.post("/admin/login", authController.adminLogin);
authRoutes.post("/validate-admin", authController.validateAdminToken);

export default authRoutes;
