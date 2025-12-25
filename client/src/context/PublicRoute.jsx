import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function PublicRoute() {
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    
    // If user is already logged in, send them to the dashboard
    return currentUser ? (currentUser.role === 'admin' ? <Navigate to="/admin" replace /> :  <Navigate to="/dashboard" replace />) : <Outlet />;
}