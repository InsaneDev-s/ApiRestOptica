import { Router } from "express";
import { getBirthdays } from "../controllers/birthday";
const router = Router();

router.get("/birthdays", getBirthdays);

export default router;