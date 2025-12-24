import express from "express";
import { deposit, getHistory, withdrawal } from "../controller/transaction.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/withdraw",protectRoute,withdrawal)
router.post("/deposit",protectRoute,deposit)
router.get("/history",protectRoute,getHistory)

export default router