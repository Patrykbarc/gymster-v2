import { client } from '~/supabase/client'

export const exercisesService = {
  getExercises: async () => {
    const { data, error } = await client.from('exercises').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}
