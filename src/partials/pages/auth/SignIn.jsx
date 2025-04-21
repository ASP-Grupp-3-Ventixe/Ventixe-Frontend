import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

const SignIn = () => {

  try{
    const { signIn } = useAuth
  }
  catch { }

  return (
    <div>Sign In</div>
  )
}

export default SignIn
