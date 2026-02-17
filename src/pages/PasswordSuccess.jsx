import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SmallLogo from '../assets/SmallLogo.png';
import '../styles/Login.css';

const PasswordSuccess = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={SmallLogo} alt="Amicis Research Center" className="login-logo" />
                    <h1 className="login-title">Password Updated Successfully!</h1>
                    <p className="login-subtitle">
                        Your new password has been saved. You can now continue securely.
                    </p>
                </div>

                <div className="login-form">
                    <Button type="button" variant="primary" fullWidth onClick={handleSignIn}>
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PasswordSuccess;
