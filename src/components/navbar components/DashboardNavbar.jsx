
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../../styles/navbar styles/dashboardNavbar.css'
import ResuCraftLogo from './ResuCraftLogo.jsx';
import { uploadResume } from "../../services/resumeUpload.service.js"


import API from '../../api.js';

import { Menu, Plus, LogOut, Trash2, FileUp } from 'lucide-react';

const DashboardNavbar = ({
    handleLogout,
    setGlobalLoading
}) => {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);
    // const [cvDownloads, setCvDownloads] = useState(0);

    // useEffect(() => {

    //     let mounted = true;
    //     let timeforCvStat = setTimeout(() => {
    //         API.get("/api/metrics/public")
    //             .then((res) => {
    //                 if (mounted) setCvDownloads(res.data?.cvDownloads || 0);
    //             })
    //             .catch(() => { });
    //         return () => { mounted = false; };
    //     }, 2500);

    //     return () => {
    //         mounted = false;
    //         clearTimeout(timeforCvStat);
    //     }
    // }, []);

    const deleteAccount = () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        setDeletingAccount(true);
        API.delete("/api/auth/delete-account")
            .then(() => {
                handleLogout();
                alert("Your account has been deleted.");
            })
            .catch((err) => {
                console.error("Account deletion error:", err);
                alert("An error occurred while deleting your account. Please try again later.");
            })
            .finally(() => setDeletingAccount(false));
    };
    return (
        <>
            <nav className='db-navbar'>
                <div className="logo-container">
                    <ResuCraftLogo size={92} />
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
                    className={`userinfo-btn-navbar ${mobileMenuOpen ? "open" : ""} dashboard-buttons`}
                >
                    {/* <div className='download-counter'>
                        Created {String(cvDownloads).padStart(2, "0")} CVs.
                    </div> */}
                    <label className='nav-upload'>
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
                                    alert(result.message); // or set local toast/message state
                                }
                                setMobileMenuOpen(false);
                            }}
                        ></input>
                    </label>
                    <button onClick={() => { navigate('/builder'); setMobileMenuOpen(false); }}><Plus size={16} /> New CV</button>
                    <button
                        className="logout-btn"
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                    <button
                        onClick={() => { deleteAccount(); setMobileMenuOpen(false); }}
                        disabled={deletingAccount}
                    >
                        {deletingAccount ? "Deleting..." : <><Trash2 size={16} /> Delete account</>}
                    </button>
                </div>

            </nav>
        </>
    )
}

export default DashboardNavbar;
