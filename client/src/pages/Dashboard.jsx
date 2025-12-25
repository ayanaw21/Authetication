import React, { useState } from "react";
import {
	Wallet,
	ArrowDownCircle,
	ArrowUpCircle,
	LogOut,
	X,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
	const { currentUser, logout, deposit, withdraw, history } =
		useAuth(); // Assuming withdraw is in your provider
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(""); // "deposit" or "withdraw"
	console.log("history", history);
	const user = {
		name: currentUser?.fullName || "User",
		cardNumber: currentUser?.accountNumber || "0000",
		balance: currentUser?.balance || 0,
	};

	// Static transactions for now

	const openModal = (type) => {
		setModalType(type);
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-gray-100 relative">
			{/* Modal Overlay */}
			{isModalOpen && (
				<TransactionModal
					type={modalType}
					onClose={() => setIsModalOpen(false)}
					action={modalType === "deposit" ? deposit : withdraw}
				/>
			)}

			<header className="flex justify-between items-center bg-white px-8 py-4 shadow">
				<h1 className="text-xl font-bold text-blue-600">
					ATM User Dashboard
				</h1>
				<button
					onClick={logout}
					className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
				>
					<LogOut size={18} />
					Logout
				</button>
			</header>

			<main className="max-w-6xl mx-auto p-6 space-y-6">
				{/* User Info & Balance */}
				<div className="grid md:grid-cols-2 gap-6">
					<section className="bg-white p-6 rounded-lg shadow flex flex-col justify-center">
						<h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-2">
							Welcome Back
						</h2>
						<p className="text-xl font-bold text-gray-800">
							{user.name}
						</p>
						<p className="text-gray-500 font-mono">
							Acc: {user.cardNumber}
						</p>
					</section>

					<section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-medium opacity-80 mb-2">
							Total Balance
						</h2>
						<p className="text-4xl font-black">
							{user.balance.toLocaleString()} ETB
						</p>
					</section>
				</div>

				{/* Action Buttons */}
				<section className="grid md:grid-cols-3 gap-6">
					<ActionCard
						icon={<ArrowDownCircle size={32} />}
						title="Withdraw Cash"
						description="Secure cash withdrawal"
						onClick={() => openModal("withdraw")}
					/>
					<ActionCard
						icon={<ArrowUpCircle size={32} />}
						title="Deposit"
						description="Add money to your account"
						onClick={() => openModal("deposit")}
					/>
					<ActionCard
						icon={<Wallet size={32} />}
						title="View Balance"
						description="Check your account details"
						onClick={() => {}} // Already displayed above
					/>
				</section>

				{/* Transactions Table */}
				{/* Transactions Table */}
				<section className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
						Recent Transactions
					</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-left">
							<thead>
								<tr className="text-gray-400 text-sm">
									<th className="py-2">Type</th>
									<th className="py-2">Amount</th>
									<th className="py-2 text-right">Date</th>
								</tr>
							</thead>
							<tbody>
								{/* Check if history exists and has items */}
								{history &&
								history.length > 0 ? (
									history.map((tx) => (
										<tr
											key={tx._id}
											className="border-b last:border-none hover:bg-gray-50"
										>
											<td className="py-3 font-medium capitalize">
												{tx.type}
											</td>
											<td
												className={`py-3 font-bold ${
													tx.type.toLowerCase() ===
													"withdrawal"
														? "text-red-500"
														: "text-green-500"
												}`}
											>
												{tx.type.toLowerCase() ===
												"withdrawal"
													? "-"
													: "+"}{" "}
												{tx.amount.toLocaleString()} ETB
											</td>
											<td className="py-3 text-right text-gray-500 text-sm">
												{/* Format the MongoDB ISO date string */}
												{new Date(
													tx.createdAt
												).toLocaleDateString()}{" "}
												at{" "}
												{new Date(
													tx.createdAt
												).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="3"
											className="py-10 text-center text-gray-400"
										>
											No recent transactions found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</main>
		</div>
	);
};

/* --- Action Card Component --- */
const ActionCard = ({ icon, title, description, onClick }) => (
	<button
		onClick={onClick}
		className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all border-b-4 border-transparent hover:border-blue-500 text-left w-full group"
	>
		<div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
			{icon}
		</div>
		<h3 className="text-lg font-bold text-gray-800">{title}</h3>
		<p className="text-gray-500 text-sm">{description}</p>
	</button>
);

/* --- Modal Component --- */
const TransactionModal = ({ type, onClose, action }) => {
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!amount || amount <= 0) return alert("Please enter a valid amount");

		setLoading(true);
		const result = await action(amount);
		setLoading(false);

		if (result.success) {
			alert(
				`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`
			);
			onClose();
		} else {
			alert(result.message || "Transaction failed");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
			<div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-gray-800 capitalize">
							{type} Funds
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
						>
							<X size={24} />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Enter Amount (ETB)
							</label>
							<input
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="0.00"
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-xl font-bold"
								autoFocus
							/>
						</div>

						<div className="bg-blue-50 p-4 rounded-xl">
							<p className="text-xs text-blue-600 leading-tight">
								* Please ensure you have sufficient funds for
								withdrawal operations. Daily limits may apply.
							</p>
						</div>

						<button
							disabled={loading}
							className={`w-full py-4 rounded-xl text-white font-bold transition-all ${
								type === "deposit"
									? "bg-green-600 hover:bg-green-700"
									: "bg-blue-600 hover:bg-blue-700"
							} ${
								loading ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							{loading ? "Processing..." : `Confirm ${type}`}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
