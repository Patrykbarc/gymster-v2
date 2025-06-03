import type { User } from '@supabase/supabase-js'
import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { Database } from '~/types/database.types'

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
      throw new Error(error.message)
    }
    return data
  },

  insertExercise: async (exercise: ExerciseInsert) => {
    const { data, error } = await client
      .from('exercises')
      .insert(exercise)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  },

  updateExercise: async (id: string, exercise: ExerciseInsert) => {
    const { data, error } = await client
      .from('exercises')
      .update(exercise)
      .eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },

  deleteExercise: async (id: string) => {
    const { data, error } = await client.from('exercises').delete().eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}
