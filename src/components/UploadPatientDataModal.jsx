import React, { useState } from 'react';
import { X, Upload, CheckCircle } from 'lucide-react';
import Button from './Button';
import '../styles/Protocol.css';
import '../styles/FileUpload.css';

const UploadPatientDataModal = ({ isOpen, onClose }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadStage, setUploadStage] = useState('idle'); // idle, uploading, success
    const [uploadProgress, setUploadProgress] = useState(0);

    if (!isOpen) return null;

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
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFiles = (fileList) => {
        const newFiles = Array.from(fileList).map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleUpload = () => {
        if (files.length === 0) return;

        setUploadStage('uploading');
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadStage('success');
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const resetModal = () => {
        setFiles([]);
        setUploadStage('idle');
        setUploadProgress(0);
        onClose();
    };

    return (
        <div className="upload-modal-overlay">
            <div className="upload-modal-container">
                <div className="upload-modal-header">
                    <div className="upload-header-content">
                        <div className="upload-icon-box">
                            <Upload size={20} />
                        </div>
                        <div className="upload-header-text">
                            <h2>Upload Patient Data</h2>
                            <p>Import clinical records (EHR, PDF, DICOM)</p>
                        </div>
                    </div>
                    <button className="upload-close-btn" onClick={resetModal}>
                        <X size={20} />
                    </button>
                </div>

                <div className="upload-modal-body">
                    {uploadStage === 'idle' && (
                        <>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Data Type</label>
                                <select className="form-input" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ced4da' }}>
                                    <option>Electronic Health Records (EHR)</option>
                                    <option>Lab Results (CSV/PDF)</option>
                                    <option>Imaging Data (DICOM)</option>
                                    <option>Genomic Data (VCF)</option>
                                </select>
                            </div>

                            <div
                                className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                <input
                                    type="file"
                                    id="file-input"
                                    hidden
                                    multiple
                                    onChange={(e) => handleFiles(e.target.files)}
                                />
                                <div className="dropzone-icon">
                                    <Upload size={24} color="#6c757d" />
                                </div>
                                <div className="dropzone-text">
                                    <h4>Drop files here or click to browse</h4>
                                    <p>Supports PDF, CSV, XLSX, DICOM up to 50MB</p>
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div className="selected-files">
                                    <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#495057' }}>Selected Files ({files.length})</h5>
                                    {files.map((file, index) => (
                                        <div key={index} className="file-item">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{file.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: '#868e96' }}>{file.size}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {uploadStage === 'uploading' && (
                        <div className="upload-processing-state">
                            <div className="processing-spinner"></div>
                            <h3>Uploading Files...</h3>
                            <p>Encrypting and parsing clinical data</p>
                            <div className="file-progress" style={{ width: '100%', background: '#e9ecef', height: '8px', borderRadius: '4px', marginTop: '1rem' }}>
                                <div className="file-progress-bar" style={{ width: `${uploadProgress}%`, background: '#1971c2', height: '100%' }}></div>
                            </div>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#868e96' }}>{uploadProgress}%</p>
                        </div>
                    )}

                    {uploadStage === 'success' && (
                        <div className="upload-success-state">
                            <div className="success-icon">
                                <CheckCircle size={32} />
                            </div>
                            <h3>Upload Complete!</h3>
                            <p>Patient data has been successfully imported and indexed.</p>
                            <p style={{ fontSize: '0.85rem', color: '#868e96', marginTop: '0.5rem' }}>3 files processed. AI analysis ready.</p>
                        </div>
                    )}
                </div>

                <div className="upload-modal-footer">
                    {uploadStage === 'idle' ? (
                        <>
                            <Button variant="outline" onClick={resetModal}>Cancel</Button>
                            <Button variant="primary" onClick={handleUpload} disabled={files.length === 0}>
                                Upload Data
                            </Button>
                        </>
                    ) : uploadStage === 'success' ? (
                        <Button variant="primary" onClick={resetModal}>Done</Button>
                    ) : (
                        <Button variant="outline" disabled>Processing...</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadPatientDataModal;
