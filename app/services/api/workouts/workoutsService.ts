import type { User } from '@supabase/supabase-js'
import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type {
  ExerciseSet,
  WorkoutExerciseInsert,
  WorkoutInsert,
  WorkoutWithExerciseCount,
  WorkoutWithExercises
} from '~/types/workouts.types'
import { handleApiError } from '~/utils/handleApiError'
import { workoutExercisesService } from './workoutExercisesService'

export const workoutsService = {
  /**
   * Get all workouts with exercise count
   */
  getWorkouts: async (
    request: Request
  ): Promise<WorkoutWithExerciseCount[] | null> => {
    const { data, error } = await server(request)
      .supabase.from('workouts')
      .select('*, workout_exercises(count)')

    if (error) {
      handleApiError(error)
      return null
    }

    return data
  },

  /**
   * Get a single workout by ID with all exercises and their sets
   */
  getWorkoutById: async (
    request: Request,
    id: string
  ): Promise<WorkoutWithExercises[] | null> => {
    const { data: workouts, error } = await server(request)
      .supabase.from('workouts')
      .select('*')
      .eq('id', id)

    if (error) {
      handleApiError(error)
      return null
    }

    if (!workouts || workouts.length === 0) return null

    const exercises = await workoutExercisesService.getByWorkoutId(request, id)
    if (!exercises) return null

    return workouts.map((workout) => ({
      ...workout,
      workout_exercises: exercises
    }))
  },

  /**
   * Create a new workout
   */
  insertWorkout: async (workout: WorkoutInsert) => {
    const { data, error } = await client
      .from('workouts')
      .insert(workout)
      .select()
      .single()

    if (error) {
      handleApiError(error)
      return null
    }

    return data
  },

  /**
   * Update workout exercises (add, update, delete)
   */
  updateWorkoutExercises: async (
    exercises: (WorkoutExerciseInsert & { exercise_sets?: ExerciseSet[] })[],
    userId: User['id']
  ) => {
    try {
      const workoutId = exercises[0]?.workout_id
      if (!workoutId) return null

      // Get existing exercises
      const { data: existingExercises, error: fetchError } = await client
        .from('workout_exercises')
        .select('id')
        .eq('workout_id', workoutId)

      if (fetchError) {
        handleApiError(fetchError)
        return null
      }

      const existingIds = new Set(existingExercises?.map((e) => e.id) || [])
      const newIds = new Set(
        exercises
          .map((e) => e.id)
          .filter((id): id is string => id !== null && id !== undefined)
      )

      // Delete removed exercises
      const exercisesToDelete =
        existingExercises?.filter((e) => !newIds.has(e.id)).map((e) => e.id) ||
        []

      for (const id of exercisesToDelete) {
        await workoutExercisesService.delete(id)
      }

      // Update existing and add new exercises
      const results = await Promise.all(
        exercises.map((exercise) => {
          if (exercise.id && existingIds.has(exercise.id)) {
            return workoutExercisesService.update(exercise, userId)
          } else {
            return workoutExercisesService.insert(exercise, userId)
          }
        })
      )

      // Filter out any failed operations
      return results.filter((result) => result !== null)
    } catch (error) {
      handleApiError(error)
      return null
    }
  },

  /**
   * Update workout details
   */
  updateWorkout: async (workoutId: string, workout: Partial<WorkoutInsert>) => {
    const { data, error } = await client
      .from('workouts')
      .update(workout)
      .eq('id', workoutId)
      .select()
      .single()

    if (error) {
      handleApiError(error)
      return null
    }

    return data
  },

  /**
   * Delete a workout and all its exercises
   */
  deleteWorkout: async (id: string) => {
    const { data, error } = await client.from('workouts').delete().eq('id', id)

    if (error) {
      handleApiError(error)
      return null
    }

    return data
  }
}
