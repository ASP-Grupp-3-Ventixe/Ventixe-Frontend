import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './SignIn.css';
import Logo from '../../../images/Logo.svg';

const SignIn = () => {

  try{
    const { signIn } = useAuth
  }
  catch { }

  return (
    <div className="signin-container">
    <div className="signin-box">
    <img src={Logo} alt="Ventixe Logo" className="signin-logo" />
      <form className="signin-form">
        <label>Email</label>
        <input type="email" placeholder="Enter your email address" required />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" required />

        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="signup-text">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  </div>
  )
}

export default SignIn
