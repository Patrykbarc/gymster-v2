import { Draggable } from '@hello-pangea/dnd'
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from 'lucide-react'
import { useLoaderData } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import type { loader } from '~/routes/(logged-in)/workout/edit-workout-plan'
import type {
  ExerciseSet,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'

type ExerciseItemProps = {
  exercise: WorkoutExerciseWithSets
  index: number
  onExerciseChange: (
    index: number,
    field:
      | keyof Omit<WorkoutExerciseWithSets, 'exercise_sets'>
      | 'exercise_sets',
    value: string | number | null | ExerciseSet[]
  ) => void
  onRemove: (index: number) => void
  draggable?: boolean
}

export function ExerciseItem({
  exercise,
  index,
  onExerciseChange,
  onRemove,
  draggable = false
}: ExerciseItemProps) {
  const { exercises } = useLoaderData<typeof loader>()

  function handleChange(
    field:
      | keyof Omit<WorkoutExerciseWithSets, 'exercise_sets'>
      | 'exercise_sets',
    value: string | number | null | ExerciseSet[]
  ) {
    onExerciseChange(index, field, value)
  }

  function handleAddSet() {
    const now = new Date().toISOString()
    const newSet: ExerciseSet = {
      id: crypto.randomUUID(),
      reps: null,
      weight: null,
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

  const renderContent = () => (
    <div className="flex flex-col justify-between gap-4 rounded-lg border p-4">
      <div className="mb-2 flex w-full items-center gap-2">
        {draggable && (
          <GripVertical className="size-5 cursor-grab text-gray-500" />
        )}
        <Select
          value={exercise.exercise_id || ''}
          onValueChange={(value) => handleChange('exercise_id', value)}
        >
          <SelectTrigger className="w-full lg:w-[300px]">
            <SelectValue placeholder="Select exercise" />
          </SelectTrigger>
          <SelectContent>
            {exercises?.map((ex) => (
              <SelectItem key={ex.id} value={ex.id}>
                {ex.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <RemoveExercise className="ms-auto" onRemove={onRemove} index={index} />
      </div>

      <div className="space-y-4">
        {exercise.exercise_sets?.map((set, setIndex) => (
          <div
            key={setIndex}
            className="grid grid-cols-12 items-end gap-2 border-b border-gray-100 pb-4"
          >
            <div className="col-span-2 mb-auto space-y-2">
              <Label>Set {set.order_position}</Label>
            </div>
            <div className="col-span-3 space-y-2">
              <Label>Reps</Label>
              <Input
                type="number"
                value={set.reps || ''}
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
            <div className="col-span-3 space-y-2">
              <Label>Weight</Label>
              <Input
                type="number"
                value={set.weight || ''}
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
            <div className="col-span-4 flex items-center justify-end gap-1">
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
                disabled={
                  setIndex === (exercise.exercise_sets?.length || 0) - 1
                }
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
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={handleAddSet}
        >
          <Plus className="mr-2 size-4" /> Add Set
        </Button>
      </div>
    </div>
  )

  return draggable ? (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided) => (
        <div
          className="mb-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderContent()}
        </div>
      )}
    </Draggable>
  ) : (
    renderContent()
  )
}

function RemoveExercise({
  onRemove,
  index,
  className
}: {
  onRemove: ExerciseItemProps['onRemove']
  index: ExerciseItemProps['index']
  className?: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onRemove(index)}
      className={className}
    >
      <Trash2 className="size-4" />
    </Button>
  )
}
