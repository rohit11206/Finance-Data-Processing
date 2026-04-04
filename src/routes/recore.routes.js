import express from "express";
import{ createRecord, getRecords, getRecordById, updateRecord, deleteRecord } from "../controllers/record.controller.js";
import { authMiddleware,authorizeRoles } from "../middleware/auth.middleware.js";

export const recordRoutes=express.Router();
recordRoutes.post("/", authMiddleware,authorizeRoles("admin", "user"), createRecord);
recordRoutes.get("/", authMiddleware, getRecords);
recordRoutes.get("/:id", authMiddleware, getRecordById);
recordRoutes.put("/:id", authMiddleware, authorizeRoles("admin", "user"), updateRecord);
recordRoutes.delete("/:id", authMiddleware, authorizeRoles("admin", "user"), deleteRecord);