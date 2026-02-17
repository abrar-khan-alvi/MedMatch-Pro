import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button';
import '../styles/Protocol.css'; // Reusing modal styles

const UploadPatientDataModal = ({ isOpen, onClose }) => {
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
        // Handle file drop here
        console.log('Files dropped:', e.dataTransfer.files);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container" style={{ width: '500px' }}> {/* Slightly smaller width for this modal */}
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
                                <Upload size={20} color="#495057" />
                            </div>
                            <div>
                                <h2>Upload Patient Data</h2>
                                <p>Fill in the details for add new protocol</p> {/* Text from screenshot, though weird context */}
                            </div>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Data Type</label>
                        <div className="select-wrapper">
                            <select className="form-input">
                                <option>Select Data type</option>
                                <option>Electronic Health Records (EHR)</option>
                                <option>Lab Results</option>
                                <option>Imaging Data</option>
                                <option>Genomic Data</option>
                            </select>
                        </div>
                    </div>

                    <div
                        className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{
                            border: '2px dashed #ced4da',
                            borderRadius: '8px',
                            padding: '3rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            backgroundColor: isDragging ? '#f8f9fa' : 'white',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem'
                        }}>
                            <Upload size={24} color="#6c757d" />
                        </div>
                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 600, color: '#343a40' }}>
                            Drop files here or click to browse
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#868e96' }}>
                            Supports PDF, CSV, XLSX up to 50MB
                        </p>
                    </div>
                </div>

                <div className="modal-footer">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="primary">Upload Data</Button>
                </div>
            </div>
        </div>
    );
};

export default UploadPatientDataModal;
