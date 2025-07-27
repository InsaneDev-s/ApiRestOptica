import { Router } from "express";
import {
  getReminders,
  postReminder,
  deleteReminder
} from "../controllers/scheduling";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Obtener todos los recordatorios
router.get("/reminders/res", authMiddleware, getReminders);

// Crear un nuevo recordatorio
router.post("/addReminder",authMiddleware, postReminder);

// Eliminar un recordatorio por ID
router.delete("/reminders/:id",authMiddleware, deleteReminder);

export default router;