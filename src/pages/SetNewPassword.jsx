import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import SmallLogo from '../assets/SmallLogo.png';
import '../styles/Login.css';

const SetNewPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('New password submitted:', formData);
        // TODO: Connect to backend
        // alert('Password reset successfully!'); // Removed alert to show success page instead
        navigate('/password-success');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={SmallLogo} alt="Amicis Research Center" className="login-logo" />
                    <h1 className="login-title">Set a new password</h1>
                    <p className="login-subtitle">
                        Create a new password. Ensure it differs from previous ones for security
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="**********"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="**********"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        required
                    />

                    <Button type="submit" variant="primary" fullWidth>
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SetNewPassword;
