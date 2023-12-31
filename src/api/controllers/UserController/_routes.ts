import { Router } from "express";
import { UserController } from ".";
import { UserAuth } from "../../../middlewares/UserAuth";

export const userRoutes = Router();

userRoutes.get("/users/me", UserAuth, UserController.me);
userRoutes.get("/users", UserController.getUsers);
