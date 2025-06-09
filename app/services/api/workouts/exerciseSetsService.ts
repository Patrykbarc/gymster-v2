import { client } from '~/supabase/client'
import type { ExerciseSet } from '~/types/workouts.types'
import { handleApiError } from '~/utils/handleApiError'

export const exerciseSetsService = {
  getByExerciseId: async (exerciseId: string) => {
    try {
      const { data, error } = await client
        .from('exercise_sets')
        .select('*')
        .eq('workout_exercise_id', exerciseId)
        .order('order_position')

      if (error) {
        handleApiError(error)
        return null
      }

      return data || []
    } catch (error) {
      handleApiError(error)
      return null
    }
  },

  saveSets: async (exerciseId: string, sets: ExerciseSet[]) => {
    try {
      await client
        .from('exercise_sets')
        .delete()
        .eq('workout_exercise_id', exerciseId)

      if (sets.length === 0) {
        return true
      }

      const setsToInsert = sets.map((set, index) => ({
        reps: set.reps,
        weight: set.weight,
        notes: set.notes,
        order_position: index + 1,
        workout_exercise_id: exerciseId
      }))

      const { error: insertError } = await client
        .from('exercise_sets')
        .insert(setsToInsert)

      if (insertError) {
        handleApiError(insertError)
        return false
      }

      return true
    } catch (error) {
      handleApiError(error)
      return false
    }
  }
}
