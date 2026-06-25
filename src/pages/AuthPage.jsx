import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages styles/AuthPage.css';
import '../styles/pages styles/IntroStyles.css'
import IntroPages from './Intropages.jsx';
import API from "../api.js";

import AppFooter from "../components/common/AppFooter.jsx"
import Feedback from '../components/feedback/Feedback.jsx';
import ContactUsModal from '../components/common/ContactUsModal.jsx';
import ResuCraftLogo from '../components/navbar components/ResuCraftLogo.jsx';
import { uploadResume } from "../services/resumeUpload.service.js"

import { X, Rocket, Eye, EyeOff, User, Save, RefreshCw, TrendingUp, Palette, LogIn } from 'lucide-react';

const AuthPage = ({ setGlobalLoading, darkMode, setDarkMode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [errors, setErrors] = useState({});
  const [cvDownloads, setCvDownloads] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const safeCvDownloads = typeof cvDownloads === 'number' ? cvDownloads : Number(cvDownloads) || 0;

  useEffect(() => {

    let mounted = true;
    let timeforCvStat = setTimeout(() => {
      API.get("/api/metrics/public")
        .then((res) => {
          if (mounted) setCvDownloads(res.data?.cvDownloads || 0);
        })
        .catch(() => { });
      return () => { mounted = false; };
    }, 2500);

    return () => {
      mounted = false;
      clearTimeout(timeforCvStat);
    }
  }, []);


  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !username) {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const normalizedEmail = email.trim().toLowerCase();
      const { data } = await API.post(endpoint, { email: normalizedEmail, password, username });

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);

      setMessage(isLogin ? 'Login successful!' : 'Account created successfully!');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      setMessage(errorMsg);
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/builder');
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  const showIntroAgain = () => {
    setShowIntro(true);
  };

  return (
    <div
      className={`auth-page ${!showIntro ? 'intro-closed' : ''}`}
    >

      <header
        className="auth-header"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <div className="brand-block">
          <div className="brand-mark">
            <ResuCraftLogo size={72} />
          </div>
        </div>

        <div className="header-actions">
          <button className="ghost-btn" onClick={showIntroAgain}>
            Show Tutorial
          </button>
        </div>
      </header>

      <div className='auth-layout'>
        {/* Left Panel - Introduction/Tutorial */}

        {showIntro && (
          <div className='intro-panel'>
            <div className='intro-header'>
              <h2>Getting Started</h2>
              <button className='close-intro' onClick={handleIntroFinish}>
                <X size={20} />
              </button>
            </div>
            <div className='intro-content-wrapper'>
              <IntroPages onFinish={handleIntroFinish} />
            </div>
            <div className='intro-footer'>
              <button className='skip-btn' onClick={handleIntroFinish}>
                Skip Tutorial
              </button>
              <div className='intro-progress'>
                <span>Interactive Guide</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Authentication Form */}
        {!showIntro && (
          <div className={`auth-panel ${!showIntro ? 'centered' : ''}`}>
            <div className='auth-card'>
              <div className='card-header'>
                <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
                <p>
                  {isLogin
                    ? 'Sign in to access your saved resumes'
                    : 'Build and customize your resume quickly with flexible templates'
                  }
                </p>
              </div>
              <div className='form-switcher'>
                <button
                  className={`switch-btn ${isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`switch-btn ${!isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className='auth-form'>
                <div className='input-group'>
                  <label htmlFor='email'>Email Address</label>
                  <input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className='error-msg'>{errors.email}</span>}
                </div>

                {!isLogin && (
                  <div className='input-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                      id='username'
                      type='text'
                      placeholder='Choose a username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={errors.username ? 'error' : ''}
                    />
                    {errors.username && <span className='error-msg'>{errors.username}</span>}
                  </div>
                )}

                <div className='input-group'>
                  <label htmlFor='password'>Password</label>
                  <div className='password-field'>
                    <input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      placeholder={isLogin ? 'Enter your password' : 'Create a secure password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type='button'
                      className='password-toggle'
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className='error-msg'>{errors.password}</span>}
                </div>

                {isLogin && (
                  <div className='form-options'>
                    <label className='checkbox-label'>
                      <input type='checkbox' /> Remember me
                    </label>
                    <a href='#forgot' className='forgot-link'>Forgot password?</a>
                  </div>
                )}

                {message && (
                  <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}

                <button
                  type='submit'
                  className='primary-btn'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className='spinner'></span>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>

                <div className='divider'>
                  <span>or continue with</span>
                </div>

                <button
                  type='button'
                  className='guest-btn'
                  onClick={handleGuestAccess}
                >
                  <span className='guest-icon'><User size={18} /></span>
                  Continue as Guest
                  <small>Try without registration</small>
                </button>

                <div className='auth-footer'>
                  <p>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button type='button' className='link-btn' onClick={toggleForm}>
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </form>

              <div className='benefits'>
                <h3>Why Register?</h3>
                <ul>
                  <li><Save size={16} /> Save multiple resume versions</li>
                  <li><RefreshCw size={16} /> Access from any device</li>
                  <li><TrendingUp size={16} /> Track your applications</li>
                  <li><Palette size={16} /> Exclusive templates</li>
                </ul>
              </div>
            </div>

            <div className='testimonial'>
              <h4>Guest mode available</h4>
              <p>Resumes are not stored unless you create an account and choose to save them.</p>
            </div>
          </div>
        )}
      </div>

      <AppFooter onFeedbackClick={() => setShowFeedback(true)} onContactClick={() => setShowContact(true)} />
      <Feedback open={showFeedback} onClose={() => setShowFeedback(false)} />
      <ContactUsModal open={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
};

export default AuthPage;