import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { ArrowLeft, User, Activity, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import '../styles/PatientDetails.css';

const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const patientData = location.state?.patient;

    // Fallback if accessed directly (normally would fetch API)
    const patient = patientData || {
        id: id,
        name: 'Patient Not Found',
        age: 0,
        gender: 'Unknown',
        diagnosis: 'N/A',
        protocol: 'N/A',
        status: 'Unknown',
        score: 0,
        avatar: 'https://via.placeholder.com/150'
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Eligible': return 'status-eligible';
            case 'Partially Eligible': return 'status-partial';
            case 'Not Eligible': return 'status-not-eligible';
            default: return '';
        }
    };

    return (
        <DashboardLayout>
            <div className="patient-details-container">
                {/* Header */}
                <div className="details-header-card">
                    <div className="header-left">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} /> Back
                        </button>
                        <div className="header-info">
                            <h1>Patient Details</h1>
                            <span className="patient-id-tag">ID: {patient.id}</span>
                        </div>
                    </div>
                    <div className="header-actions">
                        <Button variant="outline">Edit Patient</Button>
                        <Button variant="primary">Download Report</Button>
                    </div>
                </div>

                <div className="details-grid">
                    {/* Left Column: Profile */}
                    <div className="profile-card">
                        <img src={patient.avatar} alt={patient.name} className="profile-avatar" />
                        <h2 className="profile-name">{patient.name}</h2>
                        <p className="profile-meta">{patient.gender}, {patient.age} years</p>

                        <div className="status-section">
                            <span className="status-label">Eligibility Status</span>
                            <span className={`status-badge ${getStatusColor(patient.status)}`}>
                                {patient.status}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Information */}
                    <div className="main-info-column">
                        {/* Medical Info */}
                        <div className="info-card">
                            <h3 className="card-title">
                                <Activity size={20} className="text-blue-500" /> Medical Information
                            </h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Primary Diagnosis</label>
                                    <p>{patient.diagnosis}</p>
                                </div>
                                <div className="info-item">
                                    <label>Current Protocol</label>
                                    <p>{patient.protocol}</p>
                                </div>
                                <div className="info-item">
                                    <label>Match Score</label>
                                    <p style={{ color: patient.score > 80 ? '#2f9e44' : '#f59f00' }}>
                                        {patient.score}% Match
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Eligibility Criteria (Mocked for now) */}
                        <div className="info-card">
                            <h3 className="card-title">
                                <FileText size={20} /> Eligibility Criteria
                            </h3>
                            <div className="criteria-list">
                                <div className="criteria-item">
                                    <div className="criteria-icon met">
                                        <CheckCircle size={18} />
                                    </div>
                                    <div className="criteria-text">
                                        <h4>Age Requirement Met</h4>
                                        <p>Patient is within the 18-65 age range.</p>
                                    </div>
                                </div>
                                <div className="criteria-item">
                                    <div className="criteria-icon met">
                                        <CheckCircle size={18} />
                                    </div>
                                    <div className="criteria-text">
                                        <h4>Diagnosis Confirmed</h4>
                                        <p>Primary diagnosis matches protocol requirements.</p>
                                    </div>
                                </div>
                                {patient.status !== 'Eligible' && (
                                    <div className="criteria-item">
                                        <div className="criteria-icon unmet">
                                            <AlertCircle size={18} />
                                        </div>
                                        <div className="criteria-text">
                                            <h4>Pending Lab Results</h4>
                                            <p>Waiting for recent blood work analysis.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PatientDetails;
