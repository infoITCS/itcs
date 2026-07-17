import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../config/api';
import alignitLogo from '../../assets/logos/itcsLogo.webp';
import './Login.scss';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post(apiUrl(`/api/auth/reset-password/${token}`), { password });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. The link might be expired.');
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
            <p className="card-subtitle">Choose New Password</p>
          </div>

          <div className="login-form">
            <p style={{ color: '#ccc', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
              Enter your new password below.
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
              <div className="form-group password-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  required
                  minLength="6"
                />
              </div>
              <div className="form-group password-group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength="6"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <span className="loading-spinner">Resetting...</span> : 'Reset Password'}
              </button>
            </form>

            <div className="form-footer">
              <button
                type="button"
                className="back-home-btn"
                onClick={() => navigate('/login')}
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

export default ResetPassword;
