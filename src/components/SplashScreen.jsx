import { useEffect, useState } from "react";
import ResuCraftLogo from "./navbar components/ResuCraftLogo.jsx";

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const originalOverflowX = document.documentElement.style.overflowX;
    const originalOverflowY = document.documentElement.style.overflowY;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setFading(true), 2400);
    const t2 = setTimeout(() => onDone(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflowX = originalOverflowX;
      document.documentElement.style.overflowY = originalOverflowY;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      overflow: 'hidden',
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #0f172a 0%, #312e81 45%, #4f46e5 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
      flexDirection: 'column',
      gap: '0px',
      padding: 0,
      margin: 0
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '16px',
        width: '100%',
        maxWidth: '100%',
        animation: 'splashPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both'
      }}>
        <div style={{
          padding: '0',
          borderRadius: '0',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          backdropFilter: 'none'
        }}>
          <ResuCraftLogo size={Math.min(220, window.innerWidth < 480 ? 140 : 220)} />
        </div>


        <div style={{
          width: '180px', height: '3px',
          background: 'rgba(30,58,95,0.2)',
          borderRadius: '999px', overflow: 'hidden',
          marginTop: '8px'
        }}>
          <div style={{
            height: '100%', background: '#2563eb',
            borderRadius: '999px',
            animation: 'splashLoad 2.3s ease forwards'
          }}/>
        </div>
      </div>
      <style>{`
        @keyframes splashPop {
          from { transform: scale(0.75); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes splashLoad {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}