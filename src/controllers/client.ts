import {Request,Response} from "express"
import { handleHttp } from "../utils/error.handle"
import models from "../models"

const getClient = (req:Request,res:Response)=>{
try{

}catch (e){
    handleHttp(res, 'ERROR_GET_CLIENT')
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

const updateClient = (req:Request,res:Response)=>{
try{

}catch (e){
     handleHttp(res, 'ERROR_UPDATE_CLIENTS')
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

const deleteClient = (req:Request,res:Response)=>{
try{

}catch (e){
     handleHttp(res, 'ERROR_DELETE_CLIENTS')
}
}

export {getClient, getClients, updateClient,deleteClient}