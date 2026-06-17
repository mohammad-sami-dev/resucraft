import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar styles/navbar.css'
import ResuCraftLogo from './ResuCraftLogo.jsx';
import { uploadResume } from "../../services/resumeUpload.service.js"
import { Menu, Lock, Pencil, Layout, Download, Save, LayoutDashboard, LogIn, FileUp } from 'lucide-react';

const LockedButton = ({ children, label }) => (
    <div className="locked-btn-wrapper">
        <button className="locked-btn" disabled>
            {children}
        </button>
        <span className="lock-icon"><Lock size={14} /></span>
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
    setGlobalLoading,
    isDownloading,
    isSaving
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

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

    return (
        <nav className="cv-navbar">
            <div className='userinfo-navbar'>
                {isLoggedIn ? (
                    <h2>{username || 'Guest'}'s Workspace </h2>
                ) : (
                    <ResuCraftLogo size={40} />
                )}
            </div>
            
            <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
                aria-controls="builder-mobile-actions"
            >
                <Menu size={20} /> Menu
            </button>

            <div
                id="builder-mobile-actions"
                className={`userinfo-btn-navbar ${mobileMenuOpen ? "open" : ""}`}
            >
                <label className='nav-control'>
                    <FileUp size={16} /> Import Resume
                    <input
                        type='file'
                        accept='pdf'
                        hidden
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const result = await uploadResume(file, navigate, setGlobalLoading);
                            if (!result.success) {
                                alert(result.message);
                            }
                            setMobileMenuOpen(false);
                        }}
                    ></input>
                </label>
                
                <button className="nav-control" onClick={() => { toggleTab(); setMobileMenuOpen(false); }}>
                    {activeTab === "style" ? "Edit Content" : "Edit Style"}
                </button>

                {isLoggedIn ? (
                    <button
                        className="back-btn"
                        onClick={() => { navigateToDashboard('/dashboard'); setMobileMenuOpen(false); }}
                    >
                        <LayoutDashboard size={16} /> Dashboard
                    </button>
                ) : (
                    <LockedButton label="Sign-in to access dashboard">
                        Dashboard
                    </LockedButton>
                )}

                <button className="nav-control" onClick={() => { toggleFullScreen(); setMobileMenuOpen(false); }}>
                    {showForm === false ? <><Pencil size={16} /> Edit CV</> : "Full Screen"}
                </button>

                <button 
                    className="nav-control" 
                    onClick={() => { handleDownloadPDF(); setMobileMenuOpen(false); }}
                    disabled={isDownloading}
                >
                    {isDownloading ? <span className="spinner"></span> : <><Download size={16} /> Download</>}
                </button>

                {isLoggedIn ? (
                    <button 
                        className="nav-control" 
                        onClick={() => { setShowSaveDialog(true); setMobileMenuOpen(false); }}
                        disabled={isSaving}
                    >
                        {isSaving ? <span className="spinner"></span> : <><Save size={16} /> Save CV</>}
                    </button>
                ) : (
                    <LockedButton label="Sign-in to save your CV">
                        Save CV
                    </LockedButton>
                )}

                {!isLoggedIn && (
                    <button className='nav-control' onClick={() => {backToLandingPage(); setMobileMenuOpen(false);}}>
                        <LogIn size={16} /> Sign in
                    </button>
                )}
            </div>
        </nav>
    );
}

export default BuilderNavbar;
