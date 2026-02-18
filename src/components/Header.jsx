import React, { useState } from 'react';
import { Bell, ChevronDown, X, ChevronRight, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // If user is not loaded yet, or if we want to show a skeleton, we could do it here.
    // However, AuthProvider likely handles the initial loading state.
    if (!user) return null;

    return (
        <header className="dashboard-header">
            <button className="header-icon-btn mobile-menu-btn" onClick={toggleSidebar}>
                <Menu size={24} />
            </button>
            <div className="header-right-group">
                <button className="header-icon-btn">
                    <Bell size={20} />
                </button>
                <div className="user-profile" onClick={toggleProfile}>
                    <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                    </div>
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="user-avatar"
                    />
                    <ChevronDown size={16} color="#adb5bd" />
                </div>
            </div>

            {isProfileOpen && (
                <div className="profile-dropdown-overlay" onClick={() => setIsProfileOpen(false)}>
                    <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className="dropdown-header">
                            <div className="dropdown-user-info">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="dropdown-avatar"
                                />
                                <div className="dropdown-user-details">
                                    <span className="dropdown-name">{user.name}</span>
                                    <span className="dropdown-role-badge">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                </div>
                            </div>
                            <button className="dropdown-close" onClick={() => setIsProfileOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => { setIsProfileOpen(false); navigate('/settings?tab=profile'); }}>
                                <span>Profile</span>
                                <ChevronRight size={16} color="#adb5bd" />
                            </button>
                            <button className="dropdown-item" onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}>
                                <span>Settings</span>
                                <ChevronRight size={16} color="#adb5bd" />
                            </button>
                        </div>

                        <div className="dropdown-footer">
                            <button className="logout-button" onClick={handleLogout}>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
