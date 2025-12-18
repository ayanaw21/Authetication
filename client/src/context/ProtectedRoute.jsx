import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ allowedRoles }) {
    const { currentUser, loading } = useAuth();

    // 1. Wait for the fetchUser check to finish
    if (loading) {
        return <div>Checking authentication...</div>;
    }

    // 2. If no user is logged in, redirect to login page
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // 3. If user exists but doesn't have the right role
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/unauthorized" replace />; // Or show a "Denied" message
    }

    // 4. IMPORTANT: Use <Outlet /> to render the nested children from the router
    return <Outlet />;
}