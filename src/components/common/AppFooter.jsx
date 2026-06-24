import React from "react";
import "../../styles/Footer.css"
import { Link } from 'react-router-dom';

const AppFooter = ({ onFeedbackClick, onContactClick }) => {
  return (
    <footer className="auth-footer-global">
    
        <p>© 2026 ResuCraft. All rights reserved.</p>
        <div className='footer-links'>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
          <button className="link-btn" type="button" onClick={onContactClick}>Contact Us</button>
          <button className="link-btn" type="button" onClick={onFeedbackClick}>Feedback / Report Bug</button>
        </div>
    </footer>
  );
};

export default AppFooter;
