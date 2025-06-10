import type { Database } from './database.types'

// Base types from database
export type Workout = Database['public']['Tables']['workouts']['Row']
export type WorkoutExercise =
  Database['public']['Tables']['workout_exercises']['Row']
export type ExerciseSet = Database['public']['Tables']['exercise_sets']['Row']

// Extended types for specific use cases
export type WorkoutWithExerciseCount = Workout & {
  workout_exercises: { count: number }[]
}

export type WorkoutWithExercises = Workout & {
  workout_exercises: (WorkoutExercise & {
    exercise_sets: ExerciseSet[]
  })[]
}

export type WorkoutExerciseWithSets = WorkoutExercise & {
  exercise_sets: ExerciseSet[]
}

// Insert types
export type WorkoutInsert = Database['public']['Tables']['workouts']['Insert']
export type WorkoutExerciseInsert =
  Database['public']['Tables']['workout_exercises']['Insert']
export type ExerciseSetInsert =
  Database['public']['Tables']['exercise_sets']['Insert']

// Field types
export type Field =
  | keyof Omit<WorkoutExerciseWithSets, 'exercise_sets'>
  | 'exercise_sets'

export type Value = string | number | null | ExerciseSet[]
