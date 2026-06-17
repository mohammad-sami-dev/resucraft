import React, { useEffect, useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';

import '../styles/pages styles/dashboard.css';
import DashboardNavbar from '../components/navbar components/DashboardNavbar.jsx';
import AppFooter from '../components/common/AppFooter.jsx';
import Feedback from '../components/feedback/Feedback.jsx';

import { 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiFileText, 
  FiCalendar,
  FiDownload,
  FiEye
} from 'react-icons/fi';

const Dashboard = ({setGlobalLoading}) => {
    const [cvs, setCvs] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(''); // Added this line
    const [showFeedback, setShowFeedback] = useState(false);

    const [stats, setStats] = useState({
        total: 0,
        lastCreated: null,
        mostEdited: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/api/auth/user');
                setUsername(res.data.username);
            } catch (err) {
                console.error('Failed to fetch user: ', err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const res = await API.get('/api/cv/all');
                setCvs(res.data);
                
                // Calculate stats
                if (res.data.length > 0) {
                    setStats({
                        total: res.data.length,
                        lastCreated: res.data[res.data.length - 1],
                        mostEdited: res.data.reduce((prev, current) => 
                            (prev.updatedAt || prev.createdAt) > (current.updatedAt || current.createdAt) ? prev : current
                        )
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCvs();
    }, []);

    const deleteCv = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this CV?")) return;
            
            await API.delete(`/api/cv/${id}`);
            setCvs(prevCvs => prevCvs.filter(cv => cv._id !== id));
            
            // Show success message
            setMessage('CV deleted successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Error deleting CV:', err.response?.data || err.message);
            setMessage('Failed to delete CV');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        if(sessionStorage.getItem("importedResume")){sessionStorage.removeItem("importedResume")}
        navigate('/');
    };

    const handleCreateNew = () => {
        navigate('/builder');
    };

    const handleEdit = (id) => {
        navigate(`/builder?id=${id}`);
    };

    const handlePreview = (id) => {
        navigate(`/preview/${id}`);
    };

    const handleDownload = async (id) => {
        try {
            const response = await API.get(`/api/cv/${id}/download`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `CV_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Download failed:', err);
            setMessage('Download failed. Please try again.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className='dashboard'>
            <DashboardNavbar
                username={username}
                handleLogout={handleLogout}
                setGlobalLoading={setGlobalLoading}
            />

            <div className='dashboard-container'>
                {/* Welcome Section */}
                <div className='welcome-section'>
                    <div className='welcome-content'>
                        <h1>Welcome back, {username || 'User'}! 👋</h1>
                        <p>Manage and create professional resumes in one place</p>
                    </div>
                    <button className='create-new-btn' onClick={handleCreateNew}>
                        <FiPlus size={20} />
                        Create New CV
                    </button>
                </div>

                {/* Stats Overview */}
                <div className='stats-overview'>
                    <div className='stat-card'>
                        <div className='stat-icon'>
                            <FiFileText size={24} />
                        </div>
                        <div className='stat-content'>
                            <h3>{stats.total}</h3>
                            <p>Total CVs</p>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>
                            <FiCalendar size={24} />
                        </div>
                        <div className='stat-content'>
                            <h3>{stats.lastCreated ? formatDate(stats.lastCreated.createdAt) : 'N/A'}</h3>
                            <p>Last Created</p>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>
                            <FiEdit2 size={24} />
                        </div>
                        <div className='stat-content'>
                            <h3>{stats.mostEdited?.title || 'None'}</h3>
                            <p>Most Edited</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='dashboard-content'>
                    <div className='content-header'>
                        <h2>Your Resumes</h2>
                        <div className='header-actions'>
                            <div className='sort-filter'>
                                <select className='sort-select'>
                                    <option>Sort by: Recent</option>
                                    <option>Sort by: Name</option>
                                    <option>Sort by: Last Edited</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className='loading-container'>
                            <div className='loading-spinner'></div>
                            <p>Loading your CVs...</p>
                        </div>
                    ) : cvs.length === 0 ? (
                        <div className='empty-state'>
                            <div className='empty-icon'>
                                <FiFileText size={64} />
                            </div>
                            <h3>No CVs Yet</h3>
                            <p>Create your first professional resume to get started</p>
                            <button className='empty-action-btn' onClick={handleCreateNew}>
                                <FiPlus size={18} />
                                Create Your First CV
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* CV Grid */}
                            <div className='cv-grid'>
                                {cvs.map(cv => (
                                    <div key={cv._id} className="cv-card">
                                        <div className="cv-card-header">
                                            <div className="cv-status">
                                                <span className={`status-dot ${cv.status || 'draft'}`}></span>
                                                <span className="status-text">{cv.status || 'Draft'}</span>
                                            </div>
                                            <div className="cv-actions-dropdown">
                                                <button className="dropdown-btn">⋯</button>
                                                <div className="dropdown-content">
                                                    <button onClick={() => handleEdit(cv._id)}>
                                                        <FiEdit2 /> Edit
                                                    </button>
                                                    <button onClick={() => handlePreview(cv._id)}>
                                                        <FiEye /> Preview
                                                    </button>
                                                    <button onClick={() => handleDownload(cv._id)}>
                                                        <FiDownload /> Download
                                                    </button>
                                                    <button 
                                                        className="delete-option"
                                                        onClick={() => deleteCv(cv._id)}
                                                    >
                                                        <FiTrash2 /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                         
                                        <div className="cv-thumbnail">
                                            <div className="thumbnail-overlay">
                                                <button 
                                                    className="preview-btn"
                                                    onClick={() => handlePreview(cv._id)}
                                                >
                                                    <FiEye size={20} />
                                                </button>
                                            </div>
                                            <img
                                                src={cv.thumbnail || "/cv-placeholder.png"}
                                                alt={cv.title || "CV preview"}
                                            />
                                        </div>

                                        <div className="cv-card-body">
                                            <h3 className="cv-title">{cv.title || "Untitled CV"}</h3>
                                            <div className="cv-meta">
                                                <span className="meta-item">
                                                    <FiCalendar size={14} />
                                                    {formatDate(cv.updatedAt || cv.createdAt)}
                                                </span>
                                                <span className="meta-item">
                                                    <FiEdit2 size={14} />
                                                    {cv.version || 'v1.0'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="cv-card-footer">
                                            <button 
                                                className="action-btn edit-btn"
                                                onClick={() => handleEdit(cv._id)}
                                            >
                                                <FiEdit2 size={16} />
                                                Edit
                                            </button>
                                            <button 
                                                className="action-btn download-btn"
                                                onClick={() => handleDownload(cv._id)}
                                            >
                                                <FiDownload size={16} />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Create New Card */}
                                <div className="cv-card create-new" onClick={handleCreateNew}>
                                    <div className="create-new-content">
                                        <div className="plus-icon-container">
                                            <FiPlus size={48} />
                                        </div>
                                        <h3>Create New CV</h3>
                                        <p>Start from scratch or use a template</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Message Toast */}
            {message && (
                <div className="toast-message">
                    {message}
                </div>
            )}
            <AppFooter onFeedbackClick={() => setShowFeedback(true)}/>
            <Feedback open={showFeedback} onClose={() => setShowFeedback(false)} />

        </div>
    );
};

export default Dashboard;