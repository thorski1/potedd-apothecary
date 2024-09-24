'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { handleSupabaseError } from '@/lib/supabase-client'

/**
 * Signs up a new user with the provided email and password.
 * @param {FormData} formData - The form data containing email and password.
 * @returns {Promise<{ success?: string; error?: string }>} A promise that resolves to an object containing either a success message or an error.
 */
export async function signUp(formData: FormData): Promise<{ success?: string; error?: string }> {
  const supabase = createServerActionClient({ cookies })
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message);
    }

    // For development: Automatically confirm the user
    if (process.env.NODE_ENV === 'development') {
      const { data: user, error: userError } = await supabase
        .from('auth.users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError) {
        throw new Error(userError.message);
      }

      if (user) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ email_confirmed_at: new Date().toISOString() })
          .eq('id', user.id);

        if (updateError) {
          throw new Error(updateError.message);
        }
      }
    }

    return { success: 'Account created successfully!' };
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

/**
 * Signs in a user with the provided email and password.
 * @param {FormData} formData - The form data containing email and password.
 * @returns {Promise<{ success?: boolean; error?: string }>} A promise that resolves to an object indicating success or containing an error message.
 */
export async function signIn(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  const supabase = createServerActionClient({ cookies })
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: handleSupabaseError(error) }
    }

    if (data.session) {
      // Set the session cookie
      cookies().set('supabase-auth-token', JSON.stringify(data.session), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Sign in error:', error)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

/**
 * Signs out the current user.
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
export async function signOut(): Promise<void> {
  const supabase = createServerActionClient({ cookies })
  await supabase.auth.signOut()
  redirect('/login')
}