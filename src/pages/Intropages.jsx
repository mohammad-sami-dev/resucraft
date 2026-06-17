import React, { useState } from "react";
import formImg from "../images/formContent.png";
import previewImg from "../images/previewcontent.png";
import { FileText, Check, Sparkles, Target, ArrowLeft, ArrowRight } from 'lucide-react';

const IntroPages = ({ onFinish }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;
 
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            onFinish(); // Auto-finish on last page
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSkipIntro = () => {
        localStorage.setItem("hasSeenIntro", "true");
        onFinish();
    };

    // Page content data for cleaner JSX
    const pages = [
        {
            title: "Build a Professional CV in Minutes",
            content: [
                "Create, preview, and download polished CVs instantly",
                "No design skills required — we handle the formatting",
                "Real-time preview updates as you type",
                "Customize sections to match your career path",
                "Export as high-quality PDF with one click"
            ]
        },
        {
            title: "Simple, Guided CV Creation",
            image: formImg,
            imageAlt: "Form interface",
            leftContent: [
                "Fill your details in simple, guided steps",
                "See your CV update live as you type",
                "No guessing — clear instructions at every step",
                "Add or remove sections as needed",
                "Full-screen preview for detailed review"
            ]
        },
        {
            title: "Real-Time Preview & Professional Layouts",
            image: previewImg,
            imageAlt: "Preview interface",
            rightContent: [
                "Instant preview as you type",
                "Multiple professional layouts",
                "ATS-friendly designs",
                "Full-screen preview mode",
                "Mobile-responsive designs"
            ]
        },
        {
            title: "You're in Control",
            finalContent: [
                "Start building your CV today — take the first step towards your dream job",
                "Create professional CVs in minutes with ResuCraft",
                "Register to save multiple CV versions and access them anytime",
                "Continue as guest to build and download instantly",
                "Download in PDF format, ready to send to employers"
            ]
        }
    ];

    const currentPageData = pages[currentPage - 1];

    return (
        <div className="intro-page-container">
            <div className="intro-header">
                <div className="intro-progress">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${(currentPage / totalPages) * 100}%` }}
                        />
                    </div>
                    <span className="progress-text">Step {currentPage} of {totalPages}</span>
                </div>
                <button className="skip-btn" onClick={handleSkipIntro}>
                    Skip Tutorial
                </button>
            </div>

            <div className="intro-content">
                {/* Page 1 */}
                {currentPage === 1 && (
                    <div className="intro-page intro-page-welcome">
                        <div className="welcome-icon"><FileText size={48} /></div>
                        <h1>{currentPageData.title}</h1>
                        <div className="features-list">
                            {currentPageData.content.map((item, index) => (
                                <div key={index} className="feature-item">
                                    <span className="check-icon"><Check size={16} /></span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Page 2 */}
                {currentPage === 2 && (
                    <div className="intro-page intro-page-form">
                        <h2>{currentPageData.title}</h2>
                        <div className="intro-section">
                            <div className="intro-image-card">
                                <div className="image-label">Form Interface</div>
                                <img src={currentPageData.image} alt={currentPageData.imageAlt} />
                            </div>
                            <div className="intro-text-card">
                                <h3>How it works:</h3>
                                {currentPageData.leftContent.map((item, index) => (
                                    <div key={index} className="instruction-item">
                                        <span className="bullet">{index + 1}</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page 3 */}
                {currentPage === 3 && (
                    <div className="intro-page intro-page-preview">
                        <h2>{currentPageData.title}</h2>
                        <div className="intro-section">
                            <div className="intro-text-card">
                                <h3>Key Features:</h3>
                                {currentPageData.rightContent.map((item, index) => (
                                    <div key={index} className="feature-highlight">
                                        <span className="highlight-icon"><Sparkles size={16} /></span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="intro-image-card">
                                <div className="image-label">Preview Interface</div>
                                <img src={currentPageData.image} alt={currentPageData.imageAlt} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Page 4 */}
                {currentPage === 4 && (
                    <div className="intro-page intro-page-final">
                        <div className="final-content">
                            <div className="success-icon"><Target size={48} /></div>
                            <h1>{currentPageData.title}</h1>
                            <div className="final-messages">
                                {currentPageData.finalContent.map((item, index) => (
                                    <p key={index} className="final-message">
                                        {item}
                                    </p>
                                ))}
                            </div>
                            <div className="cta-buttons">
                                <button className="register-btn" onClick={onFinish}>
                                    Get Started Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="intro-navigation">
                <button 
                    className="nav-btn prev-btn"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <ArrowLeft size={16} /> Back
                </button>
                
                <div className="page-indicators">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`page-dot ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        />
                    ))}
                </div>
                
                <button 
                    className="nav-btn next-btn"
                    onClick={handleNextPage}
                >
                    {currentPage === totalPages ? 'Finish' : <div style={{display:'flex', alignItems:'center', gap:'4px'}}>Next <ArrowRight size={16} /></div>}
                </button>
            </div>
        </div>
    );
};

export default IntroPages;