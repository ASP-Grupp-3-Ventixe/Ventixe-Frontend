import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

const SignUp = () => {

  try{
    const { signUp } = useAuth()
  }
  catch { }
  
  return (
      <div>Sign Up</div>
  )
}

export default SignUp
