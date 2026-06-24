import React from 'react';
import '../styles/pages styles/App.css';

const TermsOfService = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#1e293b', lineHeight: '1.6' }}>
      <h1>Terms of Service</h1>
      <p>Last updated: June 24, 2026</p>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing ResuCraft, you agree to be bound by these Terms. If you disagree, please do not use our service.</p>
      <h2>2. User Obligations</h2>
      <p>You are responsible for the content you create and for maintaining the security of your account credentials.</p>
      <h2>3. Intellectual Property</h2>
      <p>All content provided through ResuCraft is the property of ResuCraft or its content suppliers and is protected by international copyright laws.</p>
      <h2>4. Limitation of Liability</h2>
      <p>ResuCraft is provided "as is". We are not liable for any damages arising from your use of the service.</p>
    </div>
  );
};

export default TermsOfService;
