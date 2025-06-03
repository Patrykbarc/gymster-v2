import type { z } from 'zod'
import type { Database } from '~/types/database.types'
import type { schema } from './schema'

type Exercise = Database['public']['Tables']['exercises']['Row']

export type FormData = z.infer<typeof schema>

export type ExerciseFormProps = {
  exercise?: Exercise | null
}

export type FormField = {
  id: keyof FormData
  label: string
  type: 'text' | 'textarea' | 'select' | 'url'
  placeholder: string
  required?: boolean
  options?: readonly string[]
  rows?: number
  isArray?: boolean
  arraySeparator?: 'comma' | 'newline'
}
