import { MsalProvider } from '@azure/msal-react'
import msalInstance from '../config/msalConfig'

export default function MsalGate({ children }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
