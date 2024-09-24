'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

/**
 * Login component for user authentication.
 * @returns {JSX.Element} The rendered Login component.
 */
export default function Login(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  /**
   * Handles the form submission for user login.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    try {
      const result = await signIn(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push('/')
        router.refresh() // Refresh the page to update the session state
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Log In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
      </p>
    </div>
  )
}