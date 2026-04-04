import express from "express";
import { getSummary, getCategoryStats, getMonthlyTrends, getRecentRecords } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
export const dashboardRoutes=express.Router();
dashboardRoutes.get("/summary", authMiddleware, getSummary);
dashboardRoutes.get("/category-stats", authMiddleware, getCategoryStats);
dashboardRoutes.get("/monthly-trends", authMiddleware, getMonthlyTrends);
dashboardRoutes.get("/recent-records", authMiddleware, getRecentRecords);
