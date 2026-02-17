import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, Search, ChevronDown, FlaskConical, MoreVertical, Calendar, Users, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';
import CreateProtocolModal from '../components/CreateProtocolModal';
import '../styles/Protocol.css';

const Protocol = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const protocols = [
        {
            id: 'CARDIO-2024',
            title: 'Cardiovascular Prevention Trial',
            phase: 'Phase III',
            status: 'Active',
            enrolled: 156,
            target: 200,
            date: '1/15/2025',
            percentage: 78,
            inclusion: [
                'Age 40-70 years',
                'History of cardiovascular disease',
                'Blood pressure > 140/90 mmHg',
                'BMI between 25-35'
            ],
            exclusion: [
                'Active cancer treatment',
                'Severe kidney disease (GFR < 30)',
                'Pregnancy or planning pregnancy',
                'Recent stroke (< 6 months)'
            ]
        },
        {
            id: 'ONCO-TRIAL-A',
            title: 'Oncology Immunotherapy Study',
            phase: 'Phase II',
            status: 'Active',
            enrolled: 89,
            target: 150,
            date: '2/20/2024',
            percentage: 59,
            inclusion: [
                'Age 18-75 years',
                'Histologically confirmed solid tumor',
                'ECOG performance status 0-1',
                'Adequate organ function'
            ],
            exclusion: [
                'Autoimmune disease',
                'Prior immunotherapy',
                'Active infection',
                'Symptomatic brain metastases'
            ]
        },
        {
            id: 'NEURO-STUDY',
            title: 'Neurological Assessment Protocol',
            phase: 'Phase I',
            status: 'Active',
            enrolled: 32,
            target: 50,
            date: '3/10/2024',
            percentage: 64,
            inclusion: [
                'Age > 50 years',
                'Diagnosis of mild cognitive impairment',
                'Fluent in English',
                'Able to undergo MRI'
            ],
            exclusion: [
                'History of major stroke',
                'Pacemaker or other metal implants',
                'Claustrophobia',
                'Current use of antipsychotic medication'
            ]
        }
    ];

    // Default to the first protocol selected
    const [selectedProtocol, setSelectedProtocol] = useState(protocols[0]);

    return (
        <DashboardLayout>
            <div className="protocol-container">
                <div className="protocol-header">
                    <div>
                        <h1 className="page-title">Protocol</h1>
                        <p className="page-subtitle">Manage clinical trials and eligibility criteria</p>
                    </div>
                    <Button variant="primary" className="add-protocol-btn" onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} /> Add Protocol
                    </Button>
                </div>

                <div className="protocol-filters">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search Protocol..." className="search-input" />
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

                <div className="protocol-content">
                    <div className="protocol-list">
                        {protocols.map((protocol) => (
                            <div
                                key={protocol.id}
                                className={`protocol-card ${selectedProtocol?.id === protocol.id ? 'active' : ''}`}
                                onClick={() => setSelectedProtocol(protocol)}
                            >
                                <div className="card-header">
                                    <div className="card-icon">
                                        <FlaskConical size={20} />
                                    </div>
                                    <div className="card-info">
                                        <h3>{protocol.title}</h3>
                                        <p>{protocol.id} • {protocol.phase}</p>
                                    </div>
                                    <span className="status-pill">{protocol.status}</span>
                                    <button className="more-btn"><MoreVertical size={16} /></button>
                                </div>

                                <div className="card-stats">
                                    <div className="stat-item">
                                        <Users size={16} />
                                        <span>{protocol.enrolled}/{protocol.target}</span>
                                    </div>
                                    <div className="stat-item">
                                        <Calendar size={16} />
                                        <span>{protocol.date}</span>
                                    </div>
                                </div>

                                <div className="progress-section">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${protocol.percentage}%` }}></div>
                                    </div>
                                    <span className="progress-text">{protocol.percentage}% enrolled</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="protocol-details-container">
                        {selectedProtocol ? (
                            <div className="protocol-details">
                                <div className="details-header">
                                    <div className="details-icon">
                                        <FlaskConical size={24} />
                                    </div>
                                    <div className="details-title-info">
                                        <h2>{selectedProtocol.title}</h2>
                                        <p>{selectedProtocol.id} • {selectedProtocol.phase}</p>
                                    </div>
                                </div>

                                <div className="criteria-section">
                                    <div className="criteria-header inclusion">
                                        <CheckCircle size={20} />
                                        <h3>Inclusion Criteria</h3>
                                    </div>
                                    <ul className="criteria-list inclusion-list">
                                        {selectedProtocol.inclusion.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="criteria-section">
                                    <div className="criteria-header exclusion">
                                        <XCircle size={20} />
                                        <h3>Exclusion Criteria</h3>
                                    </div>
                                    <ul className="criteria-list exclusion-list">
                                        {selectedProtocol.exclusion.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="protocol-details-placeholder">
                                <div className="placeholder-content">
                                    <div className="placeholder-icon">
                                        <FlaskConical size={48} />
                                    </div>
                                    <p>Select a protocol to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <CreateProtocolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </DashboardLayout>
    );
};

export default Protocol;
