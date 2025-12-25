import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",protectRoute,isAdmin ,register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check",protectRoute,(req,res)=> res.status(200).json(req.user))

router.get("/", (req, res) => res.status(200).json({ message: "hello" }));

export default router;
