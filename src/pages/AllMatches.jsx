import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { PATIENTS } from '../data/patients';
import '../styles/Dashboard.css';
import '../styles/Patients.css';

const AllMatches = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const statusOptions = ['All', 'Eligible', 'Partially Eligible', 'Not Eligible', 'Pending'];

    // Build list from centralized patients data
    const allMatches = PATIENTS.map(p => ({
        id: p.id,
        name: p.name,
        age: p.age,
        condition: p.diagnosis,
        protocol: p.protocol,
        score: p.score,
        status: p.status,
        avatar: p.avatar,
    }));

    // Filter by search + status
    const filtered = allMatches.filter(p => {
        const q = searchTerm.toLowerCase();
        const matchesSearch =
            p.name.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            p.condition.toLowerCase().includes(q) ||
            p.status.toLowerCase().includes(q);
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMatches = filtered.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
            case 'Pending': return 'status-pending';
            default: return '';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#2b8a3e';
        if (score >= 50) return '#fbc02d';
        return '#fa5252';
    };

    return (
        <DashboardLayout>
            <div className="patients-container">
                {/* Header */}
                <div className="protocol-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/dashboard')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                border: '1px solid #e9ecef', background: 'white', borderRadius: '8px',
                                padding: '0.45rem 0.85rem', cursor: 'pointer', color: '#495057',
                                fontSize: '0.875rem', fontWeight: 500,
                            }}
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                        <div>
                            <h1 className="page-title">All Patient Matches</h1>
                            <p className="page-subtitle">
                                {filtered.length} of {allMatches.length} patients shown
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search + Filter */}
                <div className="protocol-filters">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or condition..."
                            className="search-input"
                            value={searchTerm}
                            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    <div className="filter-dropdowns am-filter-chips">
                        {statusOptions.map(opt => (
                            <button
                                key={opt}
                                className="filter-btn"
                                onClick={() => { setStatusFilter(opt); setCurrentPage(1); }}
                                style={{
                                    background: statusFilter === opt ? '#2c3e50' : undefined,
                                    color: statusFilter === opt ? '#fff' : undefined,
                                    borderColor: statusFilter === opt ? '#2c3e50' : undefined,
                                    fontWeight: statusFilter === opt ? 600 : undefined,
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="patients-table-container">
                    <table className="patients-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient</th>
                                <th>Age</th>
                                <th>Condition</th>
                                <th>Protocol</th>
                                <th>Score</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMatches.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', color: '#868e96', padding: '2.5rem' }}>
                                        No patients match your search.
                                    </td>
                                </tr>
                            ) : (
                                currentMatches.map(patient => (
                                    <tr
                                        key={patient.id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/patients/${patient.id}`, { state: { patient: PATIENTS.find(p => p.id === patient.id) } })}
                                    >
                                        <td className="col-id" data-label="ID">{patient.id}</td>
                                        <td data-label="Patient">
                                            <div className="patient-info">
                                                <img src={patient.avatar} alt={patient.name} className="patient-avatar" />
                                                <div>
                                                    <div className="patient-name">{patient.name}</div>
                                                    <div className="patient-gender">{patient.condition}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Age">{patient.age} yrs</td>
                                        <td className="col-diagnosis col-hide-mobile" data-label="Condition">{patient.condition}</td>
                                        <td data-label="Protocol"><span className="protocol-badge">{patient.protocol}</span></td>
                                        <td data-label="Score">
                                            {patient.status !== 'Pending' ? (
                                                <div className="score-container">
                                                    <div className="score-bar">
                                                        <div
                                                            className="score-fill"
                                                            style={{ width: `${patient.score}%`, backgroundColor: getScoreColor(patient.score) }}
                                                        />
                                                    </div>
                                                    <span className="score-text">{patient.score}%</span>
                                                </div>
                                            ) : (
                                                <span className="score-text">—</span>
                                            )}
                                        </td>
                                        <td data-label="Status">
                                            <span className={`status-badge ${getStatusClass(patient.status)}`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                    <p className="pagination-info">
                        Showing {filtered.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} patients
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
                                    {pages.map(page => (
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
                            disabled={currentPage === totalPages || totalPages === 0}
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
        </DashboardLayout>
    );
};

export default AllMatches;
