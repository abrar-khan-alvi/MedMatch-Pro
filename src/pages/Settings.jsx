import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { User, Bell, Shield, Database, Save } from 'lucide-react';
import Button from '../components/Button';
import '../styles/Settings.css';

const Settings = () => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') || 'profile';
    const [activeTab, setActiveTab] = useState(initialTab);

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div>
                        <h2 className="settings-section-title">Profile Settings</h2>
                        <p className="settings-section-subtitle">Update your personal information and credentials</p>

                        <form>
                            <div className="settings-form-group">
                                <label className="settings-label">Full Name</label>
                                <input type="text" className="settings-input" defaultValue="Dr. John Smith" />
                            </div>

                            <div className="settings-form-group">
                                <label className="settings-label">Email Address</label>
                                <input type="email" className="settings-input" defaultValue="dr.smith@hospital.com" />
                            </div>

                            <div className="settings-form-group">
                                <label className="settings-label">Role</label>
                                <div className="select-wrapper">
                                    <select className="settings-input" defaultValue="All Protocol">
                                        <option>All Protocol</option>
                                        <option>Admin</option>
                                        <option>Researcher</option>
                                    </select>
                                </div>
                            </div>

                            <div className="settings-form-group">
                                <label className="settings-label">Department</label>
                                <input type="text" className="settings-input" defaultValue="Clinical Research" />
                            </div>

                            <div className="settings-actions">
                                <Button variant="primary" className="save-changes-btn">
                                    <Save size={18} /> Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                );
            case 'notifications':
                return (
                    <div>
                        <h2 className="settings-section-title">Notification Preferences</h2>
                        <p className="settings-section-subtitle">Configure how you receive updates and alerts</p>

                        <div className="notification-list">
                            <div className="notification-item">
                                <div className="notification-info">
                                    <h4>New Patient Matches</h4>
                                    <p>Get notified when AI finds new eligible patients</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h4>Study Updates</h4>
                                    <p>Receive updates about study progress and milestones</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h4>Weekly Reports</h4>
                                    <p>Get weekly summary reports via email</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h4>System Alerts</h4>
                                    <p>Critical system notifications and updates</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div>
                        <h2 className="settings-section-title">Change Password</h2>
                        <p className="settings-section-subtitle">Ensure your account uses a strong, unique password</p>

                        <div className="settings-form-group">
                            <label className="settings-label">Current Password</label>
                            <input type="password" className="settings-input" placeholder="Enter your current password" />
                        </div>

                        <div className="settings-form-group">
                            <label className="settings-label">New Password</label>
                            <input type="password" className="settings-input" placeholder="Enter your new password" />
                        </div>

                        <div className="settings-form-group">
                            <label className="settings-label">Confirm New Password</label>
                            <input type="password" className="settings-input" placeholder="Enter new password" />
                        </div>

                        <div className="settings-actions" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
                            <Button variant="primary" className="save-changes-btn">
                                <Save size={18} /> Update Password
                            </Button>
                        </div>

                        <div className="settings-divider" style={{ margin: '2rem 0', borderBottom: '1px solid #f1f3f5' }}></div>

                        <h2 className="settings-section-title">Session Settings</h2>
                        <p className="settings-section-subtitle">Control automatic logout and session behavior</p>

                        <div className="settings-form-group">
                            <label className="settings-label">Auto-Lock After Inactivity</label>
                            <div className="select-wrapper">
                                <select className="settings-input" defaultValue="15 minutes">
                                    <option>5 minutes</option>
                                    <option>15 minutes</option>
                                    <option>30 minutes</option>
                                    <option>1 hour</option>
                                </select>
                            </div>
                        </div>

                        <div className="notification-item" style={{ borderBottom: 'none', paddingTop: '0.5rem' }}>
                            <div className="notification-info">
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#343a40' }}>Require Re-authentication</h4>
                                <p style={{ fontSize: '0.8rem', color: '#868e96', marginTop: '0.25rem' }}>Re-enter password for sensitive actions like exports</p>
                            </div>
                            <label className="toggle-switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                );
            case 'data':
                return (
                    <div>
                        <h2 className="settings-section-title">Data Management</h2>
                        <p className="settings-section-subtitle">Configure data retention and export settings</p>

                        <div className="settings-form-group">
                            <label className="settings-label">Data Retention Period</label>
                            <div className="select-wrapper">
                                <select className="settings-input" defaultValue="2 Years">
                                    <option>1 Year</option>
                                    <option>2 Years</option>
                                    <option>5 Years</option>
                                    <option>Indefinitely</option>
                                </select>
                            </div>
                        </div>

                        <div className="notification-list">
                            <div className="notification-item">
                                <div className="notification-info">
                                    <h4>Automatic Backups</h4>
                                    <p>Enable daily automatic data backups</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h4>Anonymize Exported Data</h4>
                                    <p>Remove identifying information from exports</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="settings-container">
                <div className="settings-header">
                    <h1 className="settings-page-title">Settings</h1>
                    <p className="settings-page-subtitle">Manage your account and application preferences</p>
                </div>

                <div className="settings-layout">
                    <aside className="settings-sidebar">
                        <button
                            className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <User className="settings-nav-icon" />
                            Profile
                        </button>
                        <button
                            className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell className="settings-nav-icon" />
                            Notifications
                        </button>
                        <button
                            className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Shield className="settings-nav-icon" />
                            Security
                        </button>
                        <button
                            className={`settings-nav-item ${activeTab === 'data' ? 'active' : ''}`}
                            onClick={() => setActiveTab('data')}
                        >
                            <Database className="settings-nav-icon" />
                            Data Management
                        </button>
                    </aside>

                    <main className="settings-main">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
