import type { User } from '@supabase/supabase-js'
import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { Database } from '~/types/database.types'
import { handleApiError } from '../../../utils/handleApiError'

export type WorkoutInsert =
  Database['public']['Tables']['workouts']['Insert'] & {
    user_id: User['id']
  }

export const workoutsService = {
  getWorkouts: async (request: Request) => {
    const { data, error } = await server(request)
      .supabase.from('workouts')
      .select('*')
    if (error) {
      handleApiError(error)
    }
    return data
  },

  getExercise: async (request: Request, id: string) => {
    const { data, error } = await server(request)
      .supabase.from('workouts')
      .select('*')
      .eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  },

  insertWorkout: async (workout: WorkoutInsert) => {
    const { data, error } = await client
      .from('workouts')
      .insert(workout)
      .select()
    if (error) {
      handleApiError(error)
    }
    return data
  },

  updateWorkout: async (id: string, workout: WorkoutInsert) => {
    const { data, error } = await client
      .from('workouts')
      .update(workout)
      .eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  },

  deleteWorkout: async (id: string) => {
    const { data, error } = await client.from('workouts').delete().eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  }
}
