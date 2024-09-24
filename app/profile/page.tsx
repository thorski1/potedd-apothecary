'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <form action={signOut} className="mt-6">
        <Button type="submit" variant="outline">Sign Out</Button>
      </form>
    </div>
  )
}