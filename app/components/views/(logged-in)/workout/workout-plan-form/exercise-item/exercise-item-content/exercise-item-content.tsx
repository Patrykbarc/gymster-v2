import type {
  Field,
  Value,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'
import { useHandleSet } from '../../../_hooks/useHandleSet'
import { SetControls, SetInputs } from '../exercise-handlers/exercise-handlers'

type ExerciseItemContentProps = {
  exercise: WorkoutExerciseWithSets
  index: number
  onExerciseChange: (index: number, field: Field, value: Value) => void
}

export function ExerciseItemContent({
  exercise,
  index,
  onExerciseChange
}: ExerciseItemContentProps) {
  const { handleRemoveSet, handleMoveSet, handleSetChange } = useHandleSet({
    exercise,
    index,
    onExerciseChange
  })

  if (exercise.exercise_sets?.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-muted-foreground text-sm">
          Please add your first set.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      {exercise.exercise_sets?.map((set, setIndex) => (
        <div
          key={setIndex}
          className="flex justify-between gap-2 border-b border-gray-100 pb-4 last-of-type:border-0 last-of-type:pb-0"
        >
          <SetInputs
            set={set}
            setIndex={setIndex}
            onSetChange={handleSetChange}
          />

          <SetControls
            setIndex={setIndex}
            exercise={exercise}
            onMoveSet={handleMoveSet}
            onRemoveSet={handleRemoveSet}
          />
        </div>
      ))}
    </div>
  )
}
