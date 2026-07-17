import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/msalConfig'
import { apiUrl } from '../../config/api'
import {
  exchangeMicrosoftAccountForJwt,
  storeAuthSession,
} from '../../utils/microsoftAuth'
import alignitLogo from '../../assets/logos/itcsLogo.webp'
import './Login.scss'

const Login = () => {
  const navigate = useNavigate()
  const { instance } = useMsal()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState('microsoft')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  useEffect(() => {
    const authError = sessionStorage.getItem('auth_error')
    if (authError) {
      sessionStorage.removeItem('auth_error')
      setError(authError)
    }

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if (token && (user?.role === 'admin' || user?.role === 'author')) {
      navigate('/admin', { replace: true })
      return
    }

    if (token) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
    }
  }, [navigate])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Login failed')

      storeAuthSession(data.token, data.user)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleMicrosoftLogin = async () => {
    setLoading(true)
    setError('')

    try {
      if (import.meta.env.PROD) {
        await instance.loginRedirect(loginRequest)
        return
      }

      const response = await instance.loginPopup(loginRequest)
      await exchangeMicrosoftAccountForJwt(instance, response.account)
      navigate('/admin', { replace: true })
    } catch (err) {
      if (err.name === 'BrowserAuthError' && err.errorCode === 'user_cancelled') {
        console.log('User cancelled login')
      } else {
        console.error('Login error:', err)
        setError(err.message || 'Failed to sign in with Microsoft 365')
      }
      setLoading(false)
    }
  }

  const handleDifferentAccount = async () => {
    setError('')
    setLoading(true)
    try {
      instance.clearCache()
      const request = { ...loginRequest, prompt: 'select_account' }

      if (import.meta.env.PROD) {
        await instance.loginRedirect(request)
        return
      }

      const response = await instance.loginPopup(request)
      await exchangeMicrosoftAccountForJwt(instance, response.account)
      navigate('/admin', { replace: true })
    } catch (err) {
      if (err.name === 'BrowserAuthError' && err.errorCode === 'user_cancelled') {
        console.log('User cancelled login')
      } else {
        console.error('Login error:', err)
        setError(err.message || 'Failed to sign in with Microsoft 365')
      }
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <img src={alignitLogo} alt="ITCS Logo" className="login-logo" />
            <p className="card-subtitle">Log in to access your dashboard</p>
          </div>

          <div className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="login-tabs">
              <button
                type="button"
                className={`tab-btn ${loginMethod === 'microsoft' ? 'active' : ''}`}
                onClick={() => setLoginMethod('microsoft')}
              >
                Microsoft 365
              </button>
              <button
                type="button"
                className={`tab-btn ${loginMethod === 'email' ? 'active' : ''}`}
                onClick={() => setLoginMethod('email')}
              >
                Email & Password
              </button>
            </div>

            {loginMethod === 'microsoft' ? (
              <>
                <button
                  type="button"
                  className="submit-btn microsoft-btn"
                  onClick={handleMicrosoftLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner">Signing in...</span>
                  ) : (
                    <>
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="9" height="9" fill="#F25022"/>
                        <rect x="10.5" y="0.5" width="9" height="9" fill="#7FBA00"/>
                        <rect x="0.5" y="10.5" width="9" height="9" fill="#00A4EF"/>
                        <rect x="10.5" y="10.5" width="9" height="9" fill="#FFB900"/>
                      </svg>
                      Sign in with Microsoft 365
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="different-account-btn"
                  onClick={handleDifferentAccount}
                >
                  Login as different account
                </button>
              </>
            ) : (
              <form onSubmit={handleEmailLogin} className="email-login-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group password-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div style={{ textAlign: 'right', marginBottom: '15px', marginTop: '-10px' }}>
                  <Link to="/forgot-password" style={{ color: '#7c3aed', fontSize: '0.9rem', textDecoration: 'none' }}>
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="loading-spinner">Signing in...</span> : 'Sign In'}
                </button>
              </form>
            )}

            <div className="form-footer">
              <button
                type="button"
                className="back-home-btn"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
