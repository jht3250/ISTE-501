'use server'

import db from '@/lib/db'
import { cookies } from 'next/headers'
import crypto from 'crypto'

type AuthResult = { error?: string }

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/\d/.test(password)) return 'Password must contain at least one number'
  if (!/[^a-zA-Z0-9]/.test(password)) return 'Password must contain at least one symbol'
  return null
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const user = db.prepare('SELECT * FROM user_account WHERE email = ?').get(email) as {
    user_id: number
    password: string
  } | undefined

  if (!user) return { error: 'Invalid email or password' }

  const [salt, hash] = user.password.split(':')
  if (!salt || !hash) return { error: 'Invalid email or password' }

  const inputHash = hashPassword(password, salt)
  if (inputHash !== hash) return { error: 'Invalid email or password' }

  const cookieStore = await cookies()
  cookieStore.set('user_id', String(user.user_id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  return {}
}

export async function createAccount(
  email: string,
  password: string,
  confirmPassword: string
): Promise<AuthResult> {
  if (password !== confirmPassword) return { error: 'Passwords do not match' }

  const validationError = validatePassword(password)
  if (validationError) return { error: validationError }

  const existing = db.prepare('SELECT user_id FROM user_account WHERE email = ?').get(email)
  if (existing) return { error: 'An account with this email already exists' }

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = hashPassword(password, salt)

  db.prepare('INSERT INTO user_account (email, password) VALUES (?, ?)').run(
    email,
    `${salt}:${hash}`
  )

  return {}
}

// Generates a 6-digit reset code, stores it in the DB (expires in 15 minutes),
// and emails it to the user via Nodemailer.
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const user = db.prepare('SELECT user_id FROM user_account WHERE email = ?').get(email) as {
    user_id: number
  } | undefined

  if (!user) return { error: 'No account found with that email' }

  const token = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Math.floor(Date.now() / 1000) + 15 * 60

  db.prepare(
    'UPDATE user_account SET reset_token = ?, reset_token_expires_at = ? WHERE user_id = ?'
  ).run(token, expiresAt, user.user_id)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Kestrel Boxes <onboarding@resend.dev>',
      to: email,
      subject: 'Your Password Reset Code',
      text: `Your reset code is: ${token}\n\nThis code expires in 15 minutes.`
    })
  })

  if (!res.ok) {
    return { error: 'Failed to send reset email. Please try again.' }
  }

  return {}
}

export async function getCurrentUser(): Promise<{ email: string } | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user_id')?.value
  if (!userId) return null

  const user = db.prepare('SELECT email FROM user_account WHERE user_id = ?').get(Number(userId)) as { email: string } | undefined
  return user ?? null
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('user_id')
}

export async function resetPassword(
  email: string,
  token: string,
  newPassword: string,
  confirmPassword: string
): Promise<AuthResult> {
  if (newPassword !== confirmPassword) return { error: 'Passwords do not match' }

  const validationError = validatePassword(newPassword)
  if (validationError) return { error: validationError }

  const now = Math.floor(Date.now() / 1000)
  const user = db.prepare(
    'SELECT user_id FROM user_account WHERE email = ? AND reset_token = ? AND reset_token_expires_at > ?'
  ).get(email, token, now) as { user_id: number } | undefined

  if (!user) return { error: 'Invalid or expired reset code' }

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = hashPassword(newPassword, salt)

  db.prepare(
    'UPDATE user_account SET password = ?, reset_token = NULL, reset_token_expires_at = NULL WHERE user_id = ?'
  ).run(`${salt}:${hash}`, user.user_id)

  // Clear session so the user is redirected to login after reset
  const cookieStore = await cookies()
  cookieStore.delete('user_id')

  return {}
}
