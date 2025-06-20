import type { AuthChangeEvent } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { client } from '~/supabase/client'

export function useAuthStateChange() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const {
      data: { subscription }
    } = client.auth.onAuthStateChange((event: AuthChangeEvent) => {
      switch (event) {
        case 'SIGNED_IN':
          if (!pathname.startsWith('/dashboard')) {
            window.location.reload()
          }
          break
        case 'SIGNED_OUT':
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
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate, pathname])
}
