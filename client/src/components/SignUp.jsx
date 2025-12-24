import { useState } from "react";
import { useAuth } from "../context/AuthProvider"; // Adjust this path to your file structure
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
    // 1. Access the login function from our Global Context
    const { signup } = useAuth();
    const navigate = useNavigate();
    // 2. Local state for form inputs and UI feedback
    const [formData, setFormData] = useState({
        email: "",
        fullName:"",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 3. Update state as user types
    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    // 4. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setIsSubmitting(true);

        const { fullName,email, password } = formData;

        // Call the signup function from AuthProvider
        const result = await signup(fullName,email, password);

        if (result.success) {
            // Redirect to dashboard if signup is successful
            navigate("/dashboard");
        } else {
            // Display error message from backend (e.g., "Invalid Credentials")
            setError(result.message || "signup failed. Please try again.");
        }
        
        setIsSubmitting(false);
    };

    // 5. Component UI
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your details to login
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                               fullName
                            </label>
                            <input
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white transition-all duration-200 ${
                                isSubmitting 
                                ? "bg-indigo-400 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : "SignUp"}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
