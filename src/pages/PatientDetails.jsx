import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import {
    ArrowLeft, User, Phone, Calendar, Activity, Pill,
    FlaskConical, FileText, CheckCircle, XCircle, AlertCircle,
    Clock, Stethoscope, ClipboardList, Upload, Download, ExternalLink
} from 'lucide-react';
import Button from '../components/Button';
import UploadPatientDataModal from '../components/UploadPatientDataModal';
import { PATIENTS } from '../data/patients';
import '../styles/PatientDetails.css';

/* ── build timeline events from patient data ── */
const buildTimeline = (p) => {
    const events = [];
    if (p.dob) events.push({ date: 'Registered', label: 'Patient registered in system', type: 'info' });
    events.push({ date: 'Diagnosis', label: `Confirmed: ${p.diagnosis}`, type: 'diagnosis' });
    if (p.labValue && p.labValue !== 'Pending') {
        events.push({ date: 'Lab Result', label: `${p.labParameter}: ${p.labValue}`, type: 'lab' });
    }
    if (p.medication) {
        events.push({ date: 'Medication', label: `Assigned: ${p.medication}`, type: 'medication' });
    }
    events.push({ date: 'Protocol', label: `Enrolled in ${p.protocol}`, type: 'protocol' });
    if (p.status === 'Eligible') events.push({ date: 'AI Match', label: 'Patient marked Eligible ✓', type: 'success' });
    else if (p.status === 'Partially Eligible') events.push({ date: 'AI Match', label: 'Requires clinician review', type: 'warning' });
    else if (p.status === 'Not Eligible') events.push({ date: 'AI Match', label: 'Not eligible for current protocol', type: 'error' });
    else events.push({ date: 'Pending', label: 'Awaiting lab data for analysis', type: 'pending' });
    return events;
};

/* ── build source documents from patient data ── */
const buildDocuments = (p) => [
    { name: `${p.name.replace(' ', '_')}_Medical_History.pdf`, type: 'PDF', size: '1.2 MB', date: 'Feb 2025', icon: '📄' },
    { name: `Lab_Report_${p.labParameter || 'Results'}.xlsx`, type: 'XLSX', size: '340 KB', date: 'Jan 2025', icon: '🧪' },
    { name: `Consent_Form_${p.protocol}.pdf`, type: 'PDF', size: '580 KB', date: 'Dec 2024', icon: '📋' },
    { name: `AI_Match_Analysis_${p.id}.pdf`, type: 'PDF', size: '890 KB', date: 'Feb 2025', icon: '🤖' },
];

/* ── helpers ── */
const statusClass = (s) => {
    if (s === 'Eligible') return 'status-eligible';
    if (s === 'Partially Eligible') return 'status-partial';
    if (s === 'Not Eligible') return 'status-not-eligible';
    return 'status-pending';
};

const scoreColor = (score) => {
    if (score >= 80) return '#2b8a3e';
    if (score >= 50) return '#f08c00';
    return '#fa5252';
};

const InfoRow = ({ icon, label, value }) => (
    <div className="pd-info-row">
        <span className="pd-info-icon">{icon}</span>
        <span className="pd-info-label">{label}</span>
        <span className="pd-info-value">{value || '—'}</span>
    </div>
);

/* ai reasoning lines per status */
const buildReasoning = (p) => {
    const inc = [], exc = [];
    if (p.status === 'Eligible' || p.status === 'Partially Eligible') {
        inc.push(`Diagnosis (${p.diagnosis}) aligns with protocol ${p.protocol} criteria.`);
        if (p.labParameter && p.labValue && p.labValue !== 'Pending') {
            inc.push(`Lab result ${p.labParameter}: ${p.labValue} is within acceptable range.`);
        }
        inc.push(`Current medication (${p.medication}) is compatible with trial requirements.`);
    }
    if (p.status === 'Partially Eligible') {
        exc.push(`One or more secondary criteria require clinician review.`);
        exc.push(`Lab value ${p.labParameter}: ${p.labValue} is borderline — manual confirmation needed.`);
    }
    if (p.status === 'Not Eligible') {
        exc.push(`${p.diagnosis} does not meet primary inclusion criteria for ${p.protocol}.`);
        exc.push(`Lab result ${p.labParameter}: ${p.labValue} falls outside the protocol's acceptable range.`);
    }
    if (p.status === 'Pending') {
        exc.push(`Screening not yet completed — awaiting lab results.`);
        exc.push(`AI analysis will run once all required data is available.`);
    }
    return { inc, exc };
};

/* evidence rows derived from patient fields */
const buildEvidence = (p) => [
    { criterion: 'Patient ID', value: p.id, status: 'met' },
    { criterion: 'Date of Birth', value: p.dob || '—', status: 'met' },
    { criterion: 'Gender', value: p.gender, status: 'met' },
    { criterion: 'Primary Diagnosis', value: p.diagnosis, status: 'met' },
    { criterion: `Lab: ${p.labParameter || 'N/A'}`, value: p.labValue || '—', status: p.labValue && p.labValue !== 'Pending' ? 'met' : 'missing' },
    { criterion: 'Current Medication', value: p.medication, status: 'met' },
    { criterion: 'Assigned Protocol', value: p.protocol, status: 'met' },
    { criterion: 'AI Match Score', value: p.status === 'Pending' ? 'Pending' : `${p.score}%`, status: p.score >= 50 ? 'met' : 'unmet' },
];

/* ── component ── */
const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Get patient: prefer navigation state, fall back to PATIENTS lookup
    const passed = location.state?.patient;
    const patient = passed
        ? PATIENTS.find(p => p.id === passed.id) || passed
        : PATIENTS.find(p => p.id === id) || { id, name: 'Unknown', status: 'Pending', score: 0, protocol: '—' };

    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const { inc, exc } = buildReasoning(patient);
    const evidence = buildEvidence(patient);
    const timeline = buildTimeline(patient);
    const documents = buildDocuments(patient);
    const isPending = patient.status === 'Pending';

    return (
        <DashboardLayout>
            <div className="patient-details-container">

                {/* ── Top header bar ── */}
                <div className="pd-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button className="pd-back-btn" onClick={() => navigate(-1)}>
                            <ArrowLeft size={16} /> Back
                        </button>
                        <h1 className="pd-page-title">Patient Details</h1>
                        <span className="pd-id-badge">{patient.id}</span>
                    </div>
                    <div className="pd-topbar-actions">
                        <Button variant="outline" onClick={() => setIsUploadOpen(true)}>
                            <Upload size={16} /> Upload Data
                        </Button>
                        <Button variant="outline">Edit Patient</Button>
                        <Button variant="primary">Download Report</Button>
                    </div>
                </div>

                {/* ── Two-column main layout ── */}
                <div className="pd-main-grid">

                    {/* ══ LEFT COLUMN ══ */}
                    <div className="pd-left-col">

                        {/* Profile card */}
                        <div className="pd-card pd-profile-card">
                            <img src={patient.avatar} alt={patient.name} className="pd-avatar" />
                            <h2 className="pd-patient-name">{patient.name}</h2>
                            <p className="pd-patient-sub">{patient.gender}, {patient.age} yrs</p>

                            {/* Score ring */}
                            <div className="pd-score-ring" style={{ borderColor: isPending ? '#adb5bd' : scoreColor(patient.score) }}>
                                <span className="pd-score-num" style={{ color: isPending ? '#adb5bd' : scoreColor(patient.score) }}>
                                    {isPending ? '—' : `${patient.score}%`}
                                </span>
                                <span className="pd-score-label">AI Match Score</span>
                            </div>
                        </div>

                        {/* Demographics card */}
                        <div className="pd-card">
                            <h3 className="pd-card-title"><User size={16} /> Patient Information</h3>
                            <InfoRow icon={<Calendar size={14} />} label="Date of Birth" value={patient.dob} />
                            <InfoRow icon={<Phone size={14} />} label="Phone" value={patient.phone} />
                            <InfoRow icon={<User size={14} />} label="Gender" value={patient.gender} />
                            <InfoRow icon={<Clock size={14} />} label="Age" value={patient.age ? `${patient.age} years` : '—'} />
                        </div>

                        {/* Clinical card */}
                        <div className="pd-card">
                            <h3 className="pd-card-title"><Stethoscope size={16} /> Clinical Data</h3>
                            <InfoRow icon={<ClipboardList size={14} />} label="Diagnosis" value={patient.diagnosis} />
                            <InfoRow icon={<FlaskConical size={14} />} label={patient.labParameter || 'Lab Parameter'} value={patient.labValue} />
                            <InfoRow icon={<Pill size={14} />} label="Medication" value={patient.medication} />
                            <InfoRow icon={<Activity size={14} />} label="Protocol" value={patient.protocol} />
                        </div>
                    </div>

                    {/* ══ RIGHT COLUMN ══ */}
                    <div className="pd-right-col">

                        {/* AI Analysis banner */}
                        <div className="pd-card pd-ai-banner">
                            <div className="pd-ai-header">
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#212529' }}>AI Match Analysis</h3>
                                    <p style={{ margin: '0.25rem 0 0', color: '#6c757d', fontSize: '0.875rem' }}>
                                        Protocol: <strong>{patient.protocol}</strong>
                                    </p>
                                </div>
                                <span className={`status-badge ${statusClass(patient.status)}`}>{patient.status}</span>
                            </div>

                            <div className="pd-reasons-grid">
                                {/* Inclusions */}
                                <div className="pd-reason-col pd-reason-green">
                                    <h4><CheckCircle size={15} /> Inclusion Factors</h4>
                                    {inc.length > 0 ? (
                                        <ul>{inc.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                    ) : (
                                        <p className="pd-empty-reason">No inclusion factors — analysis pending.</p>
                                    )}
                                </div>
                                {/* Exclusions */}
                                <div className="pd-reason-col pd-reason-orange">
                                    <h4><AlertCircle size={15} /> Risks / Exclusions</h4>
                                    {exc.length > 0 ? (
                                        <ul>{exc.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                    ) : (
                                        <p className="pd-empty-reason">No exclusion flags found.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Evidence table */}
                        <div className="pd-card">
                            <h3 className="pd-card-title"><FileText size={16} /> Evidence Breakdown</h3>
                            <div className="pd-evidence-wrapper">
                                <table className="pd-evidence-table">
                                    <thead>
                                        <tr>
                                            <th>Criterion</th>
                                            <th>Value from Record</th>
                                            <th style={{ textAlign: 'center' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evidence.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.criterion}</td>
                                                <td><strong>{row.value}</strong></td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {row.status === 'met' && <CheckCircle size={16} color="#2f9e44" />}
                                                    {row.status === 'unmet' && <XCircle size={16} color="#fa5252" />}
                                                    {row.status === 'missing' && <AlertCircle size={16} color="#f08c00" />}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Legend */}
                            <div className="pd-legend">
                                <span><CheckCircle size={13} color="#2f9e44" /> Met</span>
                                <span><AlertCircle size={13} color="#f08c00" /> Needs Review</span>
                                <span><XCircle size={13} color="#fa5252" /> Not Met</span>
                            </div>
                        </div>

                        {/* ── Clinical Timeline ── */}
                        <div className="pd-card">
                            <h3 className="pd-card-title"><Clock size={16} /> Clinical Timeline</h3>
                            <div className="pd-timeline">
                                {timeline.map((event, i) => (
                                    <div key={i} className="pd-timeline-row">
                                        {/* left: connector */}
                                        <div className="pd-tl-track">
                                            <div className={`pd-tl-dot pd-dot-${event.type}`} />
                                            {i < timeline.length - 1 && <div className="pd-tl-line" />}
                                        </div>
                                        {/* right: content */}
                                        <div className="pd-tl-body">
                                            <span className={`pd-tl-badge pd-badge-${event.type}`}>{event.date}</span>
                                            <p className="pd-tl-label">{event.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Source Documents ── */}
                        <div className="pd-card">
                            <div className="pd-documents-list">
                                {documents.map((doc, i) => (
                                    <div key={i} className="pd-document-row">
                                        <span className="pd-doc-icon">{doc.icon}</span>
                                        <div className="pd-doc-info">
                                            <p className="pd-doc-name">{doc.name}</p>
                                            <span className="pd-doc-meta">{doc.type} · {doc.size} · {doc.date}</span>
                                        </div>
                                        <button className="pd-doc-action" title="Download">
                                            <Download size={15} />
                                        </button>
                                        <button className="pd-doc-action" title="View">
                                            <ExternalLink size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <UploadPatientDataModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
        </DashboardLayout>
    );
};

export default PatientDetails;

