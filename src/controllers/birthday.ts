// src/controllers/birthday.ts
import { Request, Response } from "express";
import ClientModel from "../models/client";

export const getBirthdays = async (req: Request, res: Response) => {
  try {
    const patients = await ClientModel.find({}, "name second_name birthdate");

    const birthdays = patients.map(p => ({
      name: `${p.name} ${p.second_name}`,
      date: p.birthday
    }));

    res.json(birthdays);
  } catch (error) {
    console.error("Error al obtener cumpleaños:", error);
    res.status(500).json({ message: "Error al obtener cumpleaños" });
  }
};
