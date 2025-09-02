import express from "express";
import { login, logout, signup,authCheck } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/protect.route.js"
const router = express.Router()


router.post("/signup",signup)
router.post("/logout",logout)
router.post("/login",login)

router.get("/authCheck",protectRoute,authCheck)


export default router