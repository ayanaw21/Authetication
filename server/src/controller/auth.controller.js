import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
	const { fullName, email, password, balance } = req.body;
	try {
		if (!fullName || !email || !password || !balance) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (password.length < 8) {
			return res.status(400).json({
				message: "Password must be at least 8 characters",
			});
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}
		if (balance < 0) {
			return res
				.status(400)
				.json({ message: "balance should not be less than 0" });
		}
		const user = await User.findOne({ email });
		if (user)
			return res.status(400).json({ message: "email already exists" });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			balance: balance || 0,
			role: "user",
		});
		if (newUser) {
			// generateToken(newUser._id, res);
			// await newUser.save();

			await newUser.save();
			return res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				role: newUser.role,
				accountNumber: newUser.accountNumber,
				balance: newUser.balance,
			});
		} else {
			res.status(400).json({ message: "Invalid message data" });
		}
	} catch (error) {
		console.log("Error in controller: ", error);
		res.status(500).json({ message: "Internal sever error" });
	}
};

export const login = async (req, res) => {
	const { accountNumber, password } = req.body;

	if (!accountNumber || !password) {
		return res
			.status(400)
			.json({ message: "Email and password are required" });
	}

	try {
		const user = await User.findOne({ accountNumber });
		if (!user) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}
		if (user.lockUntil && user.lockUntil > Date.now()) {
			const remainingTime = Math.ceil(
				(user.lockUntil - Date.now()) / 60000
			);
			return res.status(403).json({
				message: `Account locked. Try again in ${remainingTime} minutes.`,
			});
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			user.loginAttempts += 1;
			if (user.loginAttempts >= 3) {
				user.lockUntil = Date.now() + 3600000;
				user.isLocked = true;

				await user.save();
				return res.status(403).json({
					message: "Too many attempts. Account locked for 1 hour.",
				});
			}
			await user.save();

			// Better UX: Tell them how many tries are left
			const remaining = 3 - user.loginAttempts;
			return res.status(400).json({
				message: `Invalid Credentials. ${remaining} attempts remaining.`,
			});
		}
		user.loginAttempts = 0;
		user.lockUntil = undefined;
		user.isLocked = false;
		await user.save();
		generateToken(user._id, res);
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			role: user.role,
			balance: user.balance,
			accountNumber: user.accountNumber,
		});
	} catch (error) {
		console.error("Error in login controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
export const logout = async (_, res) => {
	res.cookie("jwt", "", { maxAge: 0 });
	res.status(200).json({ message: "Logged out successfully" });
};
