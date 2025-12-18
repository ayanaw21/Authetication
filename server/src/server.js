import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import http from "http";
import { ENV } from "./lib/env.js";

dotenv.config();


import authRoutes from "./routes/auth.route.js"

import { connectDB } from "./lib/db.js";

const PORT = ENV.PORT || 3000;
const app = express();
const server = http.createServer(app);
app.use(express.json());

app.use(cors({ origin:ENV.CLIENT_URL, credentials: true }));

app.use(cookieParser());

// Routes 

app.use("/api/auth",authRoutes)

server.listen(5000, () => {
	console.log(`Server is running on port http://localhost:${5000}`);
	connectDB();
});
