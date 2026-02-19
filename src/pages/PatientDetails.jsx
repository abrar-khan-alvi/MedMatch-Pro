import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { ArrowLeft, User, Activity, FileText, CheckCircle, XCircle, AlertCircle, Calendar, File, ExternalLink, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import Button from '../components/Button';
import UploadPatientDataModal from '../components/UploadPatientDataModal';
import '../styles/PatientDetails.css';

const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const initialPatientData = location.state?.patient;

    // Enhanced Mock Data
    const patient = initialPatientData ? { ...initialPatientData, ...getMockDetails(initialPatientData.id) } : {
        id: id,
        name: 'John Anderson',
        age: 45,
        gender: 'Male',
        diagnosis: 'Hypertension',
        protocol: 'CARDIO-2024',
        status: 'Eligible',
        score: 95,
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100',
        ...getMockDetails(id)
    };

    function getMockDetails(patientId) {
        return {
            matchReasoning: {
                inclusions: [
                    "Age (45) falls within strict 18-65 range.",
                    "Confirmed diagnosis of Hypertension (ICD-10 I10).",
                    "No exclusionary comorbidities found."
                ],
                exclusions: [
                    "BMI (28) is approaching the upper limit (30)."
                ],
                missingData: []
            },
            evidence: [
                { id: 1, criterion: "Age 18-65", value: "45 Years", source: "Intake Form.pdf, Pg 1", status: "met" },
                { id: 2, criterion: "Diagnosis: Hypertension", value: "Confirmed (I10)", source: "Referral Letter.pdf", status: "met" },
                { id: 3, criterion: "Systolic BP > 140", value: "145 mmHg", source: "Vitals_Log_Jan.csv", status: "met" },
                { id: 4, criterion: "No Diabetes Type 1", value: "Not detected", source: "History.pdf", status: "met" },
                { id: 5, criterion: "Stable Meds > 3mo", value: "Lisinopril x 6mo", source: "Medication_List.pdf", status: "met" }
            ],
            timeline: [
                { date: "2024-01-15", title: "Referral Received", desc: "Patient referred by Dr. Smith for Cardio Trial." },
                { date: "2023-11-10", title: "Hypertension Diagnosis", desc: "Formal diagnosis confirmed via ambulatory BP monitoring." },
                { date: "2023-08-22", title: "Initial Screening", desc: "Routine checkup flagged elevated BP (138/88)." }
            ],
            documents: [
                { name: "Intake Form.pdf", date: "2024-01-15", type: "PDF" },
                { name: "Referral Letter.pdf", date: "2024-01-15", type: "PDF" },
                { name: "Vitals_Log_Jan.csv", date: "2024-01-10", type: "CSV" },
                { name: "Medication_List.pdf", date: "2023-12-05", type: "PDF" }
            ]
        };
    }

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
                        <Button variant="outline" className="gap-2" onClick={() => setIsUploadModalOpen(true)}>
                            <Upload size={18} /> Upload
                        </Button>
                        <Button variant="outline">Edit Patient</Button>
                        <Button variant="primary">Download Report</Button>
                    </div>
                </div>

                {/* AI Summary Section */}
                <div className="ai-summary-section">
                    <div className="match-score-large">
                        <div className="score-circle-large" style={{ backgroundColor: patient.score > 80 ? '#2b8a3e' : patient.score > 50 ? '#f08c00' : '#fa5252' }}>
                            {patient.score}%
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#212529' }}>AI Match Confidence</h2>
                            <p style={{ color: '#495057' }}>Based on analysis of 12 clinical documents against protocol <strong>{patient.protocol}</strong></p>
                        </div>
                    </div>

                    <div className="key-factors-grid">
                        <div className="factor-column">
                            <h4 style={{ color: '#2f9e44' }}><CheckCircle size={16} /> Key Inclusion Factors</h4>
                            <ul className="factor-list">
                                {patient.matchReasoning.inclusions.map((inc, i) => (
                                    <li key={i}>{inc}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="factor-column">
                            <h4 style={{ color: '#f08c00' }}><AlertCircle size={16} /> Potential Risks / Exclusions</h4>
                            <ul className="factor-list">
                                {patient.matchReasoning.exclusions.map((exc, i) => (
                                    <li key={i}>{exc}</li>
                                ))}
                            </ul>
                        </div>
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

                        <div className="status-section">
                            <span className="status-label">Primary Diagnosis</span>
                            <p style={{ fontWeight: 500, color: '#212529' }}>{patient.diagnosis}</p>
                        </div>
                    </div>

                    {/* Right Column: Evidence Dashboard */}
                    <div className="main-info-column">

                        {/* Evidence Table */}
                        <div className="info-card">
                            <h3 className="card-title">
                                <FileText size={20} className="text-blue-500" /> Evidence Breakdown
                            </h3>
                            <div className="table-responsive">
                                <table className="evidence-table">
                                    <thead>
                                        <tr>
                                            <th>Criterion</th>
                                            <th>Extracted Value</th>
                                            <th>Source Document</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patient.evidence.map(item => (
                                            <tr key={item.id}>
                                                <td data-label="Criterion">{item.criterion}</td>
                                                <td data-label="Extracted Value"><strong>{item.value}</strong></td>
                                                <td data-label="Source Document">
                                                    <a href="#" className="source-tag">
                                                        <File size={12} /> {item.source}
                                                    </a>
                                                </td>
                                                <td data-label="Status">
                                                    {item.status === 'met' ?
                                                        <CheckCircle size={16} color="#2f9e44" /> :
                                                        <XCircle size={16} color="#fa5252" />
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Clinical Timeline */}
                        <div className="info-card">
                            <h3 className="card-title">
                                <Activity size={20} className="text-purple-500" /> Clinical Timeline
                            </h3>
                            <div className="timeline-container">
                                {patient.timeline.map((event, i) => (
                                    <div className="timeline-item" key={i}>
                                        <div className="timeline-dot">
                                            <Calendar size={14} color="#495057" />
                                        </div>
                                        <div className="timeline-content">
                                            <span className="timeline-date">{event.date}</span>
                                            <h4 className="timeline-title">{event.title}</h4>
                                            <p className="timeline-desc">{event.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Source Documents */}
                        <div className="info-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 className="card-title" style={{ marginBottom: 0 }}>
                                    <File size={20} className="text-gray-500" /> Source Documents
                                </h3>
                            </div>
                            <div className="doc-list">
                                {patient.documents.map((doc, i) => (
                                    <div className="doc-item" key={i}>
                                        <div className="doc-info">
                                            <FileText size={20} color="#6c757d" />
                                            <div>
                                                <div className="doc-name">{doc.name}</div>
                                                <div className="doc-meta">{doc.type} • {doc.date}</div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                                            View <ExternalLink size={12} style={{ marginLeft: 4 }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <UploadPatientDataModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
        </DashboardLayout>
    );
};

export default PatientDetails;
