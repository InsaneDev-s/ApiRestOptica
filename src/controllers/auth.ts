import { Request, Response } from "express";
import { models } from "mongoose";
import { handleHttp } from "../utils/error.handle";

export const loginCtrl = async ({body}:Request, res:Response)=>{
    try{
    const { email, password } = body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }
     const user = await models.users.findOne({ email });
       if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.send(user)
    }catch(e){
     handleHttp(res, "ERROR_LOGIN");
    }
}