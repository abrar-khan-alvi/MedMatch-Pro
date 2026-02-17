import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SmallLogo from '../assets/SmallLogo.png';
import '../styles/Login.css';

const VerificationCode = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']); // 6 digits
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value !== '' && index < 5) { // Updated index check
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle Backspace
        if (e.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullCode = code.join('');
        console.log('Verification code submitted:', fullCode);
        // TODO: Connect to backend
        navigate('/reset-password');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={SmallLogo} alt="Amicis Research Center" className="login-logo" />
                    <h1 className="login-title">Check your email</h1>
                    <p className="login-subtitle">
                        We sent a code to your email address. Please check your email for the 6 digit code.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="code-input-container">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                className="code-digit-input"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>

                    <Button type="submit" variant="primary" fullWidth>
                        Verify
                    </Button>
                </form>

                <div className="login-footer">
                    <p>
                        You have not received the email?{' '}
                        <button type="button" className="resend-link">
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationCode;
