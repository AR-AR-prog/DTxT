import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client()

export interface GoogleProfile {
  googleId: string
  email: string
  fullName: string
}

function getGoogleClientId(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    throw new Error('GOOGLE_AUTH_NOT_CONFIGURED')
  }

  return clientId
}

function buildFallbackName(email: string): string {
  const [localPart = 'User'] = email.split('@')
  return localPart
    .replace(/[._-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()) || 'User'
}

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
  const audience = getGoogleClientId()
  const ticket = await client.verifyIdToken({
    idToken,
    audience,
  })

  const payload = ticket.getPayload()

  if (!payload?.sub || !payload.email || !payload.email_verified) {
    throw new Error('INVALID_GOOGLE_ID_TOKEN')
  }

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    fullName: payload.name?.trim() || buildFallbackName(payload.email),
  }
}