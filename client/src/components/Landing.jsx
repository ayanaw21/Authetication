import React from "react";
import { ShieldCheck, Lock, Server, Users } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">
          ATM Secure System
        </h1>
        <div className="space-x-4">
          <a
            href="/login"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h2 className="text-4xl font-bold mb-4">
          Secure ATM Machine Simulation
        </h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          A modern web-based ATM simulation demonstrating secure
          authentication, authorization, and transaction processing
          using React and Node.js.
        </p>

        <a
          href="/login"
          className="inline-block mt-8 px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100"
        >
          Get Started
        </a>
      </section>

     
     
    </div>
  );
};

export default LandingPage;
