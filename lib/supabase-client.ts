import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

export const handleSupabaseError = (error: any) => {
  if (error.message === 'Error sending confirmation email') {
    console.error('Failed to send confirmation email:', error)
    return 'Failed to send confirmation email. Please try again later or contact support.'
  }
  return error.message || 'An unexpected error occurred'
}