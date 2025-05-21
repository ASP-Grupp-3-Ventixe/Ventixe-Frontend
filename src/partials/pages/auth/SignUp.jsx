import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './SignUp.css';
import Logo from '../../../images/Logo.svg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName ] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone ] = useState('');
  const [password, setPassword ] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');

  const navigate = useNavigate();

  try{
    const { signUp } = useAuth()
  }
  catch { }

  const handleSubmit = (e) => {
  e.preventDefault();

  if (step === 1 && email) {
    setStep(2);
  } else if (step === 2 && code.length === 6) {
    setStep(3);
  } else if (step === 3 && password && confirmPassword && password === confirmPassword) {
    setStep(4);
  } else if (step === 4 && firstName && lastName && phone) {
    setStep(5);
  } else if (step === 5) {
    navigate('/dashboard');
  }
};

  return (
<div className='signup-container'>
  <div className='signup-box'>
    <img src={Logo} alt="Ventixe logo" className='signup-logo' />
    <form className='signup-form' onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <label>Sign Up</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email address'
            required
          />
          <button type='submit' className='signup-button'>Continue</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Verify your email</h3>
          <p>Enter the 6-digit code we sent to <strong>{email}</strong></p>
          <input
            type='text'
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Enter verification code'
            required
          />
          <button type='submit' className='signup-button'>Continue</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Create a password</h3>
          <label>Email</label>
          <input
            type='email'
            value={email}
            disabled
            className='readonly-input'
          />
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter a password'
            required
          />
          <label>Confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            required
          />
          <button type='submit' className='signup-button'>Continue</button>
        </>
      )}

      {step === 4 && (
        <>
          <h3>Enter your details</h3>
          <label>First Name</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Enter your first name'
            required
          />
          <label>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Enter your last name'
            required
          />
          <label>Phone Number</label>
          <input
            type='tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Enter your phone number'
            required
          />
          <button type='submit' className='signup-button'>Create Account</button>
        </>
      )}

      {step === 5 && (
        <>
          <h3>Account was created successfully!</h3>
          <button type='submit' className='signup-button'>Continue to dashboard</button>
        </>
      )}
    </form>
  </div>
</div>


  )
}

export default SignUp
