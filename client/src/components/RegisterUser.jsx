import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { X } from "lucide-react"; // For a close button

export default function Register({ onClose }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    balance: 0,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { fullName, email, password, balance } = formData;
    const result = await register(fullName, email, password, balance);

    if (result.success) {
      alert("New user account created successfully!");
      onClose(); // Close the modal on success
    } else {
      setError(result.message || "Registration failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl w-full max-w-md overflow-hidden relative">
      {/* Modal Header */}
      <div className="p-6 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">Register New Account</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form className="p-6 space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border-l-4 border-red-500">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Abebe Bikila"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="user@example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance</label>
            <input
              name="balance"
              type="number"
              required
              value={formData.balance}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {isSubmitting ? "Processing..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}