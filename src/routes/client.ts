import {  Router } from "express";
import {  getClient, getClients, postClient, updateClient, deleteClient } from "../controllers/client";

const router = Router()

/**
 * Esta es la ruta para mostrar la lista de clientes
 * http://localhost:3002/items[GET] 
 */


//Rutas
router.get('/', getClient)
router.get('/:id', getClients)
router.post('/',postClient)
router.put('/:id',updateClient)
router.delete('/:id',deleteClient)


export {router}