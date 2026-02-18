import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Sparkles, ChevronDown, FlaskConical, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../components/Button';
import '../styles/AIMatching.css';

const AIMatching = () => {
    const [selectedPatientId, setSelectedPatientId] = useState('P-001');
    const [isMatching, setIsMatching] = useState(false);
    const [matchProgress, setMatchProgress] = useState(0);
    const [matchStage, setMatchStage] = useState('');
    const [isMatchComplete, setIsMatchComplete] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const patients = [
        {
            id: 'P-001',
            name: 'John Anderson',
            protocol: 'CARDIO-2024',
            status: 'Eligible',
            enrollment: 95,
            img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100',
            score: 95,
            criteria: [
                { id: 1, title: 'Age 40-70 years', detail: 'Patient is 58 years old', met: true },
                { id: 2, title: 'History of cardiovascular disease', detail: 'Documented hypertension since 2019', met: true },
                { id: 3, title: 'Blood pressure > 140/90 mmHg', detail: 'Latest BP reading: 148/95 mmHg', met: true },
                { id: 4, title: 'BMI between 25-35', detail: 'Current BMI: 28.4', met: true },
                { id: 5, title: 'No active cancer treatment', detail: 'No cancer history documented', met: true }
            ]
        },
        {
            id: 'P-002',
            name: 'Sarah Williams',
            protocol: 'ONCO-TRIAL-A',
            status: 'Partially Eligible',
            enrollment: 72,
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
            score: 72,
            criteria: [
                { id: 1, title: 'Diagnosed with Stage II-III melanoma', detail: 'Stage II melanoma confirmed', met: true },
                { id: 2, title: 'ECOG performance status 0-1', detail: 'ECOG score: 1', met: true },
                { id: 3, title: 'Adequate organ function', detail: 'All lab values within range', met: true },
                { id: 4, title: 'Prior surgery completed', detail: 'Surgery scheduled for next month', met: false }, // Example of partial/unmet
                { id: 5, title: 'No prior immunotherapy', detail: 'No immunotherapy history', met: true }
            ]
        },
        {
            id: 'P-004',
            name: 'Emily Davis',
            protocol: 'CARDIO-2024',
            status: 'Not Eligible',
            enrollment: 35,
            img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100',
            score: 35,
            criteria: [
                { id: 1, title: 'Age 40-70 years', detail: 'Patient is 72 years old (Excluded)', met: false },
                { id: 2, title: 'No recent stroke (< 6 months)', detail: 'TIA event 3 months ago - EXCLUDED', met: false },
                { id: 3, title: 'No severe kidney disease', detail: 'GFR: 28 mL/min - Below threshold', met: false }
            ]
        }
    ];

    const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

    const handleStartMatch = () => {
        setIsMatching(true);
        setMatchProgress(0);
        setMatchStage('Collecting medical documents...');

        // Simulation steps
        setTimeout(() => {
            setMatchProgress(5);
        }, 500);

        setTimeout(() => {
            setMatchProgress(45);
            setMatchStage('Analyzing eligible criteria...');
        }, 2000);

        setTimeout(() => {
            setMatchProgress(80);
            setMatchStage('Generating match score...');
        }, 3500);

        setTimeout(() => {
            setMatchProgress(100);
            setIsMatching(false);
            setIsMatchComplete(true);
        }, 5000);
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setIsMatching(false);
        setMatchProgress(0);
        setIsMatchComplete(false);
        setShowReport(false);
    };

    return (
        <DashboardLayout>
            <div className="ai-matching-container">
                <div className="ai-matching-header-card">
                    <div>
                        <h1 className="ai-page-title">AI Matching</h1>
                        <p className="ai-page-subtitle">AI-powered patient eligibility analysis</p>
                    </div>
                    <button className="run-match-btn" onClick={() => setIsModalOpen(true)}>
                        <Sparkles size={18} />
                        Run Analysis
                    </button>
                </div>

                <div className="ai-content-layout">
                    {/* Left Column: List */}
                    <div className="ai-patient-list-section">
                        <div className="ai-filters">
                            <input type="text" className="search-matches-input" placeholder="Search matches..." />
                            <button className="filter-dropdown-btn">
                                All Protocol <ChevronDown size={16} />
                            </button>
                            <button className="filter-dropdown-btn">
                                All Status <ChevronDown size={16} />
                            </button>
                        </div>

                        {patients.map(patient => (
                            <div
                                key={patient.id}
                                className={`patient-match-card ${selectedPatientId === patient.id ? 'active' : ''}`}
                                onClick={() => setSelectedPatientId(patient.id)}
                            >
                                <div className="card-top-row">
                                    <div className="patient-identity">
                                        <img src={patient.img} alt={patient.name} className="patient-photo" />
                                        <div className="patient-text">
                                            <h3>{patient.name}</h3>
                                            <p>{patient.id}</p>
                                        </div>
                                    </div>
                                    <span className={`eligibility-badge ${patient.status === 'Eligible' ? 'badge-eligible' :
                                        patient.status === 'Partially Eligible' ? 'badge-partial' : 'badge-not-eligible'
                                        }`}>
                                        {patient.status}
                                    </span>
                                </div>
                                <div className="protocol-tag">
                                    <FlaskConical size={16} color="#6c757d" />
                                    {patient.protocol}
                                </div>
                                <div className="enrollment-progress">
                                    <div className="progress-track">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${patient.enrollment}%` }}
                                        ></div>
                                    </div>
                                    <span className="enrollment-stat">{patient.enrollment}% enrolled</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Analysis */}
                    <div className="ai-analysis-panel">
                        <div className="analysis-header-card">
                            <div className="analysis-header-content">
                                <div className="analysis-icon-wrapper">
                                    <Sparkles size={24} />
                                </div>
                                <div className="analysis-title-group">
                                    <h3>AI Analysis Results</h3>
                                    <p>{selectedPatient.name} → {selectedPatient.protocol}</p>
                                </div>
                                <div className="match-score-display">
                                    <span className="score-value">{selectedPatient.score}%</span>
                                    <span className="score-label">Match Score</span>
                                </div>
                            </div>
                            <div className="score-bar-container">
                                <div
                                    className="score-bar-fill"
                                    style={{
                                        width: `${selectedPatient.score}%`,
                                        backgroundColor: selectedPatient.score > 80 ? '#fbc02d' : selectedPatient.score > 50 ? '#ffb74d' : '#e57373'
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="criteria-analysis-section">
                            <h3>Eligibility Criteria Analysis</h3>
                            {selectedPatient.criteria.map((item) => (
                                <div key={item.id} className={`criteria-card ${item.met ? 'met' : 'unmet'}`}>
                                    <div className="criteria-icon">
                                        {item.met ?
                                            <CheckCircle2 size={20} color="#558b2f" /> :
                                            <XCircle size={20} color="#c62828" />
                                        }
                                    </div>
                                    <div className="criteria-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Run New Match Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={isMatching ? null : resetModal}>
                    <div className={`modal-content ${showReport ? 'modal-large' : ''}`} onClick={(e) => e.stopPropagation()}>
                        {!isMatching && !isMatchComplete && !showReport && (
                            <>
                                <div className="modal-header">
                                    <div className="modal-icon-wrapper">
                                        <Sparkles size={20} color="#6c757d" />
                                    </div>
                                    <div className="modal-title-group">
                                        <h2>Run New AI Match</h2>
                                        <p>Select patients and studies to analyze for eligibility matching.</p>
                                    </div>
                                </div>

                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Patient Selection</label>
                                        <div className="select-wrapper">
                                            <select className="modal-select">
                                                <option>All Patient</option>
                                                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Protocol Selection</label>
                                        <div className="select-wrapper">
                                            <select className="modal-select">
                                                <option>All Protocol</option>
                                                <option>CARDIO-2024</option>
                                                <option>ONCO-TRIAL-A</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="info-box">
                                        <h4>What happens next?</h4>
                                        <ul>
                                            <li>AI analyzes patient medical records</li>
                                            <li>Compares against study criteria</li>
                                            <li>Generates eligibility scores and explanations</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn-cancel" onClick={resetModal}>Cancel</button>
                                    <button className="btn-start" onClick={handleStartMatch}>Start Matching</button>
                                </div>
                            </>
                        )}

                        {isMatching && (
                            <div className="modal-matching-state">
                                <div className="spinner-container">
                                    <div className="spinner"></div>
                                </div>
                                <h2>Run New AI Match</h2>
                                <p className="matching-stage-text">{matchStage}</p>

                                <div className="matching-progress-container">
                                    <div className="matching-progress-bar">
                                        <div className="matching-progress-fill" style={{ width: `${matchProgress}%` }}></div>
                                    </div>
                                    <p className="progress-percentage">{matchProgress}% Completed</p>
                                </div>
                            </div>
                        )}

                        {isMatchComplete && !showReport && (
                            <div className="modal-complete-state">
                                <div className="complete-icon-wrapper">
                                    <CheckCircle2 size={48} color="#2c3e50" strokeWidth={1.5} />
                                </div>
                                <h2>Matching Complete!</h2>
                                <p>AI has analyzed 12 patient protocol combinations.</p>

                                <div className="modal-footer center-footer">
                                    <button className="btn-cancel" onClick={resetModal}>Cancel</button>
                                    <button className="btn-start" onClick={() => setShowReport(true)}>View Results</button>
                                </div>
                            </div>
                        )}

                        {showReport && (
                            <div className="modal-report-state">
                                <div className="report-header">
                                    <div className="modal-title-group">
                                        <h2>Match Analysis Report</h2>
                                        <p>Comprehensive analysis for Protocol: <strong>CARDIO-2024</strong></p>
                                    </div>
                                    <div className="report-meta">
                                        <span className="meta-tag" style={{ background: '#e9ecef', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: '#495057', marginRight: '0.5rem' }}>12 Patients Analyzed</span>
                                        <span className="meta-tag" style={{ background: '#e7f5ff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: '#1971c2' }}>Run ID: #AI-9024</span>
                                    </div>
                                </div>

                                <div className="report-body">
                                    {/* Summary Cards */}
                                    <div className="report-summary-grid">
                                        <div className="summary-card">
                                            <span className="summary-value">12</span>
                                            <span className="summary-label">Total Patients Analyzed</span>
                                        </div>
                                        <div className="summary-card">
                                            <span className="summary-value" style={{ color: '#2b8a3e' }}>5</span>
                                            <span className="summary-label">Eligible Candidates</span>
                                        </div>
                                        <div className="summary-card">
                                            <span className="summary-value" style={{ color: '#e67700' }}>3</span>
                                            <span className="summary-label">Partial Matches</span>
                                        </div>
                                        <div className="summary-card">
                                            <span className="summary-value">84%</span>
                                            <span className="summary-label">Avg. Match Confidence</span>
                                        </div>
                                    </div>

                                    {/* Distribution Chart */}
                                    <div className="chart-section">
                                        <h4 className="chart-title">Eligibility Distribution Analysis</h4>
                                        <div className="distribution-chart">
                                            <div className="chart-segment" style={{ width: '42%', background: '#b2f2bb', color: '#2b8a3e', fontSize: '0.8rem' }}>42% Eligible</div>
                                            <div className="chart-segment" style={{ width: '25%', background: '#ffec99', color: '#e67700', fontSize: '0.8rem' }}>25% Partial</div>
                                            <div className="chart-segment" style={{ width: '33%', background: '#ffc9c9', color: '#c92a2a', fontSize: '0.8rem' }}>33% Not Eligible</div>
                                        </div>
                                        <div className="chart-legend">
                                            <div className="legend-item"><div className="legend-dot" style={{ background: '#b2f2bb' }}></div>High Confidence (&gt;80%)</div>
                                            <div className="legend-item"><div className="legend-dot" style={{ background: '#ffec99' }}></div>Needs Review (50-80%)</div>
                                            <div className="legend-item"><div className="legend-dot" style={{ background: '#ffc9c9' }}></div>Excluded (&lt;50%)</div>
                                        </div>
                                    </div>

                                    {/* Detailed Table */}
                                    <div className="report-table-section">
                                        <div className="report-table-container">
                                            <table className="report-table">
                                                <thead>
                                                    <tr>
                                                        <th>Patient</th>
                                                        <th>Diagnosis</th>
                                                        <th>Inclusion / Exclusion</th>
                                                        <th>Match Score</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Simulated Report Data */}
                                                    {patients.map(p => (
                                                        <React.Fragment key={p.id}>
                                                            <tr>
                                                                <td>
                                                                    <div className="report-patient-info">
                                                                        <img src={p.img} alt={p.name} className="report-avatar" />
                                                                        <div>
                                                                            <span style={{ display: 'block', fontWeight: 600, color: '#343a40' }}>{p.name}</span>
                                                                            <span style={{ fontSize: '0.75rem', color: '#868e96' }}>{p.id}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="report-detail-text" style={{ fontWeight: 500, color: '#495057' }}>
                                                                        {p.id === 'P-001' ? 'Hypertension, T2D' :
                                                                            p.id === 'P-002' ? 'Melanoma Stage II' :
                                                                                p.id === 'P-004' ? 'CAD' : 'N/A'}
                                                                    </div>
                                                                    <div style={{ fontSize: '0.75rem', color: '#adb5bd', marginTop: '2px' }}>Chronic onset &gt; 5yrs</div>
                                                                </td>
                                                                <td>
                                                                    <div className="inclusion-exclusion-list">
                                                                        {p.id === 'P-001' ? (
                                                                            <div className="criteria-detail">
                                                                                <div className="criteria-item"><span className="criteria-label">Inclusion:</span> Age 40-70, BMI 25-35, Hypertension History.</div>
                                                                                <div className="criteria-item"><span className="criteria-label">Exclusion:</span> None (No exclusionary meds found).</div>
                                                                            </div>
                                                                        ) : p.id === 'P-002' ? (
                                                                            <div className="criteria-detail">
                                                                                <div className="criteria-item"><span className="criteria-label">Inclusion:</span> Stage II Melanoma, ECOG 0-1.</div>
                                                                                <div className="criteria-item"><span className="criteria-label">Exclusion:</span> Prior Surgery (Status: Unconfirmed/Pending).</div>
                                                                            </div>
                                                                        ) : p.id === 'P-004' ? (
                                                                            <div className="criteria-detail">
                                                                                <div className="criteria-item"><span className="criteria-label">Inclusion:</span> None sufficient.</div>
                                                                                <div className="criteria-item"><span className="criteria-label">Exclusion:</span> Age &gt; 70 (72), Recent TIA Event (&lt;6mo), GFR &lt; 30.</div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="criteria-detail">Analysis pending review.</div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="report-score">
                                                                        <div className="report-score-bar">
                                                                            <div className="report-score-fill" style={{ width: `${p.score}%`, backgroundColor: p.score > 80 ? '#2b8a3e' : p.score > 50 ? '#f08c00' : '#fa5252' }}></div>
                                                                        </div>
                                                                        <span style={{ fontWeight: 700, color: '#495057' }}>{p.score}%</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className={`eligibility-badge ${p.status === 'Eligible' ? 'badge-eligible' : p.status === 'Partially Eligible' ? 'badge-partial' : 'badge-not-eligible'}`}>
                                                                        {p.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    ))}
                                                    {/* Additional Mock Rows for "Lots of details" feeling */}
                                                    <tr>
                                                        <td>
                                                            <div className="report-patient-info">
                                                                <div className="report-avatar-placeholder" style={{ background: '#e7f5ff', color: '#1971c2', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>JA</div>
                                                                <div>
                                                                    <span style={{ display: 'block', fontWeight: 600, color: '#343a40' }}>James Alex</span>
                                                                    <span style={{ fontSize: '0.75rem', color: '#868e96' }}>P-009</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="report-detail-text" style={{ fontWeight: 500, color: '#495057' }}>Uncontrolled Hypertension</div>
                                                        </td>
                                                        <td>
                                                            <p className="ai-reasoning">High potential match. BP readings consistently &gt;140/90. Medication washout period required before enrollment.</p>
                                                        </td>
                                                        <td>
                                                            <div className="report-score">
                                                                <div className="report-score-bar">
                                                                    <div className="report-score-fill" style={{ width: '88%', backgroundColor: '#2b8a3e' }}></div>
                                                                </div>
                                                                <span style={{ fontWeight: 700, color: '#495057' }}>88%</span>
                                                            </div>
                                                        </td>
                                                        <td><span className="eligibility-badge badge-eligible">Eligible</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="report-patient-info">
                                                                <div className="report-avatar-placeholder" style={{ background: '#fff0f6', color: '#c02a5c', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>MR</div>
                                                                <div>
                                                                    <span style={{ display: 'block', fontWeight: 600, color: '#343a40' }}>Maria Rodriguez</span>
                                                                    <span style={{ fontSize: '0.75rem', color: '#868e96' }}>P-012</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="report-detail-text" style={{ fontWeight: 500, color: '#495057' }}>Lung Carcinoma</div>
                                                        </td>
                                                        <td>
                                                            <p className="ai-reasoning">Excluded. Primary diagnosis does not match CARDIO-2024 scope. Referred to ONCO-TRIAL-B automatically.</p>
                                                        </td>
                                                        <td>
                                                            <div className="report-score">
                                                                <div className="report-score-bar">
                                                                    <div className="report-score-fill" style={{ width: '15%', backgroundColor: '#fa5252' }}></div>
                                                                </div>
                                                                <span style={{ fontWeight: 700, color: '#495057' }}>15%</span>
                                                            </div>
                                                        </td>
                                                        <td><span className="eligibility-badge badge-not-eligible">Not Eligible</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn-cancel" onClick={resetModal} style={{ width: 'auto', padding: '0.75rem 2rem' }}>Close Report</button>
                                    <button className="run-match-btn" onClick={() => { alert('Exporting PDF...') }} style={{ marginLeft: 'auto' }}>
                                        Export PDF
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default AIMatching;
