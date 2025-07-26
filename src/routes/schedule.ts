import {Router} from "express"

import { getReminders, postReminder, deleteReminder } from "../controllers/scheduling"
const router = Router()

router.get("/schedule", getReminders)
router.post("/addReminder",postReminder )
router.delete("/:id",deleteReminder)


export default router
