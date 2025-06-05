import type { User } from '@supabase/supabase-js'
import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { Database } from '~/types/database.types'
import { handleApiError } from '~/utils/handleApiError'

type WorkoutInsert = Database['public']['Tables']['workouts']['Insert']
type WorkoutExerciseInsert =
  Database['public']['Tables']['workout_exercises']['Insert']

export type Workouts = Database['public']['Tables']['workouts']['Row'] & {
  workout_exercises: { count: number }[]
}

export const workoutsService = {
  getWorkouts: async (request: Request): Promise<Workouts[] | null> => {
    const { data, error } = await server(request)
      .supabase.from('workouts')
      .select('*, workout_exercises(count)')
    if (error) {
      handleApiError(error)
    }
    return data
  },

  getWorkoutById: async (request: Request, id: string) => {
    const { data, error } = await server(request)
      .supabase.from('workouts')
      .select('*, workout_exercises(*)')
      .eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  },

  insertWorkout: async (workout: WorkoutInsert) => {
    const { data: workoutData, error: workoutError } = await client
      .from('workouts')
      .insert(workout)
      .select()
      .single()

    if (workoutError) {
      handleApiError(workoutError)
      return null
    }

    return workoutData
  },

  insertWorkoutExercises: async (
    exercises: WorkoutExerciseInsert[],
    user_id: User['id']
  ) => {
    const { data, error } = await client.from('workout_exercises').insert(
      exercises.map((exercise) => ({
        ...exercise,
        user_id
      }))
    )

    if (error) {
      handleApiError(error)
      return null
    }

    return data
  },

  updateWorkout: async (planId: string, workout: Partial<WorkoutInsert>) => {
    const { data, error } = await client
      .from('workouts')
      .update(workout)
      .eq('id', planId)
      .select()

    if (error) {
      handleApiError(error)
      return null
    }

    return data[0]
  },

  updateWorkoutExercises: async (
    exercises: WorkoutExerciseInsert[],
    user_id: User['id']
  ) => {
    const exerciseIds = exercises
      .map((e) => e.id)
      .filter((id): id is string => id !== undefined)

    const { data, error } = await client
      .from('workout_exercises')
      .update({
        user_id,
        updated_at: new Date().toISOString()
      })
      .in('id', exerciseIds)

    if (error) {
      handleApiError(error)
      return null
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
