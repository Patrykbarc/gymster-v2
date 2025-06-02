import { client } from '~/supabase/client'
import type { Database } from '~/types/database.types'

export type ExerciseInsert =
  Database['public']['Tables']['exercises']['Insert'] & {
    user_id: string
  }
export const exercisesService = {
  getExercises: async () => {
    const { data, error } = await client.from('exercises').select('*')
    console.log(data, error)
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
