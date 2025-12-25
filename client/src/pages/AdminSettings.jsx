import React, { useState } from "react";
import { Users, Shield, Activity, LogOut, CreditCard, Lock, Unlock, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import Register from "../components/RegisterUser"; // Import the register component

const AdminDashboard = () => {
  const { currentUser, users, logout, unlockAccount } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCustomers = users?.filter((u) => u._id !== currentUser._id).length || 0;

  const stats = [
    { title: "Total Users", value: totalCustomers },
    { title: "Admin Accounts", value: users?.filter((u) => u.role === "admin").length || 0 },
    { title: "Total Balance", value: `$${users?.reduce((acc, curr) => acc + curr.balance, 0)}` },
    { title: "Locked Accounts", value: users?.filter((u) => u.isLocked).length || 0 },
  ];

  const handleUnlock = async (userId, userName) => {
    if (window.confirm(`Unlock ${userName}'s account?`)) {
      const result = await unlockAccount(userId);
      if (result.success) alert("Unlocked!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans relative">
      {/* 1. Modal Overlay Logic */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <Register onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center bg-white px-8 py-4 shadow-sm border-b">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">ATM Admin System</h1>
          <p className="text-xs text-gray-500">Admin Session: {currentUser?.fullName}</p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-bold text-sm shadow-md"
          >
            <UserPlus size={18} />
            Add New User
          </button>
          <button onClick={logout} className="text-gray-400 hover:text-red-600">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{item.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Action Cards (Made User Management Clickable) */}
        <section className="grid md:grid-cols-3 gap-6">
          <AdminAction
            icon={<Users size={28} />}
            title="User Management"
            description="Register or unlock accounts"
            onClick={() => setIsModalOpen(true)} // Opens modal
          />
          <AdminAction icon={<CreditCard size={28} />} title="Global Liquidity" description="Monitor total cash flow" />
          <AdminAction icon={<Shield size={28} />} title="System Security" description="Review login attempts" />
        </section>

        {/* Users Table */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">System User Directory</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Account No.</th>
                  <th className="px-6 py-4">Balance</th>
                  <th className="px-6 py-4">Security Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users?.filter(u => u._id !== currentUser?._id).map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.fullName}</td>
                    <td className="px-6 py-4 font-mono">{user.accountNumber}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">${user.balance}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${user.isLocked ? "text-red-600" : "text-green-600"}`}>
                        {user.isLocked ? "Locked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.isLocked && (
                        <button
                          onClick={() => handleUnlock(user._id, user.fullName)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-xs font-bold"
                        >
                          Unlock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const AdminAction = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 hover:shadow-md transition-shadow text-left w-full"
  >
    <div className="bg-blue-50 p-3 rounded-lg text-blue-600">{icon}</div>
    <div>
      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{description}</p>
    </div>
  </button>
);

export default AdminDashboard;