
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../../styles/navbar styles/navbar.css'
import ResuCraftLogo from './ResuCraftLogo.jsx';

import { uploadResume } from "../../services/resumeUpload.service.js"




const LockedButton = ({ children, label }) => (
    <div className="locked-btn-wrapper">
        <button className="locked-btn" disabled>
            {children}

        </button>
        <span className="lock-icon">🔒</span>
        <span className="lock-tooltip">{label}</span>
    </div>
);



const BuilderNavbar = ({
    activeTab,
    setActiveTab,
    handleStylePage,
    currentLayout,
    isLoggedIn,
    handleDownloadPDF,
    setShowSaveDialog,
    showForm,
    setShowForm,
    navigateToDashboard,
    username,
    setGlobalLoading
}) => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const toggleTab = () => {
        const nextTab = activeTab === "style" ? "content" : "style";
        setActiveTab(nextTab);
        handleStylePage(currentLayout);

    };

    const toggleFullScreen = () => {
        setShowForm(prev => !prev);
        setActiveTab(prev => (prev === 'preview' ? 'content' : 'preview'))
    };

    const backToLandingPage = () => {
        if (sessionStorage.getItem("importedResume")) { sessionStorage.removeItem("importedResume") }
        navigate('/')
    }



    const navigate = useNavigate();
    return (
        <>

            {isLoggedIn && (
                <nav className="cv-navbar">
                    <div className='userinfo-navbar'>
                        <h2>{username || 'Guest'}'s Workspace </h2>
                    </div>
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen((v) => !v)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="builder-mobile-actions"
                    >
                        ☰ Menu
                    </button>
                    <div
                        id="builder-mobile-actions"
                        className={`userinfo-btn-navbar ${mobileMenuOpen ? "open" : ""}`}
                    >

                        <label className='nav-control'>
                            Import Resume
                            <input
                                type='file'
                                accept='pdf'
                                hidden
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    const result = await uploadResume(file, navigate, setGlobalLoading);
                                    if (!result.success) {
                                        alert(result.message); // or set local toast/message state
                                    }
                                    setMobileMenuOpen(false);
                                }}
                            ></input>
                        </label>
                        <button className="active" onClick={() => { toggleTab(); setMobileMenuOpen(false); }}>
                            {activeTab === "style" ? "Edit Content" : "Edit Style"}
                        </button>
                        <button
                            className="back-btn"
                            onClick={() => { navigateToDashboard('/dashboard'); setMobileMenuOpen(false); }}
                        >
                            Dashboard
                        </button>
                        <button className="fullscreen-edit-btn" onClick={() => { toggleFullScreen(); setMobileMenuOpen(false); }}>
                            {showForm === false ? "Edit CV" : "Full Screen"}
                        </button>
                        <button onClick={() => { handleDownloadPDF(); setMobileMenuOpen(false); }}>Download PDF</button>
                        <button onClick={() => { setShowSaveDialog(true); setMobileMenuOpen(false); }}>
                            Save CV
                        </button>



                    </div>

                </nav>
            )} 
            {!isLoggedIn && (
                <nav className="cv-navbar">
                    <div className='userinfo-navbar' style={{ backgroundColor: 'aqua' }}>
                        <ResuCraftLogo size={40} />
                    </div>
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen((v) => !v)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="builder-mobile-actions"
                    > 
                    
                        ☰ Menu
                    </button>
                    <div className={`userinfo-btn-navbar ${mobileMenuOpen ? "open" : ""}`} id="builder-mobile-actions">
                        <label className='nav-control'>
                            Import Resume
                            <input
                                type='file'
                                accept='pdf'
                                hidden
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    const result = await uploadResume(file, navigate, setGlobalLoading);
                                    if (!result.success) {
                                        alert(result.message); // or set local toast/message state
                                    }
                                    setMobileMenuOpen(false);
                                }}
                            ></input>
                        </label>
                        <button className="nav-control" onClick={() => { toggleTab(); setMobileMenuOpen(false); }}>
                            {activeTab === "style" ? "Edit Content" : "Edit Style"}
                        </button>
                        <LockedButton label="Sign-in to access dashboard">
                            Dashboard
                        </LockedButton>
                        <button className="nav-control" onClick={() => {toggleFullScreen();setMobileMenuOpen(false);}}>
                            {showForm === false ? "✏️ Edit CV" : "Full Screen"}
                        </button>
                        <button className="nav-control" onClick={() => {handleDownloadPDF();setMobileMenuOpen(false);}}>Download</button>
                        <LockedButton label="Sign-in to save your CV">
                            Save CV
                        </LockedButton>
                        <button className='nav-control' onClick={() => {backToLandingPage(); setMobileMenuOpen(false);}}>Sign in</button>
                    </div>

                </nav>
            )}
        </>


    )
}



export default BuilderNavbar;
