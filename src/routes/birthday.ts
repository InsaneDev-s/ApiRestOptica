import { Router } from "express";
import { getBirthdays } from "../controllers/birthday";

const router = Router();

router.get("/cumpleanieros/:mes", getBirthdays);

export default router;