import React, { useState } from 'react';
import { X, Plus, Upload, RefreshCw, Repeat, FileSearch, CalendarClock, Check } from 'lucide-react';
import Button from './Button';
import '../styles/Protocol.css'; // We'll add modal styles here

const CreateProtocolModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [inclusionCriteria, setInclusionCriteria] = useState(['']);
    const [exclusionCriteria, setExclusionCriteria] = useState(['']);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const addCriteria = (type) => {
        if (type === 'inclusion') setInclusionCriteria([...inclusionCriteria, '']);
        if (type === 'exclusion') setExclusionCriteria([...exclusionCriteria, '']);
    };

    const updateCriteria = (type, index, value) => {
        if (type === 'inclusion') {
            const newCriteria = [...inclusionCriteria];
            newCriteria[index] = value;
            setInclusionCriteria(newCriteria);
        } else {
            const newCriteria = [...exclusionCriteria];
            newCriteria[index] = value;
            setExclusionCriteria(newCriteria);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <div>
                        <h2>Create New Protocol</h2>
                        <p>Fill in the details for add new protocol</p>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Protocol Name</label>
                            <input type="text" placeholder="e.g., Cardiovascular Prevention Trial" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Protocol ID</label>
                            <input type="text" placeholder="e.g., CARDIO-2024" className="form-input" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Phase</label>
                            <div className="select-wrapper">
                                <select className="form-input">
                                    <option>Select Phase</option>
                                    <option>Phase I</option>
                                    <option>Phase II</option>
                                    <option>Phase III</option>
                                    <option>Phase IV</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Target Enrollment</label>
                            <input type="text" placeholder="e.g., 220" className="form-input" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Brief description of the study objectives..." className="form-textarea"></textarea>
                    </div>

                    <div className="form-group">
                        <label className="section-label-green">Inclusion Criteria</label>
                        {inclusionCriteria.map((criteria, index) => (
                            <div key={index} className="criteria-input-row">
                                <input
                                    type="text"
                                    placeholder="e.g., Age 40-70 years"
                                    className="form-input"
                                    value={criteria}
                                    onChange={(e) => updateCriteria('inclusion', index, e.target.value)}
                                />
                                {index === inclusionCriteria.length - 1 && (
                                    <button className="add-criteria-btn" onClick={() => addCriteria('inclusion')}>
                                        <Plus size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="form-group">
                        <label className="section-label-red">Exclusion Criteria</label>
                        {exclusionCriteria.map((criteria, index) => (
                            <div key={index} className="criteria-input-row">
                                <input
                                    type="text"
                                    placeholder="e.g., Active cancer treatment"
                                    className="form-input"
                                    value={criteria}
                                    onChange={(e) => updateCriteria('exclusion', index, e.target.value)}
                                />
                                {index === exclusionCriteria.length - 1 && (
                                    <button className="add-criteria-btn" onClick={() => addCriteria('exclusion')}>
                                        <Plus size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="form-group">
                        <label className="section-header-label">
                            <RefreshCw size={16} style={{ marginRight: '8px' }} /> Retest & Repeat Options
                        </label>
                        <p className="section-helper-text">Select actions allowed when a patient does not meet criteria initially.</p>

                        <div className="options-grid">
                            <div
                                className={`option-card ${selectedOptions.includes('retest') ? 'selected' : ''}`}
                                onClick={() => toggleOption('retest')}
                            >
                                <div className="checkbox-mock">
                                    {selectedOptions.includes('retest') && <Check size={12} color="white" />}
                                </div>
                                <div className="option-content">
                                    <h4>Re-test</h4>
                                    <p>Allow retesting after failed result</p>
                                </div>
                            </div>

                            <div
                                className={`option-card ${selectedOptions.includes('repeat') ? 'selected' : ''}`}
                                onClick={() => toggleOption('repeat')}
                            >
                                <div className="checkbox-mock">
                                    {selectedOptions.includes('repeat') && <Check size={12} color="white" />}
                                </div>
                                <div className="option-content">
                                    <h4>Repeat</h4>
                                    <p>Repeat assessments at intervals</p>
                                </div>
                            </div>

                            <div
                                className={`option-card ${selectedOptions.includes('rescreen') ? 'selected' : ''}`}
                                onClick={() => toggleOption('rescreen')}
                            >
                                <div className="checkbox-mock">
                                    {selectedOptions.includes('rescreen') && <Check size={12} color="white" />}
                                </div>
                                <div className="option-content">
                                    <h4>Re-screen</h4>
                                    <p>Re-screen after exclusion period</p>
                                </div>
                            </div>

                            <div
                                className={`option-card ${selectedOptions.includes('reschedule') ? 'selected' : ''}`}
                                onClick={() => toggleOption('reschedule')}
                            >
                                <div className="checkbox-mock">
                                    {selectedOptions.includes('reschedule') && <Check size={12} color="white" />}
                                </div>
                                <div className="option-content">
                                    <h4>Reschedule</h4>
                                    <p>Reschedule missed visits</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Protocol Documents</label>
                        <div className="upload-area">
                            <Upload size={24} color="#adb5bd" />
                            <span>Upload protocol documents</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="primary">Create Protocol</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateProtocolModal;
