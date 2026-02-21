import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { saveContact } from '@/lib/db'
import { randomUUID } from 'crypto'
import nodemailer from 'nodemailer'

type Body = {
  name: string
  lastName?: string
  email: string
  phone?: string
  message?: string
  token: string
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  console.log('[RECAPTCHA] Secret key present:', !!secret)
  console.log('[RECAPTCHA] Token received:', typeof token === 'string' ? token.substring(0, 20) + '...' : token)

  if (!secret) {
    console.error('[RECAPTCHA] Missing RECAPTCHA_SECRET_KEY in env')
    return false
  }

  const params = new URLSearchParams()
  params.append('secret', secret)
  params.append('response', token)

  try {
    console.log('[RECAPTCHA] Sending verification request to Google...')
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
    })

    console.log('[RECAPTCHA] Google response status:', resp.status)
    const data = await resp.json()
    console.log('[RECAPTCHA] Google raw response:', data)

    // If Google returned success=false, reject
    if (!data || data.success !== true) {
      console.warn('[RECAPTCHA] Verification FAILED:', data && data['error-codes'])
      return false
    }

    // If it's reCAPTCHA v3, Google returns a score. Enforce a threshold (default 0.5)
    if (typeof data.score !== 'undefined') {
      const score = Number(data.score) || 0
      const threshold = Number(process.env.RECAPTCHA_SCORE_THRESHOLD || 0.5)
      console.log('[RECAPTCHA] v3 score:', score, 'threshold:', threshold)
      if (score < threshold) {
        console.warn('[RECAPTCHA] v3 score below threshold')
        return false
      }
      console.log('[RECAPTCHA] v3 verification accepted')
      return true
    }

    // If no score field, assume it's v2 checkbox and success === true is enough
    console.log('[RECAPTCHA] v2 checkbox verification accepted')
    return true
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err)
    console.error('[RECAPTCHA] Error during verification:', error)
    return false
  }
}

async function sendEmail(contact: Body) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_EMAIL_TO

  console.log('[SMTP DEBUG] Config:', { host, port, user: user ? '***' : 'MISSING', pass: pass ? '***' : 'MISSING', to })

  if (!host || !user || !pass || !to) {
    console.warn('[SMTP] Config incomplete, skipping email')
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const html = `
      <p>Nuevo contacto desde el sitio:</p>
      <ul>
        <li><strong>Nombre:</strong> ${contact.name} ${contact.lastName ?? ''}</li>
        <li><strong>Email:</strong> ${contact.email}</li>
        <li><strong>Teléfono:</strong> ${contact.phone ?? ''}</li>
        <li><strong>Mensaje:</strong> ${contact.message ?? ''}</li>
      </ul>
    `

    console.log('[SMTP] Attempting to send email to:', to)
    const result = await transporter.sendMail({
      from: `${user}`,
      to,
      subject: `Nuevo contacto: ${contact.name}`,
      html,
    })
    console.log('[SMTP] Email sent successfully, messageId:', result.messageId)
  } catch (emailErr: unknown) {
    const err = emailErr instanceof Error ? emailErr.message : String(emailErr)
    console.error('[SMTP ERROR]', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[API] POST /api/contact - received request')
    const body: Body = await request.json()
    console.log('[API] Body parsed:', { name: body.name, email: body.email, hasToken: !!body.token })

    if (!body || !body.token) {
      console.warn('[API] Missing token or body')
      return NextResponse.json({ ok: false, error: 'Missing token' }, { status: 400 })
    }

    console.log('[API] Verifying reCAPTCHA...')
    const ok = await verifyRecaptcha(body.token)
    if (!ok) {
      console.warn('[API] reCAPTCHA verification failed')
      return NextResponse.json({ ok: false, error: 'reCAPTCHA verification failed' }, { status: 400 })
    }
    console.log('[API] reCAPTCHA verified successfully')

    const contact = {
      id: randomUUID(),
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      message: body.message,
      createdAt: new Date().toISOString(),
    }

    console.log('[API] Saving contact to DB...')
    await saveContact(contact)
    console.log('[API] Contact saved, ID:', contact.id)

    // send email (best effort)
    console.log('[API] Attempting to send email...')
    sendEmail(body).catch((e: unknown) => {
      const err = e instanceof Error ? e.message : String(e)
      console.error('[API] Mail error caught:', err)
    })

    console.log('[API] Sending success response')
    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error)
    console.error('[API ERROR]', err, error)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}