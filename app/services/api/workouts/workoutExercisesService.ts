import type { User } from '@supabase/supabase-js'
import { client } from '~/supabase/client'
import { server } from '~/supabase/server'
import type { ExerciseSet, WorkoutExerciseInsert } from '~/types/workouts.types'
import { handleApiError } from '~/utils/handleApiError'

export const workoutExercisesService = {
  /**
   * Get all exercises for a workout with their sets
   */
  getByWorkoutId: async (request: Request, workoutId: string) => {
    try {
      const { data: exercises, error } = await server(request)
        .supabase.from('workout_exercises')
        .select('*')
        .eq('workout_id', workoutId)
        .order('order_position')

      if (error) {
        handleApiError(error)
        return null
      }
      if (!exercises) return []

      const exercisesWithSets = await Promise.all(
        exercises.map(async (exercise) => {
          const { data: sets } = await server(request)
            .supabase.from('exercise_sets')
            .select('*')
            .eq('workout_exercise_id', exercise.id)
            .order('order_position')

          return {
            ...exercise,
            exercise_sets: sets || []
          }
        })
      )

      return exercisesWithSets
    } catch (error) {
      handleApiError(error)
      return null
    }
  },

  /**
   * Insert a new exercise with optional sets
   */
  insert: async (
    exercise: WorkoutExerciseInsert & { exercise_sets?: ExerciseSet[] },
    userId: User['id']
  ) => {
    try {
      const { data: insertedExercises, error } = await client
        .from('workout_exercises')
        .insert({
          exercise_id: exercise.exercise_id,
          notes: exercise.notes,
          order_position: exercise.order_position,
          workout_id: exercise.workout_id,
          user_id: userId
        })
        .select()

      if (error || !insertedExercises?.[0]) {
        handleApiError(error)
        return null
      }

      const insertedExercise = insertedExercises[0]

      if (exercise.exercise_sets?.length) {
        const { data: insertedSets, error: setsError } = await client
          .from('exercise_sets')
          .insert(
            exercise.exercise_sets.map((set, index) => ({
              reps: set.reps,
              weight: set.weight,
              notes: set.notes,
              order_position: index + 1,
              workout_exercise_id: insertedExercise.id
            }))
          )
          .select()

        if (setsError) {
          handleApiError(setsError)
          return null
        }

        return {
          ...insertedExercise,
          exercise_sets: insertedSets || []
        }
      }

      return {
        ...insertedExercise,
        exercise_sets: []
      }
    } catch (error) {
      handleApiError(error)
      return null
    }
  },

  /**
   * Update an existing exercise with its sets
   */
  update: async (
    exercise: WorkoutExerciseInsert & { exercise_sets?: ExerciseSet[] },
    userId: User['id']
  ) => {
    try {
      if (!exercise.id) return null

      // Update the exercise
      const { error: updateError } = await client
        .from('workout_exercises')
        .update({
          exercise_id: exercise.exercise_id,
          notes: exercise.notes,
          order_position: exercise.order_position,
          user_id: userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', exercise.id)

      if (updateError) {
        handleApiError(updateError)
        return null
      }

      // Then handle sets
      if (exercise.exercise_sets) {
        // Delete existing sets
        const { error: deleteError } = await client
          .from('exercise_sets')
          .delete()
          .eq('workout_exercise_id', exercise.id)

        if (deleteError) {
          handleApiError(deleteError)
          return null
        }

        // Insert new sets
        if (exercise.exercise_sets.length > 0) {
          const { error: insertError } = await client
            .from('exercise_sets')
            .insert(
              exercise.exercise_sets.map((set, index) => ({
                reps: set.reps,
                weight: set.weight,
                notes: set.notes,
                order_position: index + 1,
                workout_exercise_id: exercise.id as string
              }))
            )

          if (insertError) {
            handleApiError(insertError)
            return null
          }
        }
      }

      // Get the updated exercise
      const { data: updatedExercise, error: fetchError } = await client
        .from('workout_exercises')
        .select('*')
        .eq('id', exercise.id)
        .single()

      if (fetchError || !updatedExercise) {
        handleApiError(fetchError)
        return null
      }

      // Get the updated sets
      const { data: sets } = await client
        .from('exercise_sets')
        .select('*')
        .eq('workout_exercise_id', exercise.id)
        .order('order_position')

      return {
        ...updatedExercise,
        exercise_sets: sets || []
      }
    } catch (error) {
      handleApiError(error)
      return null
    }
  },

  /**
   * Delete an exercise and all its sets
   */
  delete: async (exerciseId: string) => {
    try {
      const { error } = await client
        .from('workout_exercises')
        .delete()
        .eq('id', exerciseId)

      if (error) {
        handleApiError(error)
        return false
      }

      return true
    } catch (error) {
      handleApiError(error)
      return false
    }
  }
}
