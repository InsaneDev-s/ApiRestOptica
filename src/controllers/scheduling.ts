import {Request, Response} from "express"
import models from "../models"

const getReminder = async({params}:Request, res:Response)=>{
try{
    const {id} = params
    const reminderClient = await models.schedules.findById(id)
    if(!reminderClient){
        return res.status(404).json({ message: "Cita no encontrada" });   
    }
    res.send(reminderClient);
}catch(e){
 console.error("Error en obtener la cita del Cliente:", e);
    res.status(500).json({ message: "Error interno del servidor", error: e });
}
} 

const postReminder = async(req:Request, res: Response )=>{
   try{
    const body = req.body
    if (Object.keys(body).length === 0) {
            return res.status(400).json({ message: 'El cuerpo de la petición está vacío.' });
    }
    const scheduleCount = await models.clients.countDocuments();
    const newScheduleId = scheduleCount + 1;

    const newReminder = await models.schedules.create({
        ...body,
        id: newScheduleId,
    });
        res.status(201).json(newReminder);    
   }catch (e){
        console.error("Error en ingresar la cita:", e);
        res.status(500).json({ message: "Error interno del servidor", error: e });
   }
   
}
const deleteReminder = async (req:Request,res:Response)=>{
try{
    const {id} = req.params
    const deleteReminder = await models.schedules.findByIdAndDelete({_id:id})
      if (!deleteReminder) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
   res.status(200).json(deleteReminder)
}catch (e){
     console.error("Error en eliminar la cita:", e);
    res.status(500).json({ message: "Error interno del servidor", error: e });
}
}

export {getReminder, postReminder, deleteReminder}