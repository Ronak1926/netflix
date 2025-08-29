import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router()


router.get("/signup",signup)
router.get("/logout",login)
router.get("/login",logout)



export default router