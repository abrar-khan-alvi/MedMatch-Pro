import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import SmallLogo from '../assets/SmallLogo.png';
import '../styles/Login.css'; // Reusing Login styles as the layout is identical

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Register submitted:', { ...formData, rememberMe });
        // TODO: Connect to backend
        navigate('/account-success');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={SmallLogo} alt="Amicis Research Center" className="login-logo" />
                    <h1 className="login-title">Create an Account</h1>
                    <p className="login-subtitle">Create your account to manage patient eligibility</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="esteban_schiller@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        required
                    />

                    <Input
                        label="Password"
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

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            <span className="checkbox-text">Remember Password</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-password-link">
                            Forget Password?
                        </Link>
                    </div>

                    <Button type="submit" variant="primary" fullWidth>
                        Sign Up
                    </Button>
                </form>

                <div className="login-footer">
                    <p>
                        Already have Account?{' '}
                        <Link to="/login" className="register-link">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
