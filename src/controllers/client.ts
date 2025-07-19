import {Request,Response} from "express"
import { handleHttp } from "../utils/error.handle"
import { insertClient } from "../services/client.service"

const getClient = (req:Request,res:Response)=>{
try{

}catch (e){
    handleHttp(res, 'ERROR_GET_CLIENT')
}
}

const getClients = (req:Request,res:Response)=>{
try{

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

const postClient = async (req:Request,res:Response)=>{
try{     
    const body = req.body
    //const responseItem = await insertClient(body)
    console.log(req)
    res.send(body)
}catch (e){
     handleHttp(res, 'ERROR_POST_CLIENTS',e)
}
}

const deleteClient = (req:Request,res:Response)=>{
try{

}catch (e){
     handleHttp(res, 'ERROR_DELETE_CLIENTS')
}
}

export {getClient, getClients, updateClient,postClient,deleteClient}