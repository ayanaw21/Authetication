import express from "express";
import { login, logout, signUp } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", (req, res) => res.status(200).json({ message: "hello" }));

export default router;
