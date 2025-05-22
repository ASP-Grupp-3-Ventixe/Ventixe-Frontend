import { createContext, useContext, useState } from 'react';

const RegistraionContext = createContext();

export const RegistrationContext = () => {
    const context = useContext(RegistraionContext);
    if (!context) throw new Error("useRegistration must be used within RegistrationProvider")
    return context;
};

export const RegistrationProvider = ({children}) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null);
    const [profile, setProfile] = useState({
        firstName:'',
        lastName:'',
        phone:'',
        acceptedTerms: false,
    });

    return (
        <RegistraionContext.Provider value={{
            step, setStep,
            email, setEmail,
            verificationCode, setVerificationCode,
            password, setPassword,
            confirmPassword, setConfirmPassword,
            captchaToken, setCaptchaToken,
            profile, setProfile
        }}>
            {children}
        </RegistraionContext.Provider>
    );
};
