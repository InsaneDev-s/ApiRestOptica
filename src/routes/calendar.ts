import {  Router } from "express";
import { createGoogleCalendarEvent } from "../controllers/calendar";
const router = Router()

/**
 * Esta es la ruta para mostrar la lista de clientes
 * http://localhost:3002/items[Post] 
 */


//Rutas
router.post("/create-event", createGoogleCalendarEvent);


export {router}