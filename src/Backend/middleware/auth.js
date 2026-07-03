import jwt from 'jsonwebtoken'
import * as db from '../models/dbHelpers.js'

const getToken = (req) => {
  const authHeader = req.headers.authorization
  return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
}

const authenticateRequest = async (req, res) => {
  const token = getToken(req)
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.findUserById(decoded.id)

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return null
    }

    req.user = user
    return user
  } catch {
    res.status(401).json({ message: 'Invalid token' })
    return null
  }
}

export const requireAuth = async (req, res, next) => {
  const user = await authenticateRequest(req, res)
  if (user) next()
}

export const requireAdmin = async (req, res, next) => {
  const user = await authenticateRequest(req, res)
  if (!user) return

  if (!user.isAdmin && user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }

  next()
}

export const requireAuthorOrAdmin = async (req, res, next) => {
  const user = await authenticateRequest(req, res)
  if (!user) return

  if (!user.isAdmin && user.role !== 'admin' && user.role !== 'author') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  next()
}

export const canManageBlog = (user, blog) => {
  if (!user || !blog) return false
  if (user.isAdmin || user.role === 'admin') return true
  if (user.role === 'author' && blog.ownerId === String(user._id)) return true
  return false
}
