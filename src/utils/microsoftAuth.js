import { loginRequest } from '../config/msalConfig'
import { apiUrl } from '../config/api'

export const storeAuthSession = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('email', user.email)
}

export const clearAuthSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('email')
}

export const exchangeMicrosoftAccountForJwt = async (instance, account) => {
  const tokenResponse = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  })

  const response = await fetch(apiUrl('/api/auth/microsoft'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: tokenResponse.accessToken,
      idToken: tokenResponse.idToken,
      email: account.username,
      name: account.name,
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed.')
  }

  storeAuthSession(data.token, data.user)
  return data
}

/**
 * Signs out of ITCS only.
 * Do NOT use logoutRedirect/logoutPopup — those hit Microsoft's logout endpoint
 * and end the browser SSO session for Outlook, Teams, and other Microsoft apps.
 */
export const logoutMicrosoftSession = async (instance, navigate) => {
  clearAuthSession()
  sessionStorage.setItem('itcs_skip_msal_redirect', '1')

  try {
    instance.clearCache()
  } catch (err) {
    console.error('Failed to clear MSAL cache:', err)
  }

  navigate('/login', { replace: true })
}
