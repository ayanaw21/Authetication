import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const withdrawal = async (req, res) => {
	const { amount } = req.body;
	const userId = req.user._id;

	try {
		if (!amount || amount <= 0) {
			return res.status(400).json({ message: "Invalid amount" });
		}
		const user = await User.findById(userId);

		if (user.balance < amount) {
			return res.status(400).json({ message: "Insufficient balance" });
		}
		user.balance -= amount;
		await user.save();

		const newTransaction = new Transaction({
			userId,
			type: "withdrawal",
			amount,
			balanceAfter: user.balance,
		});

		await newTransaction.save();

		res.status(200).json({
			message: "withdrawal successful",
			newBalance: user.balance,
			transaction: newTransaction,
		});
	} catch (error) {
		console.error("Transaction Error:", error);
		res.status(500).json({
			message: "Transaction failed. Please try again.",
		});
	}
};

export const deposit = async (req, res) => {
	const { amount } = req.body;
	const userId = req.user._id;

	try {
		if (!amount || amount <= 0) {
			return res.status(400).json({ message: "Invalid amount" });
		}
		const user = await User.findById(userId);

		user.balance += amount;
		await user.save();

		const newTransaction = new Transaction({
			userId,
			type: "deposit",
			amount,
			balanceAfter: user.balance,
		});

		await newTransaction.save();

		res.status(200).json({
			message: "withdrawal successful",
			newBalance: user.balance,
			transaction: newTransaction,
		});
	} catch (error) {
		console.error("Transaction Error:", error);
		res.status(500).json({
			message: "Transaction failed. Please try again.",
		});
	}
};

export const getHistory = async (req, res) => {
	try {
		const userId = req.user._id;
		const transactions = (await Transaction.find({ userId }))
			.toSorted({ createdAt: -1 })
			.limit(10);
        if(!transactions || transactions.length === 0){
            return res.status(200).json({transactions})
        }
	} catch (error) {
        console.error("Error in getHistory controller:", error.message);
        res.status(500).json({ message: "Internal server error while fetching history" });
    }
};
