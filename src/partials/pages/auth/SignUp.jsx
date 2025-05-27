import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistration } from '../../../contexts/RegistrationContext.jsx'; 
import Logo from '../../../images/Logo.svg';
import './SignUp.css';


export default function SignUp() {
  const {
    step, setStep,
    email, setEmail,
    verificationCode, setVerificationCode,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    captchaToken, setCaptchaToken,
    profile, setProfile
  } = useRegistration();
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleEmailSubmit = async e => {
    e.preventDefault();
    console.log("Submitting email:", email);
    const res = await fetch('https://ventixe-verificationserviceprovider.azurewebsites.net/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ Email: email })
    });
    res.ok ? setStep(2) : alert('Unable to send verification code');
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const censorEmail = (email) => {
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;
    return localPart[0] + '*'.repeat(Math.max(localPart.length -1, 0)) + '@' + domain;
  };

  const handleCodeChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const newCode = [...verificationCode];
    newCode[idx] = val;
    setVerificationCode(newCode);
    if (val && idx <5) inputsRef.current[idx + 1]?.focus();
    if (newCode.every(c => c)) verifyCode(newCode.join(''));
  };

  const verifyCode = async fullCode => {
    const res = await fetch('https://ventixe-verificationserviceprovider.azurewebsites.net/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, code: fullCode })
    });
    res.ok ? setStep(3) : alert('Invalid code.');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
  }
    const payload = {
      email,
      password
    };

    try {
    const res = await fetch('https://kappeauthserviceprovider-avevcya4hrd2ahb2.swedencentral-01.azurewebsites.net/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      setProfile(prev => ({ ...prev, userId: data.userId }));
      setStep(4);
    } else {
      const error = await res.text();
      alert('Failed to create account:\n' + error);
    }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Unexpected error occurred.");
    }
    
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();

    const res = await fetch('https://profileservice-provider-g2edh4c9cpe3fugk.swedencentral-01.azurewebsites.net/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: profile.userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber
      })
    });
    res.ok ? navigate('/login') : alert('Failed to add info.');
  };

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <img src={Logo} alt="Ventixe logo" className='signup-logo' />
        <form 
          id="signup" 
          noValidate
          className='signup-form' 
          onSubmit={
            step === 1 ? handleEmailSubmit :
              step === 2 ? handleEmailSubmit :
                step === 3 ? handlePasswordSubmit : 
                  handleProfileSubmit
          }
        >
          {step === 1 && <EmailStep email={email} onChange={e => setEmail(e.target.value)} />} 
          {step === 2 && (
            <CodeStep
              email={censorEmail(email)}
              code={verificationCode}
              onChange={handleCodeChange}
              inputsRef={inputsRef}
              handleBack={handleBack}
            />
          )}  
          {step === 3 && (
            <PasswordStep
              password={password}
              onPasswordChange={e => setPassword(e.target.value)}
              confirmPassword={confirmPassword}
              onConfirmChange={e => setConfirmPassword(e.target.value)}
              onCaptchaChange={setCaptchaToken}
              handleBack={handleBack}
            />
          )}
          {step === 4 && (
            <ProfileStep
              profile={profile}
              setProfile={setProfile}
              handleBack={handleBack}
            />
          )}
        </form>
      </div>  
    </div>
  );
} 

function EmailStep({ email, onChange }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2>Create Account</h2>
        <p>To create an account, please enter your email address. A verification code will be sent to this email.</p>
      </div>
      <div className='card-body form-group'>
        <input type='email' placeholder='Email' value={email} onChange={onChange} required className='form-input' />
        <button type='submit' className='btn-primary'>Continue</button>
      </div>
      <div className='card-footer info'>
        <span>Already have an account?</span>
        <Link to="/login"> Log in</Link>
      </div>
    </div>
  );
}

function CodeStep({ email, code, onChange, inputsRef, handleBack }) {
  const handlePaste = (e) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData('text').trim();

  if (!/^\d{6}$/.test(pasted)) return;

  const chars = pasted.split('');
  setVerificationCode(chars);

  inputsRef.current[5]?.focus();

  verifyCode(pasted);
};


  return (
    <div className='card'>
      <div className='card-header'>
        <h2>Verify Email Address</h2>
        <p>An email with a verification code was sent to {email}. Please enter the code below to verify your email address.</p>
      </div>
      <div className='card-body'>
        <div className='verification-code-wrapper'>
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => onChange(idx, e.target.value)}
              onPaste={idx === 0 ? handlePaste : undefined}
            />
          ))}
        </div>
        <div className='resend'>
          Didn't receive a verification code? <Link to="/resend-verificationcode">Resend email</Link>
        </div>
        <button type="submit" className='btn-primary'>Confirm</button>
      </div>
      <div className='card-footer'>
        <button type='button' className='btn-link' onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}


function PasswordStep({ password, onPasswordChange, confirmPassword, onConfirmChange, onCaptchaChange, handleBack }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2>Set Password</h2>
        <p>You need to set a strong and secure password</p>
      </div>
      <div className='card-body'>
        <div className='form-group'>
          <input type='password' placeholder='Password' value={password} onChange={onPasswordChange} required className='form-input' />
          <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={onConfirmChange} required className='form-input' />
        </div>

        <button type='submit' className='btn-primary'>Continue</button>
      </div>
      <div>
        <button type='button' className='btn-link' onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

function ProfileStep({ profile, setProfile, handleBack }) {
  const fields = [
    { key: 'firstName', placeholder: 'First Name' },
    { key: 'lastName', placeholder: 'Last Name' },
    { key: 'phone', placeholder: 'Phone Number' },
  ];

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const toggle = (key) => (e) => {
    setProfile(prev => ({ ...prev, [key]: e.target.checked }));
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h2>Complete Profile</h2>
      </div>
      <div className='card-body form-group'>
        {fields.map(f => (
          <input
            key={f.key}
            type='text'
            placeholder={f.placeholder}
            value={profile[f.key]}
            onChange={handleChange(f.key)}
            className='form-input mb-3'
          />
        ))}

        <div className='checkbox-group mb-4'>
          <label className='custom-checkbox'>
            <input
              type='checkbox'
              checked={profile.acceptedTerms}
              onChange={toggle('acceptedTerms')}
              required
            />
            <span className='checkmark'></span>
            I accept the terms and conditions
          </label>
        </div>

        <button type='submit' className='btn-primary'>Save & Finish</button>
      </div>
      <div className='card-footer'>
        <button type='button' className='btn-link' onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}


