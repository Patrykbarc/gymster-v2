export type Exercise = {
  id: string
  exercise_id: string
  sets: number
  reps: number
  weight: number
}

export type ExerciseItemContentProps = {
  exercise: Exercise
  index: number
  onExerciseChange: (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => void
  onRemove: (index: number) => void
  draggable?: boolean
}
