import { supabase } from '~/supabase/supabaseClient'
import type { UserRegistrationData } from './types'

export const authService = {
  signUp: async (
    email: string,
    password: string,
    userData: UserRegistrationData
  ) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: userData }
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  }
}
