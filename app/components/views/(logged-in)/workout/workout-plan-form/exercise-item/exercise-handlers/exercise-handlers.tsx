import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { Dialog } from '~/components/shared/dialog/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type {
  ExerciseSet,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'

function RemoveExercise({ onRemove }: { onRemove: () => void }) {
  return (
    <Dialog
      title="Remove Exercise"
      description="This action cannot be undone."
      callback={onRemove}
    >
      <Button type="button" variant="ghost" size="icon" className="ms-auto">
        <Trash2 className="size-4" />
      </Button>
    </Dialog>
  )
}

function AddSetButton({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={onAdd}
      >
        <Plus className="mr-2 size-4" /> Add Set
      </Button>
    </div>
  )
}

function SetControls({
  setIndex,
  exercise,
  onMoveSet,
  onRemoveSet
}: {
  setIndex: number
  exercise: WorkoutExerciseWithSets
  onMoveSet: (setIndex: number, direction: 'up' | 'down') => void
  onRemoveSet: (setIndex: number) => void
}) {
  return (
    <div className="mt-auto flex justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onMoveSet(setIndex, 'up')}
        disabled={setIndex === 0}
      >
        <ArrowUp className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onMoveSet(setIndex, 'down')}
        disabled={setIndex === (exercise.exercise_sets?.length || 0) - 1}
      >
        <ArrowDown className="size-4" />
      </Button>

      <Dialog
        title="Remove Set"
        description={`Are you sure you want to remove set ${setIndex + 1}?`}
        callback={() => onRemoveSet(setIndex)}
      >
        <Button type="button" variant="ghost" size="icon">
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </Dialog>
    </div>
  )
}

type SetField = keyof Pick<
  ExerciseSet,
  'reps' | 'weight' | 'notes' | 'order_position'
>

type SetChange = (
  setIndex: number,
  field: SetField,
  value: number | null
) => void

function SetInputs({
  set,
  setIndex,
  onSetChange
}: {
  set: ExerciseSet
  setIndex: number
  onSetChange: SetChange
}) {
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
            onSetChange(
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
            onSetChange(
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

export { AddSetButton, RemoveExercise, SetControls, SetInputs }
