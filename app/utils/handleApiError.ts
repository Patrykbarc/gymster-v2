import { PostgrestError } from '@supabase/supabase-js'

export function handleApiError<T>(error: T | null) {
  if (error instanceof PostgrestError) {
    console.error(error.message)
  }

  if (error instanceof Error) {
    console.error(error.message)
  }

  console.error(error)
}
