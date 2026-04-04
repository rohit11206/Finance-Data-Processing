import express from "express";
import {register,login,forgotPassword,resetPassword} from "../controllers/auth.controllers.js";
export const authRoutes = express.Router();
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post('/forgot-password',forgotPassword);
authRoutes.post('/reset-password/',resetPassword );
