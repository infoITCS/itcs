import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrapper">
      <div className="glow-circle gc-1"></div>
      <div className="glow-circle gc-2"></div>
      
      <div className="not-found-content">
        <div className="error-code-container">
          <h1 className="error-code">404</h1>
          <div className="error-shadow"></div>
        </div>
        
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable. Let's get you back on track.
        </p>
        
        <div className="error-actions">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <span>←</span> Go Back
          </button>
          <button className="btn-home" onClick={() => navigate('/')}>
            Go To Homepage <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
