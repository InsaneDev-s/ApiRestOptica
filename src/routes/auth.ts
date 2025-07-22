import {Router} from "express"
import {loginCtrl} from "../controllers/auth"

const router = Router()

router.post("/:email", loginCtrl)

export {router}