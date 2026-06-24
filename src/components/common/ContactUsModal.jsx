import React, { useState } from 'react';
import API from '../../api';
import '../../styles/feedback.css'; 

const ContactUsModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  return (
    <div className="feedback-overlay" onClick={onClose}>
        <div className="feedback-backdrop">
            <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="feedback-title">Contact Us</h3>
                <form className="feedback-form" onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                        await API.post("/api/feedback", {
                            type: 'general',
                            email: formData.email,
                            message: `Name: ${formData.name}\nMessage: ${formData.message}`,
                            context: window.location.pathname
                        });
                        alert('Message sent successfully!');
                        setFormData({ name: '', email: '', message: '' });
                        onClose();
                    } catch (err) {
                        alert('Failed to send message.');
                    } finally {
                        setLoading(false);
                    }
                }}>
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="feedback-input" />
                    <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="feedback-input" />
                    <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required className="feedback-textarea" style={{minHeight: '150px'}}></textarea>
                    <button className="feedback-btn primary" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                    <button className="feedback-btn secondary" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ContactUsModal;
