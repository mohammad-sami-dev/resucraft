import React from 'react';
import '../../styles/navbar styles/SaveCVModal.css'

const SaveCvModal = ({ cvName, setCvName, onSave, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cvName.trim()) {
      onSave();
    }
  };

  return (
    <div className="save-cv-modal-overlay">
      <div className="save-cv-modal">
        <div className="modal-header">
          <h3>Save Your CV</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="cvName">CV Name</label>
            <input
              id="cvName"
              type="text"
              value={cvName}
              onChange={(e) => setCvName(e.target.value)}
              placeholder="e.g., Frontend Developer Resume 2024"
              autoFocus
              required
            />
            <small className="form-hint">Give your CV a descriptive name</small>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save CV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveCvModal;