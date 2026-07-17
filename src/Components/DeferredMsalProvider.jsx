import { Suspense, lazy, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const needsMsal = (pathname) =>
  pathname.startsWith('/login') ||
  pathname.startsWith('/admin') ||
  pathname.startsWith('/forgot-password') ||
  pathname.startsWith('/reset-password')

/**
 * Loads Azure MSAL only on auth/admin routes so public pages
 * do not download ~280KB of auth JS on first paint.
 */
const MsalApp = lazy(() => import('./MsalGate'))

export default function DeferredMsalProvider({ children }) {
  const { pathname } = useLocation()
  const enable = needsMsal(pathname)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enable) return undefined
    let cancelled = false
    import('../config/msalConfig')
      .then((mod) => mod.initializeMsal())
      .catch((err) => console.error('MSAL initialization error:', err))
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [enable])

  if (!enable) return children

  if (!ready) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#130d24',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#130d24',
            color: '#fff',
          }}
        >
          Loading...
        </div>
      }
    >
      <MsalApp>{children}</MsalApp>
    </Suspense>
  )
}
