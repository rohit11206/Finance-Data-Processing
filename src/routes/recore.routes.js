import express from "express";
import{ createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord } from "../controllers/record.controller.js";
import { authMiddleware,authorizeRoles } from "../middlewares/Auth.middleware.js";

export const recordRoutes=express.Router();
recordRoutes.post("/", authMiddleware,authorizeRoles("admin", "user"), createRecord);
recordRoutes.get("/", authMiddleware, getAllRecords);
recordRoutes.get("/:id", authMiddleware, getRecordById);
recordRoutes.put("/:id", authMiddleware, authorizeRoles("admin", "user"), updateRecord);
recordRoutes.delete("/:id", authMiddleware, authorizeRoles("admin", "user"), deleteRecord);