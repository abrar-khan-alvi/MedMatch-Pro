import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { Users, UserCheck, AlertCircle, XCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PATIENTS, getDashboardStats } from '../data/patients';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const s = getDashboardStats();

    // Stats derived from real patient data
    const stats = [
        { title: 'Total Patients', value: String(s.total), subtext: 'In Database', type: 'blue', icon: <Users size={18} /> },
        { title: 'Eligible Patients', value: String(s.eligible), subtext: 'Matched to criteria', type: 'yellow', icon: <UserCheck size={18} /> },
        { title: 'Partially Eligible', value: String(s.partial), subtext: 'Awaiting clinician input', type: 'gray', icon: <AlertCircle size={18} /> },
        { title: 'Not Eligible', value: String(s.notEligible), subtext: 'Not matching criteria', type: 'red', icon: <XCircle size={18} /> },
    ];

    // Recent matches from centralized patient data
    const recentMatches = PATIENTS.map(p => ({
        id: p.id,
        name: p.name,
        age: p.age,
        condition: p.diagnosis,
        score: p.score,
        status: p.status,
        avatar: p.avatar,
    }));

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
        const delta = 2;
        const left = Math.max(1, currentPage - delta);
        const right = Math.min(totalPages, currentPage + delta);
        const pages = [];
        for (let i = left; i <= right; i++) pages.push(i);
        return { pages, showLeftEllipsis: left > 1, showRightEllipsis: right < totalPages };
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
                        <Link
                            to="/all-matches"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: '#2563eb',
                                textDecoration: 'none',
                                padding: '0.4rem 0.85rem',
                                borderRadius: '8px',
                                border: '1px solid #bfdbfe',
                                background: '#eff6ff',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.borderColor = '#93c5fd'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
                        >
                            View All <ArrowRight size={15} />
                        </Link>
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
                                onClick={() => goToPage(1)}
                                disabled={currentPage === 1}
                                title="First page"
                            >
                                «
                            </button>
                            <button
                                className="pagination-btn pagination-nav"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {(() => {
                                const { pages, showLeftEllipsis, showRightEllipsis } = getPageNumbers();
                                return (
                                    <>
                                        {showLeftEllipsis && <span className="pagination-ellipsis">…</span>}
                                        {pages.map((page) => (
                                            <button
                                                key={page}
                                                className={`pagination-btn pagination-page ${currentPage === page ? 'active' : ''}`}
                                                onClick={() => goToPage(page)}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        {showRightEllipsis && <span className="pagination-ellipsis">…</span>}
                                    </>
                                );
                            })()}
                            <button
                                className="pagination-btn pagination-nav"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={16} />
                            </button>
                            <button
                                className="pagination-btn pagination-nav"
                                onClick={() => goToPage(totalPages)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                title="Last page"
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
