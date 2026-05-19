import { PublicClientApplication } from '@azure/msal-browser'

const clientId = import.meta.env.VITE_MSAL_CLIENT_ID || ''
const tenantId = import.meta.env.VITE_MSAL_TENANT_ID || ''
const redirectPath = import.meta.env.VITE_MSAL_REDIRECT_PATH || '/login'

export const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin.includes('localhost')
      ? `${window.location.origin}${redirectPath}`
      : `${window.location.origin}${redirectPath}`,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
}

const msalInstance = new PublicClientApplication(msalConfig)

export default msalInstance