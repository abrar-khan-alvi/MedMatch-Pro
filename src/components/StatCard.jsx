import React from 'react';
import { Users, UserCheck, AlertCircle, XCircle } from 'lucide-react';
import '../styles/Dashboard.css';

const StatCard = ({ title, value, subtext, type, icon }) => {
    return (
        <div className={`stat-card ${type}`}>
            <div className="stat-header">
                <span className="stat-label">{title}</span>
                <div className="stat-icon-bg">
                    {icon}
                </div>
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-desc">{subtext}</div>
        </div>
    );
};

export default StatCard;
