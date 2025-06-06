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
    try {
      const workoutId = exercises[0]?.workout_id

      if (!workoutId) return null

      const { data: existingExercises, error: fetchError } = await client
        .from('workout_exercises')
        .select('id, workout_id, user_id')
        .eq('workout_id', workoutId)
        .eq('user_id', user_id)

      if (fetchError) {
        handleApiError(fetchError)
        return null
      }

      const existingIds = new Set(existingExercises?.map((e) => e.id) || [])
      const currentIds = new Set(
        exercises
          .map((e) => e.id)
          .filter((id): id is string => id !== null && id !== undefined)
      )

      const exercisesToDelete =
        existingExercises
          ?.filter((e) => e.id && !currentIds.has(e.id))
          .map((e) => e.id)
          .filter((id): id is string => id !== null && id !== undefined) || []

      const exercisesToAdd = exercises.filter(
        (e) => !e.id || !existingIds.has(e.id)
      )
      const exercisesToUpdate = exercises.filter(
        (e) => e.id && existingIds.has(e.id)
      )

      if (exercisesToDelete.length > 0) {
        const { error: deleteError } = await client
          .from('workout_exercises')
          .delete()
          .in('id', exercisesToDelete)
          .eq('workout_id', workoutId)
          .eq('user_id', user_id)

        if (deleteError) {
          console.error('Debug - Delete error:', deleteError)
          handleApiError(deleteError)
          return null
        }
      }

      if (exercisesToAdd.length > 0) {
        const { error: insertError } = await client
          .from('workout_exercises')
          .insert(
            exercisesToAdd.map((exercise) => ({
              ...exercise,
              user_id
            }))
          )

        if (insertError) {
          handleApiError(insertError)
          return null
        }
      }

      const updatePromises = exercisesToUpdate.map((exercise) => {
        if (!exercise.id) return null

        return client
          .from('workout_exercises')
          .update({
            exercise_id: exercise.exercise_id,
            reps: exercise.reps,
            sets: exercise.sets,
            weight: exercise.weight,
            notes: exercise.notes,
            order_position: exercise.order_position,
            user_id,
            updated_at: new Date().toISOString()
          })
          .eq('id', exercise.id)
      })

      const updateResults = await Promise.all(updatePromises)
      const updateError = updateResults.find((result) => result?.error)

      if (updateError) {
        handleApiError(updateError.error)
        return null
      }

      const { data: updatedExercises, error: finalError } = await client
        .from('workout_exercises')
        .select('*')
        .eq('workout_id', workoutId)
        .order('order_position')

      if (finalError) {
        handleApiError(finalError)
        return null
      }

      return updatedExercises
    } catch (error) {
      handleApiError(error)
      return null
    }
  },

  deleteWorkout: async (id: string) => {
    const { data, error } = await client.from('workouts').delete().eq('id', id)
    if (error) {
      handleApiError(error)
    }
    return data
  }
}
