import React, { useState } from 'react';
import { Bell, ChevronDown, X, ChevronRight, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        // TODO: Clear auth state
        navigate('/login');
    };

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
                        <span className="user-name">Dr. Jon Kabir</span>
                        <span className="user-role">Admin</span>
                    </div>
                    {/* Placeholder for avatar, or use an image if available */}
                    <img
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
                        alt="Dr. Jon Kabir"
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
                                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
                                    alt="Dr. Jon Kabir"
                                    className="dropdown-avatar"
                                />
                                <div className="dropdown-user-details">
                                    <span className="dropdown-name">Dr. Jon Kabir</span>
                                    <span className="dropdown-role-badge">Admin</span>
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
