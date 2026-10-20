import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../config/api';
import alignitLogo from '../../assets/logos/itcsLogo.webp';
import './Login.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post(apiUrl('/api/auth/forgot-password'), { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <img src={alignitLogo} alt="ITCS Logo" className="login-logo" />
            <p className="card-subtitle">Reset Password</p>
          </div>

          <div className="login-form">
            <p style={{ color: '#ccc', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
              Enter your email to receive a password reset link.
            </p>

            {message && (
              <div style={{ color: '#10b981', marginBottom: '15px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                {message}
              </div>
            )}
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="email-login-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <span className="loading-spinner">Sending...</span> : 'Send Reset Link'}
              </button>
            </form>

            <div className="form-footer">
              <button
                type="button"
                className="back-home-btn"
                onClick={() => window.history.back()}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
