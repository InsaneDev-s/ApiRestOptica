// src/controllers/birthday.ts
import { Request, Response } from "express";
import ClientModel from "../models/client";

export const getBirthdays = async (req: Request, res: Response) => {
  try {
    const mes = Number(req.params.mes); // 1..12
    if (!mes || mes < 1 || mes > 12) {
      return res.status(400).json({ message: "Mes inválido" });
    }

    const patients = await ClientModel.aggregate([
      // Normaliza a Date: si es string -> toDate; si ya es date -> úsala; si no, null
      {
        $set: {
          bday: {
            $switch: {
              branches: [
                { case: { $eq: [{ $type: "$birthday" }, "date"] }, then: "$birthday" },
                { case: { $eq: [{ $type: "$birthday" }, "string"] }, then: { $toDate: "$birthday" } },
              ],
              default: null,
            },
          },
        },
      },
      // Solo fechas válidas
      { $match: { bday: { $type: "date" } } },

      // Mes con timezone local
      {
        $addFields: {
          parts: { $dateToParts: { date: "$bday", timezone: "America/Guayaquil" } },
        },
      },
      { $match: { "parts.month": mes } },

      // Proyección final
      {
        $project: {
          _id: 1,
          name: 1,
          second_name: 1,
          birthday: "$bday",
        },
      },
    ]);

    const birthdays = patients.map((p: any) => ({
      id: p._id,
      name: `${p.name} ${p.second_name || ""}`.trim(),
      date: p.birthday,
    }));

    res.json(birthdays);
  } catch (error) {
    console.error("Error al obtener cumpleaños:", error);
    res.status(500).json({ message: "Error al obtener cumpleaños" });
  }
};
