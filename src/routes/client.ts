import {  Router } from "express";
import {  getClient, getClients, postClient, updateClient, deleteClient } from "../controllers/client";

const router = Router()

/**
 * Esta es la ruta para mostrar la lista de clientes
 */


//Rutas
router.get('/clients', getClients)
router.get('/:id', getClient)
router.post('/addClient',postClient)
router.put('/:id',updateClient)
router.delete('/:id',deleteClient)


export default router