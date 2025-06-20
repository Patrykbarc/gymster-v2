import { z } from 'zod'
import { Constants } from '~/types/database.types'

export const difficulties = Constants.public.Enums.difficulty_level

const linkSchema = z
  .string()
  .nullable()
  .refine((val) => !val || val.match(/^https?:\/\/.+/), {
    message: 'Must be a valid URL'
  })

export const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().nullable(),
  muscle_group: z.string().nullable(),
  difficulty: z.enum(difficulties),
  equipment: z.string().nullable(),
  instructions: z.string().nullable(),
  video_url: linkSchema,
  image_url: linkSchema
})
