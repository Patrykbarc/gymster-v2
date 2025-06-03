import type { Database } from '~/types/database.types'

export type Exercises = Database['public']['Tables']['exercises']['Row']

export type FormData = {
  name: string
  description: string | null
  muscle_group: string | null
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  equipment: string | null
  instructions: string | null
  video_url: string | null
  image_url: string | null
}

export type ExerciseFormProps = {
  userId: string
  exercise?: Exercises | null
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
