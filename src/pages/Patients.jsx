import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, Search, ChevronDown, ChevronLeft, ChevronRight, Upload, MoreVertical, Eye, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import UploadPatientDataModal from '../components/UploadPatientDataModal';
import AddPatientModal from '../components/AddPatientModal';
import { PATIENTS } from '../data/patients';
import '../styles/Patients.css';
import '../styles/Protocol.css';

const Patients = () => {
    const navigate = useNavigate();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const itemsPerPage = 8;

    const statusOptions = ['All', 'Eligible', 'Partially Eligible', 'Not Eligible', 'Pending'];

    const filteredPatients = PATIENTS.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPatients = filteredPatients.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const getPageNumbers = () => {
        // Show at most 5 page buttons: 2 before + current + 2 after
        const pages = [];
        const delta = 2;
        const left = Math.max(1, currentPage - delta);
        const right = Math.min(totalPages, currentPage + delta);
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

    const toggleDropdown = (id, e) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const handleViewDetails = (patient) => {
        navigate(`/patients/${patient.id}`, { state: { patient } });
        setActiveDropdown(null);
    };

    const handleDelete = (id) => {
        console.log('Delete patient:', id);
        alert(`Delete patient ${id}`);
        setActiveDropdown(null);
    };

    const handleStatusFilter = (option) => {
        setStatusFilter(option);
        setShowStatusDropdown(false);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
            setShowStatusDropdown(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <DashboardLayout>
            <div className="patients-container">
                <div className="protocol-header">
                    <div>
                        <h1 className="page-title">Patients</h1>
                        <p className="page-subtitle">Manage patient records and eligibility status</p>
                    </div>
                    <div className="header-actions">
                        <Button
                            variant="outline"
                            className="upload-btn"
                            onClick={() => setIsUploadModalOpen(true)}
                        >
                            <Upload size={18} /> Upload Data
                        </Button>
                        <Button
                            variant="primary"
                            className="add-patient-btn"
                            onClick={() => setIsAddPatientModalOpen(true)}
                        >
                            <Plus size={18} /> Add Patient
                        </Button>
                    </div>
                </div>

                <div className="protocol-filters">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or diagnosis..."
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="filter-dropdowns">
                        {/* Status Filter Dropdown */}
                        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <button
                                className="filter-btn"
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            >
                                {statusFilter} <ChevronDown size={16} />
                            </button>
                            {showStatusDropdown && (
                                <div className="action-menu" style={{ top: '110%', right: 0, left: 'auto', minWidth: '160px', zIndex: 100 }}>
                                    {statusOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`action-item ${statusFilter === opt ? 'active' : ''}`}
                                            onClick={() => handleStatusFilter(opt)}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="patients-table-container">
                    <table className="patients-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient</th>
                                <th>Age</th>
                                <th>Diagnosis</th>
                                <th>Protocol</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: 'center', color: '#868e96', padding: '2rem' }}>
                                        No patients match your search.
                                    </td>
                                </tr>
                            ) : (
                                currentPatients.map((patient) => (
                                    <tr key={patient.id} onClick={() => handleViewDetails(patient)} style={{ cursor: 'pointer' }}>
                                        <td className="col-id" data-label="ID">{patient.id}</td>
                                        <td data-label="Patient">
                                            <div className="patient-info">
                                                <img src={patient.avatar} alt={patient.name} className="patient-avatar" />
                                                <div>
                                                    <div className="patient-name">{patient.name}</div>
                                                    <div className="patient-gender">{patient.gender}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Age">{patient.age} yrs</td>
                                        <td className="col-diagnosis" data-label="Diagnosis">{patient.diagnosis}</td>
                                        <td data-label="Protocol">
                                            <span className="protocol-badge">{patient.protocol}</span>
                                        </td>
                                        <td data-label="Score">
                                            {patient.status !== 'Pending' ? (
                                                <div className="score-container">
                                                    <div className="score-bar">
                                                        <div
                                                            className="score-fill"
                                                            style={{ width: `${patient.score}%`, backgroundColor: getScoreColor(patient.score) }}
                                                        ></div>
                                                    </div>
                                                    <span className="score-text">{patient.score}%</span>
                                                </div>
                                            ) : (
                                                <span className="score-text">-</span>
                                            )}
                                        </td>
                                        <td data-label="Status">
                                            <span className={`status-badge ${getStatusClass(patient.status)}`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="action-cell" data-label="" onClick={e => e.stopPropagation()}>
                                            <button className="action-btn" onClick={(e) => toggleDropdown(patient.id, e)}>
                                                <MoreVertical size={16} />
                                            </button>
                                            {activeDropdown === patient.id && (
                                                <div className="action-menu" onClick={(e) => e.stopPropagation()}>
                                                    <button className="action-item" onClick={() => handleViewDetails(patient)}>
                                                        <Eye size={16} /> View Details
                                                    </button>
                                                    <button className="action-item delete" onClick={() => handleDelete(patient.id)}>
                                                        <Trash2 size={16} /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination-container">
                    <p className="pagination-info">
                        Showing {filteredPatients.length === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} patients
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
                                    {showLeftEllipsis && (
                                        <span className="pagination-ellipsis">…</span>
                                    )}
                                    {pages.map(page => (
                                        <button
                                            key={page}
                                            className={`pagination-btn pagination-page ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    {showRightEllipsis && (
                                        <span className="pagination-ellipsis">…</span>
                                    )}
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

                <UploadPatientDataModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
                <AddPatientModal isOpen={isAddPatientModalOpen} onClose={() => setIsAddPatientModalOpen(false)} />
            </div>
        </DashboardLayout>
    );
};

export default Patients;
