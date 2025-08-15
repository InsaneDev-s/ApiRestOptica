import { Request, Response } from "express";
import ClientModel from "../models/client";

export const getBirthdays = async (req: Request, res: Response) => {
  try {
    const mes = Number(req.params.mes); // mes del 1 al 12

    if (!mes || mes < 1 || mes > 12) {
      return res.status(400).json({ message: "Mes inválido" });
    }

    // Filtrar directamente en MongoDB
    const patients = await ClientModel.aggregate([
      {
        $addFields: {
          month: { $month: "$birthdate" }
        }
      },
      {
        $match: { month: mes }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          second_name: 1,
          birthdate: 1
        }
      }
    ]);

    const birthdays = patients.map(p => ({
      id: p._id,
      name: `${p.name} ${p.second_name || ""}`.trim(),
      date: p.birthdate
    }));

    res.json(birthdays);
  } catch (error) {
    console.error("Error al obtener cumpleaños:", error);
    res.status(500).json({ message: "Error al obtener cumpleaños" });
  }
};
