import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    // 1. Start loading as TRUE
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("http://localhost:5000/api/auth/check", {
                    credentials: "include", 
                });

                if (response.ok) {
                    // 3. Must await response.json()
                    const data = await response.json();
                    setCurrentUser(data); 
                }
            } catch (error) {
                console.log("Error on fetching a user", error);
            } finally {
                // 4. Stop loading whether the request succeeded or failed
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            console.log(data)
            if (response.ok) {
                setCurrentUser(data);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            return { success: false, message: err };
        }
    };

    // 5. Provide the loading state so components can show a spinner
    return (
        <AuthContext.Provider value={{ currentUser, loading, login }}>
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