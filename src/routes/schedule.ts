import { Router } from "express";
import {
  getReminders,
  postReminder,
  deleteReminder
} from "../controllers/scheduling";

const router = Router();

// Obtener todos los recordatorios
router.get("/reminders", getReminders);

// Crear un nuevo recordatorio
router.post("/addReminder", postReminder);

// Eliminar un recordatorio por ID
router.delete("/reminders/:id", deleteReminder);

export default router;