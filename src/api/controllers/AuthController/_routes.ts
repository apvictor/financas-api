import { Router } from "express";
import { AuthController } from ".";
import { Validate } from "../../../middlewares/Validate";
import { AuthValidation } from "../../validations/AuthValidation";

export const authRoutes = Router();

authRoutes.post("/register", Validate(AuthValidation.register), AuthController.register);
authRoutes.post("/login", Validate(AuthValidation.login), AuthController.login);
