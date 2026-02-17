import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import SmallLogo from '../assets/SmallLogo.png';
import '../styles/Login.css'; // Reusing Login styles

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Forgot Password submitted:', { email });
        // TODO: Connect to backend
        navigate('/verify-code');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={SmallLogo} alt="Amicis Research Center" className="login-logo" />
                    <h1 className="login-title">Forget Password?</h1>
                    <p className="login-subtitle">Please enter your email to get verification code</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="esteban_schiller@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        required
                    />

                    <Button type="submit" variant="primary" fullWidth>
                        Continue
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
