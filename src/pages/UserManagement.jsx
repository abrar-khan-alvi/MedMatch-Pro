import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { USERS } from '../data/users';
import { UserPlus, Search, MoreVertical, Shield, ShieldCheck } from 'lucide-react';
import '../styles/UserManagement.css'; // We'll create this CSS file next

const UserManagement = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    // Redirect if not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect if not admin
    if (user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    const filteredUsers = USERS.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="user-management-container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">User Management</h1>
                        <p className="page-subtitle">Manage system access and user roles</p>
                    </div>
                    <button className="create-user-btn">
                        <UserPlus size={18} />
                        Create User
                    </button>
                </div>

                <div className="content-card">
                    <div className="table-controls">
                        <div className="search-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td>
                                            <div className="user-cell">
                                                <img src={u.avatar} alt={u.name} className="user-avatar" />
                                                <div>
                                                    <div className="user-name">{u.name}</div>
                                                    <div className="user-email">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`role-badge ${u.role}`}>
                                                {u.role === 'admin' ? <ShieldCheck size={14} /> : <Shield size={14} />}
                                                {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                                            </span>
                                        </td>
                                        <td>{u.department}</td>
                                        <td>
                                            <span className="status-badge active">Active</span>
                                        </td>
                                        <td>
                                            <button className="action-btn">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserManagement;
