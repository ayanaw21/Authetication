import React from "react";
import {
  CreditCard,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  // Mock data (replace with API response)
  const user = {
    name: "Ayanaw Mengesha",
    cardNumber: "**** **** **** 1234",
    balance: 4500,
  };

  const transactions = [
    { id: 1, type: "Withdrawal", amount: 500, date: "2025-01-10" },
    { id: 2, type: "Deposit", amount: 1000, date: "2025-01-08" },
    { id: 3, type: "Withdrawal", amount: 300, date: "2025-01-05" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white px-8 py-4 shadow">
        <h1 className="text-xl font-bold text-blue-600">
          ATM User Dashboard
        </h1>

        <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
          <LogOut size={18} />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* User Info */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Card Number:</strong> {user.cardNumber}
          </p>
        </section>

        {/* Balance */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Account Balance
          </h2>
          <p className="text-3xl font-bold">
            {user.balance.toLocaleString()} ETB
          </p>
        </section>

        {/* Actions */}
        <section className="grid md:grid-cols-3 gap-6">
          <ActionCard
            icon={<ArrowDownCircle size={32} />}
            title="Withdraw Cash"
            description="Secure cash withdrawal"
            link="/withdraw"
          />

          <ActionCard
            icon={<ArrowUpCircle size={32} />}
            title="Deposit"
            description="Add money to your account"
            link="/deposit"
          />

          <ActionCard
            icon={<Wallet size={32} />}
            title="View Balance"
            description="Check your account balance"
            link="/balance"
          />
        </section>

        {/* Transactions */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-none">
                  <td className="py-2">{tx.type}</td>
                  <td
                    className={`py-2 ${
                      tx.type === "Withdrawal"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.type === "Withdrawal" ? "-" : "+"}
                    {tx.amount} ETB
                  </td>
                  <td className="py-2 text-gray-600">
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

const ActionCard = ({ icon, title, description, link }) => (
  <a
    href={link}
    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </a>
);

export default Dashboard;
