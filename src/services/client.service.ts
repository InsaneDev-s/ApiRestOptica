import {Clients} from "../interfaces/clients.inferface"
import ClientModel from "../models/client"


const insertClient = async (client:Clients)=>{
    const responseInsert= await ClientModel.create(client)
    return responseInsert
}

export {insertClient}