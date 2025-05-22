import React, {useState} from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import {Link, useNavigate} from "react-router-dom";
import Logo from '../../../images/Logo.svg';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn(formData.email, formData.password, formData.rememberMe)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="signin-container">
    <div className="signin-box">
    <img src={Logo} alt="Ventixe Logo" className="signin-logo" />

      {error && <div className="error-message">{error}</div>}

      <form className="signin-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
        />

        <label>Password</label>
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
        />

        {/*<label>*/}
        {/*  <input*/}
        {/*      type="checkbox"*/}
        {/*      name="rememberMe"*/}
        {/*      checked={formData.rememberMe}*/}
        {/*      onChange={handleChange}*/}
        {/*  />*/}
        {/*  Remember me*/}
        {/*</label>*/}

        <button
            type="submit"
            className="login-button"
            disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className="signup-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  </div>
  )
}

export default SignIn
