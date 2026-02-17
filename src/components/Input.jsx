import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/components.css';

const Input = ({ label, type, placeholder, value, onChange, name, required }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                <input
                    type={isPassword && showPassword ? 'text' : type}
                    className="input-field"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    required={required}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
                    </button>
                )}
            </div>
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    required: PropTypes.bool,
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    required: false,
};

export default Input;
