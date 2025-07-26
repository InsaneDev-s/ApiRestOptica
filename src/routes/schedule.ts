import {Router} from "express"

import { getReminder, postReminder, deleteReminder } from "../controllers/scheduling"
const router = Router()

router.get("/schedule", getReminder)
router.post("/addReminder",postReminder )
router.delete("/:id",deleteReminder)


export default router
