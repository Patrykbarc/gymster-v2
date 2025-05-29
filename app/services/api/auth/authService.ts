import { supabase } from '~/supabase/supabaseClient'
import type { UserRegistrationData } from './types'

export const authService = {
  register: async (userData: UserRegistrationData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName
        }
      }
    })
    return { data, error }
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }
}
