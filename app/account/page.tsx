import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth'
import AccountClient from './AccountClient'

export default async function AccountPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) redirect('/login')

  const payload = await verifySessionToken(token)
  if (!payload) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      fullName: true,
      email: true,
      passwordHash: true,
      googleId: true,
    },
  })

  if (!user) redirect('/login')

  return (
    <AccountClient
      user={{
        fullName: user.fullName,
        email: user.email,
        hasPassword: !!user.passwordHash,
        hasGoogle: !!user.googleId,
      }}
      googleConfigured={!!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
    />
  )
}
