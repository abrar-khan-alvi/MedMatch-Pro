import React, { useState } from 'react';
import { X, User, Upload } from 'lucide-react';
import Button from './Button';
import '../styles/Protocol.css'; // Reusing modal styles

const AddPatientModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        // Handle file drop
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container" style={{ width: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                <div className="modal-header">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                border: '1px solid #e9ecef',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <User size={20} color="#495057" />
                            </div>
                            <div>
                                <h2>Add New Patient</h2>
                                <p>Fill in the details for add new patient</p>
                            </div>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body" style={{ flex: 1, overflowY: 'auto' }}>

                    {/* Personal Information */}
                    <div className="form-section">
                        <h3 className="section-title">Personal Information</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-input" placeholder="e.g., Cardiovascular Prevention Trial" />
                            </div>
                            <div className="form-group">
                                <label>Protocol ID</label>
                                <input type="text" className="form-input" placeholder="e.g., CARDIO-2024" />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Age</label>
                                <input type="text" className="form-input" placeholder="e.g., 34" />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <div className="select-wrapper">
                                    <select className="form-input">
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-input" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" className="form-input" placeholder="+123456789" />
                            </div>
                        </div>
                    </div>

                    {/* Medical Information */}
                    <div className="form-section">
                        <h3 className="section-title">Medical Information</h3>

                        <div className="form-group">
                            <label>Primary Diagnosis</label>
                            <input type="text" className="form-input" placeholder="e.g., Age 40-70 years" />
                        </div>

                        <div className="form-group">
                            <label>Medical History</label>
                            <textarea className="form-input" rows="3" placeholder="Previous surgeries, chronic conditions relevant history..."></textarea>
                        </div>

                        <div className="form-group">
                            <label>Current Medications</label>
                            <textarea className="form-input" rows="3" placeholder="List current medications and dosages..."></textarea>
                        </div>
                    </div>

                    {/* Assign to protocol */}
                    <div className="form-section">
                        <h3 className="section-title">Assign to protocol</h3>
                        <div className="form-group">
                            <div className="select-wrapper">
                                <select className="form-input">
                                    <option>Select a protocol</option>
                                    <option>CARDIO-2024</option>
                                    <option>ONCO-TRIAL-A</option>
                                    <option>NEURO-STUDY</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Patient Documents */}
                    <div className="form-section">
                        <h3 className="section-title">Patient Documents</h3>
                        <div
                            className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{
                                border: '2px dashed #dee2e6',
                                borderRadius: '12px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: isDragging ? '#e9ecef' : '#f8f9fa',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                minHeight: '140px'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: '#e7f5ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <Upload size={24} color="#1864ab" />
                            </div>
                            <span style={{ fontSize: '0.95rem', color: '#343a40', fontWeight: 500 }}>Click to upload or drag and drop</span>
                            <span style={{ fontSize: '0.85rem', color: '#868e96', marginTop: '0.5rem' }}>SVG, PNG, JPG or GIF (max. 800x400px)</span>
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="primary">Add Patient</Button>
                </div>
            </div>
        </div>
    );
};

export default AddPatientModal;
