import type {
  ExerciseSet,
  Field,
  Value,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'

type UseHandleSetProps = {
  exercise: WorkoutExerciseWithSets
  index: number
  onExerciseChange: (index: number, field: Field, value: Value) => void
}

export function useHandleSet({
  exercise,
  index,
  onExerciseChange
}: UseHandleSetProps) {
  function handleChange(field: Field, value: Value) {
    onExerciseChange(index, field, value)
  }

  function handleAddSet() {
    const now = new Date().toISOString()
    const newSet: ExerciseSet = {
      id: crypto.randomUUID(),
      reps: 8,
      weight: 50,
      notes: null,
      order_position: (exercise.exercise_sets?.length || 0) + 1,
      workout_exercise_id: exercise.id,
      created_at: now,
      updated_at: now
    }

    handleChange('exercise_sets', [...(exercise.exercise_sets || []), newSet])
  }

  function handleRemoveSet(setIndex: number) {
    const updatedSets = (exercise.exercise_sets || [])
      .filter((_, i) => i !== setIndex)
      .map((set, i) => ({ ...set, order_position: i + 1 }))
    handleChange('exercise_sets', updatedSets)
  }

  function handleMoveSet(setIndex: number, direction: 'up' | 'down') {
    const sets = [...(exercise.exercise_sets || [])]
    if (
      (direction === 'up' && setIndex === 0) ||
      (direction === 'down' && setIndex === sets.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? setIndex - 1 : setIndex + 1
    const [movedSet] = sets.splice(setIndex, 1)
    sets.splice(newIndex, 0, movedSet)

    const updatedSets = sets.map((set, i) => ({
      ...set,
      order_position: i + 1
    }))
    handleChange('exercise_sets', updatedSets)
  }

  function handleSetChange(
    setIndex: number,
    field: keyof Omit<
      ExerciseSet,
      'id' | 'created_at' | 'updated_at' | 'workout_exercise_id'
    >,
    value: number | null
  ) {
    const updatedSets = [...(exercise.exercise_sets || [])]
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      [field]: value,
      updated_at: new Date().toISOString()
    }
    handleChange('exercise_sets', updatedSets)
  }

  return {
    handleChange,
    handleAddSet,
    handleRemoveSet,
    handleMoveSet,
    handleSetChange
  }
}
