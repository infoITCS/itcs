import express from 'express'
import jwt from 'jsonwebtoken'
import * as db from '../models/dbHelpers.js'
import bcrypt from 'bcryptjs'

const router = express.Router()


const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.findUserById(decoded.id)

    if (!user) return res.status(403).json({ message: 'Forbidden' })
    if (!user.isAdmin) return res.status(403).json({ message: 'Admin access required' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}


router.post('/add-user', isAdmin, async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body

    const existingUser = await db.findUserByEmail(email)
    if (existingUser) return res.status(400).json({ message: 'Email already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const isAdminRole = role === 'admin'

    const newUser = await db.createUser({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
      isAdmin: isAdminRole,
    })

    res.status(201).json({ message: `${role === 'admin' ? 'Admin' : 'Author'} added successfully`, user: newUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
