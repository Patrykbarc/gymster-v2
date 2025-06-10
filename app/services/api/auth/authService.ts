import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { UserRegistrationData } from './types'
export const authService = {
  getUser: async (request: Request) => {
    const { data, error } = await server(request).supabase.auth.getUser()
    const user_id = data?.user?.id

    return { session: { user_id }, error }
  },

  signUp: async (
    email: string,
    password: string,
    userData: UserRegistrationData
  ) => {
    return await client.auth.signUp({
      email,
      password,
      options: { data: userData }
    })
  },

  signInWithPassword: async (email: string, password: string) => {
    return await client.auth.signInWithPassword({
      email,
      password
    })
  },

  signInWithGoogle: async () => {
    return await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
  },

  signOut: async () => {
    return await client.auth.signOut()
  },

  getSession: async () => {
    return await client.auth.getSession()
  }
}
