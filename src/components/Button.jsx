import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components.css';

const Button = ({ children, onClick, type, variant, fullWidth, disabled, className }) => {
    const btnClassName = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className || ''}`;

    return (
        <button
            type={type}
            className={btnClassName}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

Button.defaultProps = {
    type: 'button',
    variant: 'primary',
    fullWidth: false,
    disabled: false,
};

export default Button;
