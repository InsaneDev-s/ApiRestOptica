// src/controllers/birthday.ts
import type { Request, Response } from "express";
import models from "../models";

export async function getBirthdays(req: Request, res: Response) {
  try {
    const mes = Number(req.params.mes);

    if (!mes || mes < 1 || mes > 12) {
      res.status(400).send({
        message: "Invalid month. Must be between 1 and 12."
      });
      return;
    }

    // Get clients with birthdays in the specified month
    const clients = await models.clients.aggregate([
      {
        $addFields: {
          birthMonth: { $month: "$birthday" }
        }
      },
      {
        $match: { 
          birthMonth: mes,
          birthday: { $exists: true, $ne: null }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          second_name: 1,
          birthday: 1
        }
      },
      {
        $sort: { birthday: 1 }
      }
    ]);

    const birthdays = clients.map(client => ({
      id: client._id,
      name: `${client.name} ${client.second_name || ""}`.trim(),
      birthday: client.birthday
    }));

    res.status(200).send({
      message: "Birthdays retrieved successfully.",
      data: birthdays,
      count: birthdays.length
    });
    return;
  } catch (error) {
    console.error("Error getting birthdays:", error);
    res.status(500).send({
      message: "Internal server error while getting birthdays."
    });
    return;
  }
}
