import React, { useState } from "react";
import API from "../../api";
import "../../styles/feedback.css"

const FeedbackModal = ({ open, onClose }) => {
    const [type, setType] = useState("general");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/api/feedback", {
                type,
                email,
                message,
                context: window.location.pathname,
            });
            setMessage("");
            setEmail("");
            setType("general");
            onClose();
            alert("Thanks for the feedback.");
        } catch (err) {
            alert(err?.response?.data?.error || "Failed to send feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-overlay" onClick={onClose}>
            <div className="feedback-backdrop">
                <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                    <h3 className="feedback-title">Feedback / Bug Report</h3>
                    <form className="feedback-form" onSubmit={onSubmit}>
                        <select className="feedback-select" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="general">General</option>
                            <option value="improvement">Where should I improve?</option>
                            <option value="bug">I found a bug</option>
                        </select>
                        <input
                            type="email"
                            placeholder="Your email (optional)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="feedback-input"
                        />
                        <textarea
                            className="feedback-textarea"
                            placeholder="Write your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            minLength={10}
                            required
                        />
                        <button className="feedback-btn primary" type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Feedback"}
                        </button>
                        <button className="feedback-btn secondary" type="button" onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;