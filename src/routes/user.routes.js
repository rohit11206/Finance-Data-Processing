import express from "express";
import {getAllUsers, getUserById,updateUser,deleteUser,} from "../controllers/user.controller.js";

import { authMiddleware, authorizeRoles } from "../middleware/auth.middleware.js";

export const userRoutes = express.Router();

userRoutes.get("/",authMiddleware,authorizeRoles("admin"),getAllUsers);
userRoutes.get("/:id",authMiddleware,authorizeRoles("admin"),getUserById);
userRoutes.put("/:id",authMiddleware, authorizeRoles("admin"),updateUser);
userRoutes.delete("/:id",authMiddleware,authorizeRoles("admin"),deleteUser);