import express from 'express'
import { isAdmin, protectRoute } from '../middleware/auth.middleware.js'
import { getAllUsers, getProfile,unlockUser } from '../controller/user.controller.js'
const router = express.Router()

router.get("/profile",protectRoute,getProfile)
router.get("/all",protectRoute,isAdmin,getAllUsers)
router.patch("/unlock/:userId", protectRoute, isAdmin, unlockUser);

export default router;