import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6, // This will act as your secure PIN/Password
		},
		accountNumber: {
			type: String,
			unique: true,
			default: () =>
				Math.floor(1000000000 + Math.random() * 9000000000).toString(), // Generates a random 9-digit ID
		},
		// ADDED: Financial Balance
		balance: {
			type: Number,
			required: true,
			default: 0,
			min: [0, "Balance cannot be negative"], // Safety check
		},
		role: {
			type: String,
			default: "user",
			enum: ["user", "admin", "manager"],
		},
		// OPTIONAL: Account Status
		isLocked: {
			type: Boolean,
			default: false, // Useful for "Too many failed PIN attempts"
		},
		loginAttempts: {
			type: Number,
			required: true,
			default: 0,
		},
		lockUntil: {
			type: Number, // We store a timestamp (in milliseconds)
		},
	},
	{ timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
