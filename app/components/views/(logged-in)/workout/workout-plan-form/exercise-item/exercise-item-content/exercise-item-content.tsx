import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type {
  Field,
  Value,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'
import { useHandleSet } from '../../../_hooks/useHandleSet'

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

  return (
    <div className="space-y-4">
      {exercise.exercise_sets?.map((set, setIndex) => (
        <div
          key={setIndex}
          className="flex justify-between gap-2 border-b border-gray-100 pb-4"
        >
          <div className="my-auto mr-6 space-y-2">
            <Label className="text-md">Set {set.order_position}</Label>
          </div>
          <div className="space-y-2">
            <Label>Reps</Label>
            <Input
              type="number"
              value={set.reps || ''}
              min={1}
              onChange={(e) =>
                handleSetChange(
                  setIndex,
                  'reps',
                  e.target.value ? Number(e.target.value) : null
                )
              }
              placeholder="Reps"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Weight</Label>
            <Input
              type="number"
              value={set.weight || ''}
              min={1}
              onChange={(e) =>
                handleSetChange(
                  setIndex,
                  'weight',
                  e.target.value ? Number(e.target.value) : null
                )
              }
              placeholder="Weight"
              className="w-full"
            />
          </div>
          <SetControls
            setIndex={setIndex}
            exercise={exercise}
            handleMoveSet={handleMoveSet}
            handleRemoveSet={handleRemoveSet}
          />
        </div>
      ))}
    </div>
  )
}

type SetControlsProps = {
  setIndex: number
  exercise: WorkoutExerciseWithSets
  handleMoveSet: (setIndex: number, direction: 'up' | 'down') => void
  handleRemoveSet: (setIndex: number) => void
}

function SetControls({
  setIndex,
  exercise,
  handleMoveSet,
  handleRemoveSet
}: SetControlsProps) {
  return (
    <div className="mt-auto flex justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => handleMoveSet(setIndex, 'up')}
        disabled={setIndex === 0}
      >
        <ArrowUp className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => handleMoveSet(setIndex, 'down')}
        disabled={setIndex === (exercise.exercise_sets?.length || 0) - 1}
      >
        <ArrowDown className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => handleRemoveSet(setIndex)}
      >
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  )
}
