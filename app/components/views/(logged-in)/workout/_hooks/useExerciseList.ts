import { type DropResult } from '@hello-pangea/dnd'
import type {
  Field,
  Value,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'

type UseExerciseListProps = {
  exercises: WorkoutExerciseWithSets[]
  onExercisesChange: (exercises: WorkoutExerciseWithSets[]) => void
  workoutId: string | null
}

export function useExerciseList({
  exercises,
  onExercisesChange,
  workoutId
}: UseExerciseListProps) {
  const sortedExercises = [...exercises].sort(
    (a, b) => a.order_position - b.order_position
  )

  const handleAddExercise = () => {
    const now = new Date().toISOString()
    const newExerciseId = crypto.randomUUID()

    onExercisesChange([
      ...sortedExercises,
      {
        id: newExerciseId,
        exercise_id: null,
        notes: null,
        order_position: sortedExercises.length + 1,
        workout_id: workoutId,
        user_id: null,
        created_at: now,
        updated_at: now,
        exercise_sets: [
          {
            id: crypto.randomUUID(),
            workout_exercise_id: newExerciseId,
            order_position: 1,
            reps: null,
            weight: null,
            notes: null,
            created_at: now,
            updated_at: now
          }
        ]
      }
    ])
  }

  const handleExerciseChange = (index: number, field: Field, value: Value) => {
    const updatedExercises = [...sortedExercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
      updated_at: new Date().toISOString()
    }
    onExercisesChange(updatedExercises)
  }

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = sortedExercises
      .filter((_, i) => i !== index)
      .map((exercise, newIndex) => ({
        ...exercise,
        order_position: newIndex + 1,
        updated_at: new Date().toISOString()
      }))
    onExercisesChange(updatedExercises)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sortedExercises)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedItems = items.map((item, index) => ({
      ...item,
      order_position: index + 1,
      updated_at: new Date().toISOString()
    }))

    onExercisesChange(updatedItems)
  }

  return {
    sortedExercises,
    handleAddExercise,
    handleExerciseChange,
    handleRemoveExercise,
    handleDragEnd
  }
}
