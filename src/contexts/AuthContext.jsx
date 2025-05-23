import {createContext, useContext, useEffect, useState} from "react"
import config from "../config.js";

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
        setLoading(true)

        console.log('🔐 Attempting login with:', { email });

        try {
            const response = await fetch(`${config.authServiceUrl}/api/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            console.log('📡 Response status:', response.status);

            if (response.ok) {
                const result = await response.json()
                console.log('📥 Response data:', result);

                if (result.succeeded) {
                    const userData = {
                        id: result.userId,
                        email: email,
                    }

                    setUser(userData)
                    setIsAuthenticated(true)
                    setIsAdmin(email.includes('admin'))

                    // Spara access token om den finns
                    if (result.accessToken) {
                        if (isPersistent) {
                            localStorage.setItem('accessToken', result.accessToken)
                            localStorage.setItem('user', JSON.stringify(userData))
                        } else {
                            sessionStorage.setItem('accessToken', result.accessToken)
                            sessionStorage.setItem('user', JSON.stringify(userData))
                        }
                    }

                    setLoading(false)
                    return { success: true }
                } else {
                    setLoading(false)
                    return { success: false, error: result.message }
                }
            } else {
                const errorText = await response.text()
                console.log('❌ Error response:', errorText); 
                setLoading(false)
                return { success: false, error: errorText }
            }
        } catch (error) {
            console.error('💥 Network error:', error)
            setLoading(false)
            return { success: false, error: 'Cannot connect to auth service' }
        }
    }

    const signUp = async (userData) => {
        setLoading(true)

        try {
            const response = await fetch(`${config.authServiceUrl}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            })

            const result = await response.json()
            setLoading(false)

            if (response.ok && result.succeeded) {
                return { success: true, message: result.message }
            } else {
                return { success: false, error: result.message || 'Registration failed' }
            }
        } catch (error) {
            console.error('Registration error:', error)
            setLoading(false)
            return { success: false, error: 'Cannot connect to auth service' }
        }
    }

    const signOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
        setIsAdmin(false)
    }

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
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}