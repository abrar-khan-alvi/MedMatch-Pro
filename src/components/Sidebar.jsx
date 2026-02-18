import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, Sparkles, X } from 'lucide-react';
import SmallLogo from '../assets/SmallLogo.png';

import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useAuth();
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
                <X size={24} />
            </button>
            <div className="sidebar-logo">
                <img src={SmallLogo} alt="Amicis Research Center" />
            </div>

            <div className="sidebar-section-title">General</div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard className="nav-icon" />
                    Dashboard
                </NavLink>

                {user && user.role === 'admin' && (
                    <NavLink to="/protocol" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText className="nav-icon" />
                        Protocol
                    </NavLink>
                )}
                <NavLink to="/patients" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Users className="nav-icon" />
                    Patients
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Settings className="nav-icon" />
                    Settings
                </NavLink>

                {user && user.role === 'admin' && (
                    <NavLink to="/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users className="nav-icon" />
                        User Management
                    </NavLink>
                )}
            </nav>

            <div className="sidebar-section-title">Aggregated Intelligence</div>
            <nav className="sidebar-nav">
                <NavLink to="/ai-matching" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Sparkles className="nav-icon" />
                    AI Matching
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
