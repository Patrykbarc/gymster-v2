import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { authService } from '~/services/api/auth/authService'
import type { UserRegistrationData } from '~/services/api/auth/types'
import { handleApiError } from '~/utils/handleApiError'

type AuthState = {
  user: User | null
  isLoading: boolean
  getSession: () => Promise<void>
  signUp: (
    email: string,
    password: string,
    userData: UserRegistrationData
  ) => Promise<void>
  signInWithPassword: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  getSession: async () => {
    set({ isLoading: true })
    try {
      const { data, error } = await authService.getSession()
      if (error) {
        handleApiError(error)
        throw error
      }
      set({ user: data.session?.user || null })
    } catch (error) {
      handleApiError(error)
    } finally {
      set({ isLoading: false })
    }
  },

  signUp: async (email, password, userData) => {
    set({ isLoading: true })
    try {
      const { data, error } = await authService.signUp(
        email,
        password,
        userData
      )
      if (error) {
        handleApiError(error)
        throw error
      }
      set({ user: data.user })
    } catch (error) {
      handleApiError(error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signInWithPassword: async (email, password) => {
    set({ isLoading: true })
    try {
      const { data, error } = await authService.signInWithPassword(
        email,
        password
      )
      if (error) {
        handleApiError(error)
        throw error
      }
      set({ user: data.user })
    } catch (error) {
      handleApiError(error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true })
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      handleApiError(error)
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
      handleApiError(error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  }
}))
