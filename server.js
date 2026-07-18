import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT || 3000)
const smtpUser = process.env.ZOHO_SMTP_USER
const smtpPassword = process.env.ZOHO_SMTP_PASSWORD
const contactRecipient = process.env.CONTACT_TO_EMAIL || 'alejandro@autonomyxdr.com'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDirectory = path.join(__dirname, 'dist')

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

const attempts = new Map()
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT = 5

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (attempts.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS)
  recent.push(now)
  attempts.set(ip, recent)
  return recent.length > RATE_LIMIT
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function validateContact(body) {
  const contact = {
    name: clean(body.name, 100),
    company: clean(body.company, 120),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 50),
    message: clean(body.message, 3000),
    website: clean(body.website, 200),
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (contact.website) return { contact, honeypot: true }
  if (contact.name.length < 2) return { error: 'Escriba su nombre.' }
  if (!emailPattern.test(contact.email)) return { error: 'Escriba un correo válido.' }
  if (contact.message.length < 20) return { error: 'Cuéntenos un poco más sobre lo que necesita.' }

  return { contact }
}

const transporter = smtpUser && smtpPassword
  ? nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.ZOHO_SMTP_PORT || 465),
      secure: String(process.env.ZOHO_SMTP_PORT || 465) === '465',
      auth: { user: smtpUser, pass: smtpPassword },
    })
  : null

app.post('/api/contact', async (request, response) => {
  if (isRateLimited(request.ip || 'unknown')) {
    return response.status(429).json({ error: 'Ha enviado varias solicitudes. Inténtelo de nuevo en unos minutos.' })
  }

  const result = validateContact(request.body || {})
  if (result.honeypot) return response.status(200).json({ ok: true })
  if (result.error) return response.status(400).json({ error: result.error })
  if (!transporter) {
    console.error('Contact form SMTP credentials are not configured.')
    return response.status(503).json({ error: 'El formulario no está disponible en este momento.' })
  }

  const { contact } = result
  const companyLine = contact.company || 'No especificada'
  const phoneLine = contact.phone || 'No especificado'

  try {
    await transporter.sendMail({
      from: `AUTONOMYX Web <${smtpUser}>`,
      to: contactRecipient,
      replyTo: `${contact.name} <${contact.email}>`,
      subject: `Nueva consulta AUTONOMYX — ${contact.name}`,
      text: [
        'Nueva solicitud desde autonomyxdr.com',
        '',
        `Nombre: ${contact.name}`,
        `Empresa: ${companyLine}`,
        `Correo: ${contact.email}`,
        `Teléfono: ${phoneLine}`,
        '',
        'Necesidad:',
        contact.message,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#111">
          <div style="background:#080808;color:#fff;padding:24px 28px">
            <strong style="font-size:20px;letter-spacing:.08em">AUTONOMYX</strong>
            <p style="margin:8px 0 0;color:#bbb">Nueva solicitud desde autonomyxdr.com</p>
          </div>
          <div style="border:1px solid #ddd;border-top:0;padding:28px">
            <p><strong>Nombre:</strong> ${escapeHtml(contact.name)}</p>
            <p><strong>Empresa:</strong> ${escapeHtml(companyLine)}</p>
            <p><strong>Correo:</strong> <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>
            <p><strong>Teléfono:</strong> ${escapeHtml(phoneLine)}</p>
            <p style="margin-top:24px"><strong>Necesidad:</strong></p>
            <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(contact.message)}</p>
          </div>
        </div>
      `,
    })

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Unable to send contact email:', error?.message || error)
    return response.status(502).json({ error: 'No pudimos enviar su solicitud. Inténtelo nuevamente.' })
  }
})

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, emailConfigured: Boolean(transporter) })
})

app.use(express.static(distDirectory, { maxAge: '1h', index: false }))
app.use((request, response, next) => {
  if (request.method === 'GET' && request.accepts('html')) {
    return response.sendFile(path.join(distDirectory, 'index.html'))
  }
  return next()
})

app.listen(port, '0.0.0.0', () => {
  console.log(`AUTONOMYX landing listening on port ${port}`)
})
