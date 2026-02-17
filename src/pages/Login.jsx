import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import SmallLogo from '../assets/SmallLogo.png';
import '../styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        console.log('Login submitted:', { ...formData, rememberMe });
        // TODO: Connect to backend
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={SmallLogo} alt="Amicis Research Center" className="login-logo" />
                    <h1 className="login-title">Login to Account</h1>
                    <p className="login-subtitle">Please enter your email and password to continue</p>
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
                        Sign in
                    </Button>
                </form>

                <div className="login-footer">
                    <p>
                        Don't have any account?{' '}
                        <Link to="/register" className="register-link">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
