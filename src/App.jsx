
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ResumeLoading = lazy(() => import("./components/animations/ResumeLoading"));

const AuthPage = lazy(() => import("./pages/AuthPage"));
const CvBuilder = lazy(() => import("./pages/CvBuilder"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
import { useState } from 'react';
// import API

function App() {

  const [globalLoading, setGlobalLoading] = useState(false)


  return (
    <BrowserRouter>
      <div className='app-scale'>

        <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
          {globalLoading && (
            <ResumeLoading />
          )}
          <Routes>

            <Route path='/' element={<AuthPage setGlobalLoading={setGlobalLoading} />} />
            <Route path='/builder' element={<CvBuilder setGlobalLoading={setGlobalLoading} />} />

            <Route path="/dashboard" element={<Dashboard setGlobalLoading={setGlobalLoading} />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;



