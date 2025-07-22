import {Request, Response,Router} from "express"
import {loginCtrl} from "../controllers/auth"

const router = Router()

router.post("/login")

export {router}