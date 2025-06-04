import type { User } from '@supabase/supabase-js'
import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { Database } from '~/types/database.types'
import { handleApiError } from '../../../utils/handleApiError'

export type ExerciseInsert =
  Database['public']['Tables']['exercises']['Insert'] & {
    user_id: User['id']
  }

export const exercisesService = {
  getExercises: async (request: Request) => {
    const { data, error } = await server(request)
      .supabase.from('exercises')
      .select('*')
    if (error) {
      handleApiError(error)
    }
    return data
  },

  getExercise: async (request: Request, id: string) => {
    const { data, error } = await server(request)
      .supabase.from('exercises')
      .select('*')
      .eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  },

  insertExercise: async (exercise: ExerciseInsert) => {
    const { data, error } = await client
      .from('exercises')
      .insert(exercise)
      .select()
    if (error) {
      handleApiError(error)
    }
    return data
  },

  updateExercise: async (id: string, exercise: ExerciseInsert) => {
    const { data, error } = await client
      .from('exercises')
      .update(exercise)
      .eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  },

  deleteExercise: async (id: string) => {
    const { data, error } = await client.from('exercises').delete().eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  }
}
