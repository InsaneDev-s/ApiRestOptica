import {Router} from "express"
import {loginUser, registerUser} from "../controllers/auth"

const router = Router()

router.get("/login", loginUser)
router.post("/", registerUser)


export default router