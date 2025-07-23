import { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

export const createGoogleCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { client, date, hour, status, notes } = req.body;

    // Validación simple
    if (!client || !date || !hour || !notes) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    
    // Autenticación OAuth2
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // Crear fecha y hora en formato ISO
    const startDateTime = new Date(`${date}T${hour}:00`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // evento de 1 hora

    // Crear el evento
    const event = {
      summary: `Cita con cliente ${client}`,
      description: `${notes} | Estado: ${status}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/Guayaquil",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/Guayaquil" ,
      },
    };

    // Insertar evento
    const response = await calendar.events.insert({
      calendarId: "primary", // o ID de calendario específico
      requestBody: event,
    });

    return res.status(200).json({ message: "Evento creado en Google Calendar", eventId: response.data.id });

  } catch (error) {
    console.error("Error al crear evento:", error);
    return res.status(500).json({ message: "Error al crear evento en calendario" });
  }
};