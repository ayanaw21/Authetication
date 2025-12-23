import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token)
			return res
				.status(401)
				.json({ message: "unauthorized -No token provided" });

		const decoded = jwt.verify(token, ENV.JWT_SECRET);
		if (!decoded)
			return res
				.status(401)
				.json({ message: "unauthorized - Invalid token" });

		const user = await User.findById(decoded.userId).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });

		req.user = user;
		next();
	} catch (error) {
		console.error("Error in protectRoute middleware: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
export const isAdmin = async (req, res, next) => {
    try {
        if ( req.user && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied - Admins only" });
        }

       
        next();
    } catch (error) {
        console.error("Error in protectAdminRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};