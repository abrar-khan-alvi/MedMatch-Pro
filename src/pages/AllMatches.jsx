import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, ChevronLeft, ChevronRight, ArrowLeft, Filter } from 'lucide-react';
import '../styles/Dashboard.css'; // Re-use dashboard styles for table
import '../styles/UserManagement.css'; // Re-use user management styles for layout if needed

const AllMatches = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock Data (Expanded from Dashboard)
    const allMatches = [
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
        // ... more mock data if needed
    ];

    // Filter Logic
    const filteredMatches = allMatches.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMatches = filteredMatches.slice(startIndex, endIndex);

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
            <div className="user-management-container"> {/* Reusing container style for padding */}
                <div className="page-header" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="back-btn"
                            onClick={() => navigate('/dashboard')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                color: '#6c757d',
                                fontSize: '0.9rem'
                            }}
                        >
                            <ArrowLeft size={20} /> Back
                        </button>
                        <div>
                            <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>All Patient Matches</h1>
                            <p className="page-subtitle">Comprehensive list of AI analysis results</p>
                        </div>
                    </div>
                </div>

                <div className="content-card">
                    <div className="table-controls" style={{ padding: '0 0 1.5rem 0' }}>
                        <div className="search-wrapper" style={{ width: '100%', maxWidth: '400px' }}>
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, condition..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                            />
                        </div>
                        {/* Optional: Add Filter Button later */}
                    </div>

                    <div className="table-responsive">
                        <table className="matches-table" style={{ width: '100%' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e9ecef', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', color: '#6c757d', fontWeight: 600 }}>Patient</th>
                                    <th style={{ padding: '1rem', color: '#6c757d', fontWeight: 600 }}>Condition & Score</th>
                                    <th style={{ padding: '1rem', color: '#6c757d', fontWeight: 600, textAlign: 'right' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMatches.length > 0 ? (
                                    currentMatches.map((patient) => (
                                        <tr key={patient.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div className="patient-info">
                                                    <img src={patient.avatar} alt={patient.name} className="patient-avatar" />
                                                    <div className="patient-details">
                                                        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#212529' }}>{patient.name}</h4>
                                                        <p className="patient-meta" style={{ margin: 0, fontSize: '0.85rem', color: '#868e96' }}>{patient.id} &nbsp; Age {patient.age}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div className="condition-info">
                                                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#212529' }}>{patient.condition}</h4>
                                                    <p className="match-score" style={{ margin: 0, fontSize: '0.85rem', color: '#495057' }}>Score: <strong>{patient.score}%</strong></p>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <span className={`status-badge ${getStatusClass(patient.status)}`}>
                                                    {patient.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#adb5bd' }}>
                                            No matches found for "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="matches-pagination" style={{ padding: '1.5rem 0 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="pagination-info" style={{ color: '#868e96', fontSize: '0.9rem' }}>
                                Showing {startIndex + 1}–{Math.min(endIndex, filteredMatches.length)} of {filteredMatches.length} matches
                            </p>
                            <div className="pagination-controls" style={{ display: 'flex', gap: '0.25rem' }}>
                                <button
                                    className="pagination-btn pagination-nav"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{ padding: '0.5rem', border: '1px solid #e9ecef', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        className={`pagination-btn pagination-page ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => goToPage(page)}
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            border: '1px solid #e9ecef',
                                            borderRadius: '6px',
                                            background: currentPage === page ? '#2c3e50' : 'white',
                                            color: currentPage === page ? 'white' : '#495057',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    className="pagination-btn pagination-nav"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{ padding: '0.5rem', border: '1px solid #e9ecef', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AllMatches;
