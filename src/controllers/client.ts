import {Request,Response} from "express"
import { handleHttp } from "../utils/error.handle"
import models from "../models"

const getClient = async({params}:Request,res:Response)=>{
try{
    const { id } = params;
    const client = await models.clients.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.send(client);
}catch (e){
    console.error("Error en Obtener al cliente:", e);
    res.status(500).json({ message: "Error interno del servidor", error: e });
}
}
const getClients = async (req:Request,res:Response)=>{
try{
   const clients = await models.clients.find()
   res.send(clients)
}catch (e){
     handleHttp(res, 'ERROR_GET_CLIENTS')
}
}

export async function updateClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const update = req.body;

    const upClient = await models.clients.findByIdAndUpdate(id, update, { new: true });

    if (!upClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(upClient);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_CLIENTS', e);
  }
}

export async function postClient(req: Request, res: Response) {
    try {
        const body = req.body;

        if (Object.keys(body).length === 0) {
            return res.status(400).json({ message: 'El cuerpo de la petición está vacío.' });
        }

        const clientCount = await models.clients.countDocuments();
        const newClientId = clientCount + 1;

        const newClient = await models.clients.create({
            ...body,
            id: newClientId,
        });
        res.status(201).json(newClient);
    } catch (e) {
        console.error("Error en postClient:", e);
        res.status(500).json({ message: "Error interno del servidor", error: e });
    }
}

export async function  deleteClient (req:Request,res:Response){
try{
    const {id} = req.params
    const deleteC = await models.clients.findByIdAndDelete({_id:id})
      if (!deleteC) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
   res.status(200).json(deleteC)
}catch (e){
     handleHttp(res, 'ERROR_DELETE_CLIENTS')
}
}

export {getClient, getClients}