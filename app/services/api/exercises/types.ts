import type { User } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export type ExerciseInsert =
  Database['public']['Tables']['exercises']['Insert'] & {
    user_id: User['id']
  }
