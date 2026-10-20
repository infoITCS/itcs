import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'
import axios from 'axios'
import * as db from '../models/dbHelpers.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const router = express.Router()

const ALLOWED_ADMIN_EMAILS = process.env.ALLOWED_ADMIN_EMAILS
  ? process.env.ALLOWED_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
  : ['zulqarnain.hafeez@itcs.com.pk'];

const TENANT_ID = process.env.VITE_MSAL_TENANT_ID || '758534da-3ea2-42b7-a22c-2824e941888d'
const CLIENT_ID = process.env.VITE_MSAL_CLIENT_ID || 'c0e2a10c-63c6-4646-a4d6-b955ffc06f43'

const jwksClient = jwksRsa({
  jwksUri: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
  cache: true,
  cacheMaxAge: 86400000,
})


// Login route (auto-registers new users)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    let user = await db.findUserByEmail(email)

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    } else {
      if (!user.password) {
        return res.status(400).json({ message: 'Please use Microsoft 365 to sign in' });
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: String(user._id) }, process.env.JWT_SECRET)

    const userData = { ...user };
    delete userData.password;
    res.status(200).json({ message: 'Login successful', token, user: userData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Microsoft OAuth login route
router.post('/microsoft', async (req, res) => {
  try {
    const { accessToken, idToken, email, name } = req.body

    if (!accessToken && !idToken) {
      return res.status(400).json({ message: 'Missing authentication token' })
    }

    let userEmail, userName

    // Validate ID token first (faster, no external network call)
    if (idToken) {
      try {
        const decoded = await new Promise((resolve, reject) => {
          jwt.verify(
            idToken,
            (header, callback) => {
              jwksClient.getSigningKey(header.kid, (err, key) => {
                if (err) return callback(err)
                callback(null, key.getPublicKey())
              })
            },
            {
              audience: CLIENT_ID,
              issuer: [`https://login.microsoftonline.com/${TENANT_ID}/v2.0`, `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`],
            },
            (err, decoded) => {
              if (err) return reject(err)
              resolve(decoded)
            }
          )
        })
        userEmail = decoded.preferred_username || decoded.email || decoded.upn || email
        userName = decoded.name || decoded.given_name || name
        console.log('ID token validated successfully for:', userEmail)
      } catch (idTokenError) {
        console.error('ID token validation error:', idTokenError.message)
      }
    }

    // Fallback: verify with Microsoft Graph API
    if (!userEmail && accessToken) {
      try {
        const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
          timeout: 10000
        })

        const microsoftUser = graphResponse.data
        userEmail = microsoftUser.mail || microsoftUser.userPrincipalName
        userName = microsoftUser.displayName || microsoftUser.givenName
      } catch (graphError) {
        const errDetail = (graphError.response && graphError.response.data) || graphError.message
        console.error('Microsoft Graph API error:', typeof errDetail === 'string' ? errDetail : JSON.stringify(errDetail))
      }
    }

    if (!userEmail) {
      return res.status(401).json({ message: 'Could not extract user identity. Check server logs.' })
    }

    const isAllowedAdmin = ALLOWED_ADMIN_EMAILS.includes(userEmail.toLowerCase());

    let user = await db.findUserByEmail(userEmail)

    const isItcsEmail = userEmail.toLowerCase().endsWith('@itcs.com.pk');

    if (!user) {
      const result = await db.createUser({
        fullName: userName,
        username: userEmail.split('@')[0],
        email: userEmail,
        password: '',
        role: isAllowedAdmin ? 'admin' : (isItcsEmail ? 'author' : 'user'),
        isAdmin: isAllowedAdmin,
      })
      user = await db.findUserByEmail(userEmail)
    } else {
      const updateFields = { fullName: userName };
      if (isAllowedAdmin) {
        updateFields.isAdmin = true;
        updateFields.role = 'admin';
      } else if (isItcsEmail && user.role === 'user') {
        updateFields.role = 'author';
      }
      await db.updateUserById(String(user._id), updateFields);
      user = await db.findUserById(String(user._id));
    }

    if (!user.isAdmin && user.role !== 'admin' && user.role !== 'author') {
      return res.status(403).json({ message: 'Access denied. You are not authorized to access the admin panel.' });
    }

    const token = jwt.sign({ id: String(user._id) }, process.env.JWT_SECRET)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: String(user._id),
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    console.error('Microsoft login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'This account uses Microsoft login. Please use Microsoft to sign in.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    await db.setUserResetToken(email, resetToken, new Date(Date.now() + 3600000).toISOString());

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Reset Link
    // Note: In production this should be the live frontend URL
    const resetUrl = `${process.env.VITE_FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"ITCS Security" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #7c3aed; text-align: center;">ITCS Password Reset</h2>
          <p>Hello ${user.fullName},</p>
          <p>You requested a password reset for your ITCS account.</p>
          <p>Please click the button below to choose a new password. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p style="color: #888; font-size: 12px; margin-top: 40px; text-align: center;">© 2026 ITCS Premium Careers Dashboard.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error sending reset email. Please try again.' });
  }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await db.findUserByResetToken(token);

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.updateUserById(String(user._id), {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    res.status(200).json({ message: 'Password has been successfully reset. You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset.' });
  }
});

export default router