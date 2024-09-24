import { getServerSession } from '@/lib/getServerSession'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  // Your protected page content here
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  )
}