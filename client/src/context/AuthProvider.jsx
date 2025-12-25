import {
	useState,
	createContext,
	useEffect,
	useContext,
	useCallback,
} from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [users, setUsers] = useState(null);
	const [loading, setLoading] = useState(true);

	// 1. Move getAllUsers outside useEffect so it can be exported
	// We use useCallback so it doesn't cause infinite loops in other useEffects
	const getAllUsers = useCallback(async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/users/all",
				{ credentials: "include" }
			);
			const data = await response.json();
			if (response.ok) {
				setUsers(data);
				return { success: true };
			}
		} catch (error) {
			console.error("Fetch users error:", error);
			return { success: false, message: error.message };
		}
	}, []);

	const fetchUser = useCallback(async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/auth/check",
				{ credentials: "include" }
			);

			if (response.ok) {
				const data = await response.json();
				setCurrentUser(data);
			}
		} catch (error) {
			console.log("Error on fetching a user", error);
		} finally {
			setLoading(false);
		}
	}, []);

	// 2. Initial data load
	useEffect(() => {
		fetchUser();
		getAllUsers();
	}, [fetchUser, getAllUsers]);

	const login = async (accountNumber, password) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ accountNumber, password }),
					credentials: "include",
				}
			);

			const data = await response.json();
			if (response.ok) {
				setCurrentUser(data);
				// Refresh the user list if an admin logs in
				await getAllUsers();
				return { success: true };
			} else {
				return { success: false, message: data.message };
			}
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	const logout = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/auth/logout",
				{
					method: "POST",
					credentials: "include",
				}
			);

            if(response.ok){
                setCurrentUser(null)
                const data = await response.json()
                return { success: false, message: data.message };
            }
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	const register = async (fullName, email, password, balance) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/auth/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						fullName,
						email,
						password,
						balance,
					}),
					credentials: "include",
				}
			);

			const data = await response.json();
			if (response.ok) {
				// 3. IMPORTANT: Refresh the list after a new user is added
				await getAllUsers();
				return { success: true };
			} else {
				return { success: false, message: data.message };
			}
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	const unlockAccount = async (userId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/users/unlock/${userId}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);

			if (response.ok) {
				// 4. IMPORTANT: Refresh the list after unlocking
				await getAllUsers();
				return { success: true };
			}
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				loading,
				login,
				register,
                logout,
				users,
				unlockAccount,
				refreshUsers: getAllUsers, // Expose the function
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used inside of an AuthProvider");
	}
	return context;
};
