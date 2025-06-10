import { z } from 'zod'

const exerciseSetSchema = z.object({
  id: z.string().optional(),
  reps: z.number().min(1, 'Reps must be greater than 0').nullable(),
  weight: z.number().min(1, 'Weight must be greater than 0').nullable(),
  notes: z.string().nullable(),
  order_position: z.number(),
  workout_exercise_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

const schema = z.object({
  user_id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      id: z.string(),
      exercise_id: z.string().nullable(),
      order_position: z.number(),
      workout_id: z.string().nullable(),
      user_id: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      notes: z.string().nullable(),
      exercise_sets: z.array(exerciseSetSchema)
    })
  )
})

type FormData = z.infer<typeof schema>

export { schema, type FormData }
