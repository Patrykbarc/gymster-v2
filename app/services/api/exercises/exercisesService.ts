import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { Database } from '~/types/database.types'
import { handleApiError } from '~/utils/handleApiError'
import type { ExerciseInsert } from './types'

type ExercisesRow = Database['public']['Tables']['exercises']['Row']

export const exercisesService = {
  getExercises: async (request: Request): Promise<ExercisesRow[] | null> => {
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
