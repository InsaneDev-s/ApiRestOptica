import {  Router } from "express";
import { createGoogleCalendarEvent } from "../controllers/calendar";
import { authMiddleware } from "../middleware/auth";
const router = Router()

/**
 * Esta es la ruta para mostrar la lista de clientes
 * http://localhost:3002/items[Post] 
 */


//Rutas
router.post("/create-event",authMiddleware, createGoogleCalendarEvent);


export default router
