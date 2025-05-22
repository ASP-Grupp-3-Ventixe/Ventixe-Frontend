import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  try {

    const { isAuthenticated } = useAuth()
    // console.log("Is Authenticated:", isAuthenticated)


    if (isAuthenticated && isAuthenticated !== undefined) {
      return children
    }

  }
  catch (error) {
    console.error("🚨 [ProtectedRoute] error:", error)
  }

  return <Navigate to="/login" replace />

}

export default ProtectedRoute
