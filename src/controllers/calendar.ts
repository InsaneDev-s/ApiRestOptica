import { Request, Response } from "express";
import { google, calendar_v3 } from "googleapis";
import dotenv from "dotenv";
import ClientModel from "../models/client";
import TokenModel from "../models/tokenModel"

dotenv.config();

// Guardar/actualizar refresh token en MongoDB
const saveRefreshToken = async (newToken: string) => {
  await TokenModel.findOneAndUpdate(
    { name: "google_refresh_token" },
    { value: newToken },
    { upsert: true, new: true }
  );
  console.log("Nuevo refresh token guardado en DB");
};

// Obtener refresh token desde MongoDB
const getRefreshToken = async (): Promise<string | null> => {
  const tokenDoc = await TokenModel.findOne({ name: "google_refresh_token" });
  return tokenDoc?.value || null;
};

// Crear cliente OAuth2 configurado
const getOAuth2Client = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("No hay refresh token disponible");

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  // Escuchar tokens nuevos y guardar en DB
  oAuth2Client.on("tokens", async (tokens) => {
    if (tokens.refresh_token) await saveRefreshToken(tokens.refresh_token);
  });

  // Forzar obtener access token válido
  await oAuth2Client.getAccessToken();

  return oAuth2Client;
};

// Función principal
export const createGoogleCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { client, date, hour, status, notes } = req.body;

    if (!client || !date || !hour || !notes)
      return res.status(400).json({ message: "Faltan campos obligatorios" });

    const foundClient = await ClientModel.findById(client);
    if (!foundClient) return res.status(404).json({ message: "Cliente no encontrado" });

    const clientName = `${foundClient.name} ${foundClient.second_name}`;

    const oAuth2Client = await getOAuth2Client();
    let calendar: calendar_v3.Calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const startDateTime = new Date(`${date}T${hour}:00`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    const event: calendar_v3.Schema$Event = {
      summary: `Cita con cliente ${clientName}`,
      description: `${notes} | Estado: ${status}`,
      start: { dateTime: startDateTime.toISOString(), timeZone: "America/Guayaquil" },
      end: { dateTime: endDateTime.toISOString(), timeZone: "America/Guayaquil" },
    };

    // Intentar insertar evento hasta 2 veces si falla por token caducado
    let response: calendar_v3.Schema$Event | undefined;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const resInsert = await calendar.events.insert({ calendarId: "primary", requestBody: event });
        response = resInsert.data;
        break; // si tuvo éxito, salir del bucle
      } catch (err: any) {
        if (err.code === 403 && attempt === 0) {
          console.warn("Token caducado, obteniendo nuevo token y reintentando...");
          const newClient = await getOAuth2Client(); // refrescar token
          calendar = google.calendar({ version: "v3", auth: newClient });
        } else throw err;
      }
    }

    return res.status(200).json({
      message: "Evento creado en Google Calendar",
      eventId: response?.id,
    });

  } catch (error: any) {
    console.error("Error al crear evento:", error);
    const message = error.response?.data?.error?.message || error.message || "Error al crear evento en calendario";
    return res.status(error.response?.status || 500).json({ message });
  }
};
