import { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import ClientModel from "../models/client";

dotenv.config();

export const createGoogleCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { client, date, hour, status, notes } = req.body;

    if (!client || !date || !hour || !notes) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const foundClient = await ClientModel.findById(client);
    if (!foundClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const clientName = `${foundClient.name} ${foundClient.second_name}`;

    // OAuth2 Client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Setear refresh token
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Obtener un access token válido automáticamente
    await oAuth2Client.getAccessToken();

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const startDateTime = new Date(`${date}T${hour}:00`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    const event = {
      summary: `Cita con cliente ${clientName}`,
      description: `${notes} | Estado: ${status}`,
      start: { dateTime: startDateTime.toISOString(), timeZone: "America/Guayaquil" },
      end: { dateTime: endDateTime.toISOString(), timeZone: "America/Guayaquil" },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return res.status(200).json({ message: "Evento creado en Google Calendar", eventId: response.data.id });

  } catch (error: any) {
    console.error("Error al crear evento:", error);
    const message = error.response?.data?.error?.message || "Error al crear evento en calendario";
    return res.status(error.response?.status || 500).json({ message });
  }
};
