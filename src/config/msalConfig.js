import { PublicClientApplication } from '@azure/msal-browser'

const clientId = import.meta.env.VITE_MSAL_CLIENT_ID || 'c0e2a10c-63c6-4646-a4d6-b955ffc06f43'
const tenantId = import.meta.env.VITE_MSAL_TENANT_ID || '758534da-3ea2-42b7-a22c-2824e941888d'
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