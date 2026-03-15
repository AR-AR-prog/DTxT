import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/lib/auth'
import { getAuthenticatedUserFromToken } from '@/lib/api-usage'
import VerifyClient from '@/components/verify/VerifyClient'

export const dynamic = 'force-dynamic'

export default async function VerifyPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) {
    redirect('/login')
  }

  const user = await getAuthenticatedUserFromToken(token)

  if (!user) {
    redirect('/login')
  }

  return (
    <VerifyClient
      user={{
        fullName: user.fullName,
        email: user.email,
        apiUsageCount: user.apiUsageCount,
        apiUsageLimit: user.apiUsageLimit,
      }}
    />
  )
}
