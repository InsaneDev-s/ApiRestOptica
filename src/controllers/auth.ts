import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { models } from "mongoose";
import { handleHttp } from "../utils/error.handle";

export const loginUser = async ({body}:Request, res:Response)=>{
    try{
    const { mail, password } = body;
    if (!mail || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }
     const user = await models.users.findOne({ mail, password });
       if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado o datos incorrectos." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect)
    res.send(user)
    }catch(e){
     handleHttp(res, "ERROR_LOGIN");
    }
}

export const registerUser = async (req:Request, res:Response)=>{
   try {
        const body = req.body;

        const userCount = await models.users.countDocuments();
        const newUserId = userCount + 1;

        const newUser = await models.users.create({
            ...body,
            id: newUserId,
        });
        res.status(201).json(newUser);
    } catch (e) {
        console.error("Error en register User:", e);
        res.status(500).json({ message: "Error interno del servidor", error: e });
    }
}