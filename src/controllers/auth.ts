import { Request, Response } from "express";
import models from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secreto_seguro";
export const registerCtrl = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;

    const usuarioExistente = await models.users.findOne({ mail });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Correo ya registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await models.users.create({
      mail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: nuevoUsuario._id,
        mail: nuevoUsuario.mail,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
};

export const loginCtrl = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;

    const user = await models.users.findOne({ mail });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id, mail: user.mail }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, mail: user.mail } });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
};