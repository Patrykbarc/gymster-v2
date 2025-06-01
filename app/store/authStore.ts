import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { authService } from '~/services/api/auth/authService'
import type { UserRegistrationData } from '~/services/api/auth/types'

type AuthState = {
  user: User | null
  isLoading: boolean
  signUp: (
    email: string,
    password: string,
    userData: UserRegistrationData
  ) => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  signUp: async (email, password, userData) => {
    set({ isLoading: true })
    try {
      const { data, error } = await authService.signUp(
        email,
        password,
        userData
      )
      if (error) throw error
      set({ user: data.user })
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signInWithEmail: async (email, password) => {
    set({ isLoading: true })
    try {
      const { data, error } = await authService.signIn(email, password)
      if (error) throw error
      set({ user: data.user })
    } catch (error) {
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signOut: async () => {
    set({ isLoading: true })
    try {
      await authService.signOut()
      set({ user: null })
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  }
}))
