import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, Search, ChevronDown, ChevronLeft, ChevronRight, Upload, MoreVertical, Eye, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import UploadPatientDataModal from '../components/UploadPatientDataModal';
import AddPatientModal from '../components/AddPatientModal';
import '../styles/Patients.css';
import '../styles/Protocol.css'; // Reuse common styles

const Patients = () => {
    const navigate = useNavigate();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const itemsPerPage = 5;

    const patients = [
        {
            id: 'P-001',
            name: 'John Anderson',
            gender: 'Male',
            age: 45,
            diagnosis: 'Hypertension, Type 2 Diabetes',
            protocol: 'CARDIO-2024',
            score: 95,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-002',
            name: 'Sarah Williams',
            gender: 'Female',
            age: 37,
            diagnosis: 'Melanoma Stage II',
            protocol: 'ONCO-TRIAL-A',
            score: 72,
            status: 'Partially Eligible',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-003',
            name: 'Michael Chen',
            gender: 'Male',
            age: 52,
            diagnosis: 'Mild Cognitive Impairment',
            protocol: 'NEURO-STUDY',
            score: 95,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-004',
            name: 'Emily Davis',
            gender: 'Female',
            age: 52,
            diagnosis: 'Coronary Artery Disease',
            protocol: 'CARDIO-2024',
            score: 35,
            status: 'Not Eligible',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-005',
            name: 'Robert Wilson',
            gender: 'Male',
            age: 55,
            diagnosis: 'Type 2 Diabetes',
            protocol: 'DIABETES-PRO',
            score: 92,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-006',
            name: 'Jennifer Martinez',
            gender: 'Female',
            age: 48,
            diagnosis: 'Breast Cancer Stage I',
            protocol: 'ONCO-TRIAL-A',
            score: 0,
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-007',
            name: 'David Thompson',
            gender: 'Male',
            age: 67,
            diagnosis: 'Atrial Fibrillation',
            protocol: 'CARDIO-2024',
            score: 65,
            status: 'Partially Eligible',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-008',
            name: 'Lisa Rodriguez',
            gender: 'Female',
            age: 41,
            diagnosis: 'Rheumatoid Arthritis',
            protocol: 'NEURO-STUDY',
            score: 88,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-009',
            name: 'James Lee',
            gender: 'Male',
            age: 59,
            diagnosis: 'Chronic Kidney Disease',
            protocol: 'CARDIO-2024',
            score: 44,
            status: 'Not Eligible',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-010',
            name: 'Amanda Foster',
            gender: 'Female',
            age: 33,
            diagnosis: 'Asthma, Allergic Rhinitis',
            protocol: 'DIABETES-PRO',
            score: 78,
            status: 'Partially Eligible',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-011',
            name: 'William Garcia',
            gender: 'Male',
            age: 62,
            diagnosis: 'Parkinson\'s Disease',
            protocol: 'NEURO-STUDY',
            score: 91,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-012',
            name: 'Rachel Kim',
            gender: 'Female',
            age: 29,
            diagnosis: 'Multiple Sclerosis',
            protocol: 'ONCO-TRIAL-A',
            score: 0,
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-013',
            name: 'Thomas Brown',
            gender: 'Male',
            age: 71,
            diagnosis: 'Heart Failure',
            protocol: 'CARDIO-2024',
            score: 56,
            status: 'Partially Eligible',
            avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-014',
            name: 'Sophia Patel',
            gender: 'Female',
            age: 44,
            diagnosis: 'Lupus (SLE)',
            protocol: 'DIABETES-PRO',
            score: 83,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 'P-015',
            name: 'Daniel Wright',
            gender: 'Male',
            age: 38,
            diagnosis: 'Epilepsy',
            protocol: 'NEURO-STUDY',
            score: 97,
            status: 'Eligible',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
    ];

    // Pagination logic
    const totalPages = Math.ceil(patients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPatients = patients.slice(startIndex, endIndex);

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
            case 'Pending': return 'status-pending';
            default: return '';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 90) return '#fbc02d'; // Yellow/Gold
        if (score >= 50) return '#fbc02d';
        return '#e9ecef';
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

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
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
                        <input type="text" placeholder="Search Patients..." className="search-input" />
                    </div>
                    <div className="filter-dropdowns">
                        <button className="filter-btn">
                            All Status <ChevronDown size={16} />
                        </button>
                        <button className="filter-btn">
                            All Phases <ChevronDown size={16} />
                        </button>
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
                            {currentPatients.map((patient) => (
                                <tr key={patient.id}>
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
                                    <td className="action-cell" data-label="">
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                    <p className="pagination-info">
                        Showing {startIndex + 1}–{Math.min(endIndex, patients.length)} of {patients.length} patients
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

                <UploadPatientDataModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
                <AddPatientModal isOpen={isAddPatientModalOpen} onClose={() => setIsAddPatientModalOpen(false)} />
            </div>
        </DashboardLayout>
    );
};

export default Patients;
