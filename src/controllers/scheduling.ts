import { Request, Response } from "express";
import mongoose from "mongoose";
import models from "../models";
import { handleHttp } from "../utils/error.handle";

// Obtener todos los recordatorios
const getReminders = async (req: Request, res: Response) => {
  try {
    const reminders = await models.schedules.find();
    res.status(200).json(reminders);
  } catch (e) {
    console.error("Error al obtener los recordatorios:", e);
    handleHttp(res, "ERROR_GET_REMINDERS");
  }
};

// Crear un nuevo recordatorio
const postReminder = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "El cuerpo de la petición está vacío." });
    }

    // Validar ObjectId del cliente
    if (!mongoose.Types.ObjectId.isValid(body.client)) {
      return res.status(400).json({ message: "El ID del cliente no es válido." });
    }

    // Normalizar status (opcional)
    if (body.status) {
      body.status = body.status.toLowerCase();
    }

    const scheduleCount = await models.schedules.countDocuments();
    const newScheduleId = scheduleCount + 1;

    const newReminder = await models.schedules.create({
      ...body,
      id: newScheduleId,
    });

    res.status(201).json(newReminder);
  } catch (e) {
    console.error("Error al crear el recordatorio:", e);
    handleHttp(res, "ERROR_CREATE_REMINDER", e);
  }
};

// Eliminar un recordatorio por ID
const deleteReminder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "El ID proporcionado no es válido." });
    }

    const deletedReminder = await models.schedules.findByIdAndDelete(id);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Recordatorio no encontrado." });
    }

    res.status(200).json({ message: "Recordatorio eliminado con éxito.", deletedReminder });
  } catch (e) {
    console.error("Error al eliminar el recordatorio:", e);
    handleHttp(res, "ERROR_DELETE_REMINDER", e);
  }
};

export { postReminder, deleteReminder, getReminders };