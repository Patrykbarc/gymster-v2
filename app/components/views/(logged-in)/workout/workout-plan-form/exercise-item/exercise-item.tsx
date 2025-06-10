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
import type { WorkoutExerciseWithSets } from '~/types/workouts.types'
import { useHandleSet, type Field, type Value } from '../../_hooks/useHandleSet'

type ExerciseItemProps = {
  exercise: WorkoutExerciseWithSets
  index: number
  onExerciseChange: (index: number, field: Field, value: Value) => void
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
  const {
    handleChange,
    handleAddSet,
    handleRemoveSet,
    handleMoveSet,
    handleSetChange
  } = useHandleSet({
    exercise,
    index,
    onExerciseChange
  })

  const renderContent = () => (
    <div className="flex flex-col justify-between gap-4 rounded-lg border p-4">
      <div className="mb-4 flex w-full items-center gap-2">
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
            className="flex gap-2 border-b border-gray-100 pb-4"
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

export function SetControls({
  setIndex,
  exercise,
  handleMoveSet,
  handleRemoveSet
}: {
  setIndex: number
  exercise: WorkoutExerciseWithSets
  handleMoveSet: (setIndex: number, direction: 'up' | 'down') => void
  handleRemoveSet: (setIndex: number) => void
}) {
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

export function RemoveExercise({
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
