export type Exercise = {
  id: string
  exerciseId: string
  sets: number
  reps: number
}

export type AvailableExercise = {
  id: string
  name: string
  muscleCategory: string
}

export type ExerciseListProps = {
  exercises: Exercise[]
  availableExercises: AvailableExercise[]
  onExercisesChange: (exercises: Exercise[]) => void
  draggable?: boolean
  className?: string
}

export type ExerciseItemContentProps = {
  exercise: Exercise
  index: number
  availableExercises: AvailableExercise[]
  onExerciseChange: (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => void
  onRemove: (index: number) => void
  draggable?: boolean
}
