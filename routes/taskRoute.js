import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
} from "../controllers/taskController.js";
import { Protect } from "../middleware/Protect.js";

const router = Router();

router.post("/create-task", Protect, createTask);

router.get("/get-tasks", Protect, getTask);

router.get("/get-task/:id", Protect, getTaskById);

router.delete("/delete-task/:id", Protect, deleteTask);

export default router;
