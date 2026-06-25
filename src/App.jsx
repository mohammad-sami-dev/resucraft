
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/common/ScrollToTop";

const ResumeLoading = lazy(() => import("./components/animations/ResumeLoading"));

const AuthPage = lazy(() => import("./pages/AuthPage"));
const CvBuilder = lazy(() => import("./pages/CvBuilder"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

// import API

function App() {

  const [globalLoading, setGlobalLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);


  return (
    <BrowserRouter>
      <ScrollToTop />
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <div className='app-scale' style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.4s ease' }}>

        <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
          {globalLoading && (
            <ResumeLoading />
          )}
          <Routes>

            <Route path='/' element={<AuthPage setGlobalLoading={setGlobalLoading} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path='/builder' element={<CvBuilder setGlobalLoading={setGlobalLoading} />} />
            <Route path="/dashboard" element={<Dashboard setGlobalLoading={setGlobalLoading} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;



