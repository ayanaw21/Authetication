import React from "react";
import {
  Users,
  Shield,
  Activity,
  LogOut,
  CreditCard,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock admin data
  const admin = {
    name: "System Administrator",
    role: "Admin",
  };

  const stats = [
    { title: "Total Users", value: 124 },
    { title: "Active Accounts", value: 98 },
    { title: "Total Transactions", value: 1450 },
    { title: "Blocked Accounts", value: 3 },
  ];

  const users = [
    {
      id: 1,
      name: "Ayanaw Mengesha",
      card: "**** **** **** 1234",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Abel Tesfaye",
      card: "**** **** **** 5678",
      role: "User",
      status: "Blocked",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white px-8 py-4 shadow">
        <div>
          <h1 className="text-xl font-bold text-blue-600">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Role: {admin.role}
          </p>
        </div>

        <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
          <LogOut size={18} />
          Logout
        </button>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-gray-500 text-sm">
                {item.title}
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Admin Capabilities */}
        <section className="grid md:grid-cols-3 gap-6">
          <AdminAction
            icon={<Users size={32} />}
            title="User Management"
            description="View, block, or activate user accounts"
          />

          <AdminAction
            icon={<CreditCard size={32} />}
            title="Transaction Monitoring"
            description="Review all ATM transactions"
          />

          <AdminAction
            icon={<Shield size={32} />}
            title="Security Control"
            description="Manage roles and access permissions"
          />
        </section>

        {/* Users Table */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            User Accounts
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Card Number</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-none">
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.card}</td>
                  <td className="py-2">{user.role}</td>
                  <td
                    className={`py-2 font-semibold ${
                      user.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="py-2">
                    <button
                      className={`px-3 py-1 rounded text-white text-sm ${
                        user.status === "Active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.status === "Active"
                        ? "Block"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Security Logs */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Security Logs
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✔ Admin logged in successfully</li>
            <li>✔ User account blocked: **** 5678</li>
            <li>✔ JWT token verified for admin access</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

const AdminAction = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center">
    <div className="flex justify-center text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default AdminDashboard;
