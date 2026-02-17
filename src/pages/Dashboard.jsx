import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Users, UserCheck, AlertCircle, XCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock Data for Stats
    const stats = [
        { title: 'Total Patients', value: '1,283', subtext: 'In Database', type: 'blue', icon: <Users size={18} /> },
        { title: 'Eligible Patients', value: '847', subtext: 'Matched to criteria', type: 'yellow', icon: <UserCheck size={18} /> },
        { title: 'Partially Eligible', value: '291', subtext: 'Awaiting clinician input', type: 'gray', icon: <AlertCircle size={18} /> },
        { title: 'Not Eligible', value: '129', subtext: 'Not matching criteria', type: 'red', icon: <XCircle size={18} /> },
    ];

    // Mock Data for Recent Matches
    const recentMatches = [
        { id: 'P-001', name: 'John Anderson', age: 45, condition: 'Hypertension', score: 95, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-002', name: 'Sarah Williams', age: 37, condition: 'Melanoma Stage II', score: 72, status: 'Partially Eligible', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-003', name: 'Michael Chen', age: 52, condition: 'Mild Cognitive Impairment', score: 95, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-004', name: 'Emily Davis', age: 52, condition: 'Coronary Artery Disease', score: 35, status: 'Not Eligible', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-005', name: 'Robert Wilson', age: 55, condition: 'Type 2 Diabetes', score: 92, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-006', name: 'Jennifer Martinez', age: 48, condition: 'Breast Cancer Stage I', score: 68, status: 'Partially Eligible', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-007', name: 'David Thompson', age: 67, condition: 'Atrial Fibrillation', score: 65, status: 'Partially Eligible', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-008', name: 'Lisa Rodriguez', age: 41, condition: 'Rheumatoid Arthritis', score: 88, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-009', name: 'James Lee', age: 59, condition: 'Chronic Kidney Disease', score: 44, status: 'Not Eligible', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-010', name: 'Amanda Foster', age: 33, condition: 'Asthma', score: 78, status: 'Partially Eligible', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-011', name: 'William Garcia', age: 62, condition: 'Parkinson\'s Disease', score: 91, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-012', name: 'Rachel Kim', age: 29, condition: 'Multiple Sclerosis', score: 30, status: 'Not Eligible', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-013', name: 'Thomas Brown', age: 71, condition: 'Heart Failure', score: 56, status: 'Partially Eligible', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-014', name: 'Sophia Patel', age: 44, condition: 'Lupus (SLE)', score: 83, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 'P-015', name: 'Daniel Wright', age: 38, condition: 'Epilepsy', score: 97, status: 'Eligible', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100' },
    ];

    // Pagination logic
    const totalPages = Math.ceil(recentMatches.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMatches = recentMatches.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Eligible': return 'status-eligible';
            case 'Partially Eligible': return 'status-partial';
            case 'Not Eligible': return 'status-not-eligible';
            default: return '';
        }
    };

    return (
        <DashboardLayout>
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard Overview</h1>
                <p className="dashboard-subtitle">Overview of patient matching and clinical trial status</p>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="recent-matches-section">
                    <div className="section-header">
                        <div className="section-title">
                            <h3>Recent Patient Matches</h3>
                            <p className="section-subtitle">Latest AI matching results</p>
                        </div>
                        <a href="#" className="view-all-link">
                            View all <ArrowRight size={16} />
                        </a>
                    </div>

                    <table className="matches-table">
                        <tbody>
                            {currentMatches.map((patient) => (
                                <tr key={patient.id}>
                                    <td>
                                        <div className="patient-info">
                                            <img src={patient.avatar} alt={patient.name} className="patient-avatar" />
                                            <div className="patient-details">
                                                <h4>{patient.name}</h4>
                                                <p className="patient-meta">{patient.id} &nbsp; Age {patient.age}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="condition-info">
                                            <h4>{patient.condition}</h4>
                                            <p className="match-score">Score: {patient.score}%</p>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`status-badge ${getStatusClass(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="matches-pagination">
                        <p className="pagination-info">
                            Showing {startIndex + 1}–{Math.min(endIndex, recentMatches.length)} of {recentMatches.length} matches
                        </p>
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn pagination-nav"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {getPageNumbers().map((page) => (
                                <button
                                    key={page}
                                    className={`pagination-btn pagination-page ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                className="pagination-btn pagination-nav"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
