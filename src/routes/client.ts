import {  Router } from "express";
import {  getClient, getClients, postClient, updateClient, deleteClient } from "../controllers/client";
import { authMiddleware } from "../middleware/auth";

const router = Router()

/**
 * Esta es la ruta para mostrar la lista de clientes
 */


//Rutas
router.get('/clients',authMiddleware, getClients)
router.get('/:id',authMiddleware, getClient)
router.post('/addClient',authMiddleware,postClient)
router.put('/:id',authMiddleware,updateClient)
router.delete('/:id',authMiddleware,deleteClient)


export default router