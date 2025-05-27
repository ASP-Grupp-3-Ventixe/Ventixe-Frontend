import { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
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
        phoneNumber:'',
        acceptedTerms: false,
    });

    return (
        <RegistrationContext.Provider value={{
            step, setStep,
            email, setEmail,
            verificationCode, setVerificationCode,
            password, setPassword,
            confirmPassword, setConfirmPassword,
            captchaToken, setCaptchaToken,
            profile, setProfile
        }}>
            {children}
        </RegistrationContext.Provider>
    );
};
