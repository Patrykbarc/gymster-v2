import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { client } from '~/supabase/client'

export function useAuthStateChange() {
  const navigate = useNavigate()

  useEffect(() => {
    const {
      data: { subscription }
    } = client.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        switch (event) {
          case 'SIGNED_IN':
            // Redirect to dashboard or home page after sign in
            navigate('/dashboard')
            break
          case 'SIGNED_OUT':
            // Redirect to login page after sign out
            navigate('/login')
            break
          case 'USER_UPDATED':
            // Refresh the page to ensure we have the latest user data
            window.location.reload()
            break
          case 'PASSWORD_RECOVERY':
            // Redirect to password reset page
            navigate('/reset-password')
            break
          default:
            break
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])
}
