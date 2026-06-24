import React from 'react';
import '../styles/pages styles/App.css';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#1e293b', lineHeight: '1.6' }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: June 24, 2026</p>
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly, such as when you create a resume, sign up, or contact us. This may include personal identification information (name, email, etc.) and resume content.</p>
      <h2>2. How We Use Information</h2>
      <p>We use your information to provide, maintain, and improve ResuCraft services, including generating AI-powered resume content and managing your saved CVs.</p>
      <h2>3. Data Security</h2>
      <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
      <h2>4. Changes to This Policy</h2>
      <p>We may update this policy periodically. Your continued use of the service constitutes acceptance of the changes.</p>
    </div>
  );
};

export default PrivacyPolicy;
