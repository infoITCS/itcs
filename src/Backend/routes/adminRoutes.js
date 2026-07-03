import express from 'express'
import * as db from '../models/dbHelpers.js'
import bcrypt from 'bcryptjs'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/add-user', requireAdmin, async (req, res) => {
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
