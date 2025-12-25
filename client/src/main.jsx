import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import PublicRoute from "./context/PublicRoute.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
	{
		element: <PublicRoute />,
		children: [
			{ path: "/", element: <App /> },

			{ path: "/login", element: <Login /> },
		],
	},
	{
		element: <ProtectedRoute allowedRoles={["user"]} />,
		children: [{ path: "/dashboard", element: <Dashboard /> }],
	},
	{
		element: <ProtectedRoute allowedRoles={["admin"]} />,
		children: [{ path: "/admin", element: <AdminSettings /> }],
	},
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);
