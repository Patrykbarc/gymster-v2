import { client } from '~/supabase/client'
import type { Database } from '~/types/database.types'

type Exercise = Database['public']['Tables']['exercises']['Row']
type ExerciseInsert = Database['public']['Tables']['exercises']['Insert']

export const exercisesService = {
  getExercises: async () => {
    const { data, error } = await client.from('exercises').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  },

  createExercise: async (exercise: ExerciseInsert) => {
    const { data, error } = await client.from('exercises').insert(exercise)
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
  }
}
