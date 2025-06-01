import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { UserRegistrationData } from './types'

export const authService = {
  getUser: async (request: Request) => {
    return await server(request).supabase.auth.getUser()
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

  signIn: async (email: string, password: string) => {
    return await client.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await client.auth.signOut()
  }
}
