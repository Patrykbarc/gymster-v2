import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import { Dialog } from '~/components/shared/dialog/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type {
  ExerciseSet,
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
            handleSetChange={handleSetChange}
          />

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

type SetField = keyof Pick<
  ExerciseSet,
  'reps' | 'weight' | 'notes' | 'order_position'
>

type SetInputsProps = {
  set: WorkoutExerciseWithSets['exercise_sets'][number]
  setIndex: number
  handleSetChange: (
    setIndex: number,
    field: SetField,
    value: number | null
  ) => void
}

function SetInputs({ set, setIndex, handleSetChange }: SetInputsProps) {
  return (
    <div className="flex w-full gap-2">
      <div className="my-auto ml-2 mr-6 space-y-2">
        <Label className="text-md text-nowrap">Set {set.order_position}</Label>
      </div>

      <div className="w-full space-y-2">
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
      <div className="w-full space-y-2">
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

      <Dialog
        title="Remove Set"
        description={`Are you sure you want to remove set ${setIndex + 1}?`}
        callback={() => handleRemoveSet(setIndex)}
      >
        <Button type="button" variant="ghost" size="icon">
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </Dialog>
    </div>
  )
}
