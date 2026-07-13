import { lazy } from 'react'

/**
 * Like React.lazy(), but recovers from stale chunk URLs after a deploy.
 * Without this, navigating to a page can crash the app until a manual refresh.
 */
export const lazyWithRetry = (factory) =>
  lazy(async () => {
    const reloadKey = 'itcs_chunk_reload'

    try {
      const module = await factory()
      sessionStorage.removeItem(reloadKey)
      return module
    } catch (error) {
      const alreadyReloaded = sessionStorage.getItem(reloadKey) === '1'

      if (!alreadyReloaded) {
        sessionStorage.setItem(reloadKey, '1')
        window.location.reload()
        return { default: () => null }
      }

      sessionStorage.removeItem(reloadKey)
      throw error
    }
  })
