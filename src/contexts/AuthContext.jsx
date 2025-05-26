import {createContext, useContext, useEffect, useState} from "react"
import * as AuthService from "../Services/AuthService.jsx";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            
            setIsAuthenticated(true)
            const savedUser = localStorage.getItem('user')
            if (savedUser) {
                const userData = JSON.parse(savedUser)
                setUser(userData)
                setIsAdmin(userData.email?.includes('admin') || false)
            }
        }
        setLoading(false)
    }, [])

    const signIn = async (email, password, isPersistent = false) => {
        setLoading(true);

        console.log('Attempting login with:', { email });
        try {
            const result = await AuthService.signIn(email, password);
            console.log('SignIn result:', result);

            if (result.succeeded) {
                const userData = { id: result.userId, email };
                setUser(userData);
                setIsAuthenticated(true);
                setIsAdmin(email.includes('admin'));

                if (result.accessToken) {
                    if (isPersistent) {
                        localStorage.setItem('accessToken', result.accessToken);
                        localStorage.setItem('user', JSON.stringify(userData));
                    } else {
                        sessionStorage.setItem('accessToken', result.accessToken);
                        sessionStorage.setItem('user', JSON.stringify(userData));
                    }
                }
                setLoading(false);
                return { success: true };
            } else {
                setLoading(false);
                return { success: false, error: result.message };
            }
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.response?.data?.message || 'Cannot connect to auth service' };
        }
    };

    const signUp = async (userData) => {
        setLoading(true);
        try {
            const result = await AuthService.signUp(userData);
            setLoading(false);
            if (result.succeeded) {
                return { success: true, message: result.message };
            } else {
                return { success: false, error: result.message || 'Registration failed' };
            }
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.response?.data?.message || 'Cannot connect to auth service' };
        }
    };

    const signOut = async () => {
    try {
      await AuthService.signOut();
    } catch (e) {
        console.error("Sign out failed:", e);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isAdmin,
            user,
            loading,
            signIn,
            signUp,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};