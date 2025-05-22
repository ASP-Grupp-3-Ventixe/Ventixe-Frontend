import {createContext, useContext, useState} from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [isAdmin, setIsAdmin] = useState(true)
    const defaultName = "Orlando Laurentius";
    const defaultEmail = "orlandolaurentius@example.com";
    const initials = defaultName
        ? defaultName.split(' ').map(n => n[0]).join('').toUpperCase()
        : "";

    const [currentUser, setCurrentUser] = useState({
        id: "00000000-0000-0000-0000-000000000001",
        name: defaultName,
        email: defaultEmail,
        initials: initials,
        avatarUrl: "",
        senderType: "Admin"
    });

    const signIn = async (email, password, isPersistent) => {

    }

    const signUp = async (email) => {

    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, user: currentUser, signUp, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
