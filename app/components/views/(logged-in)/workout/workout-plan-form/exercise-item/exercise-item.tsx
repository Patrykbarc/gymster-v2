import { Draggable } from '@hello-pangea/dnd'
import { GripVertical, Plus } from 'lucide-react'
import { useLoaderData } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import type { loader } from '~/routes/(logged-in)/workout/edit-workout-plan'
import type { WorkoutExerciseWithSets } from '~/types/workouts.types'
import { type Field, type Value } from '~/types/workouts.types'
import { useHandleSet } from '../../_hooks/useHandleSet'
import { ExerciseItemContent } from './exercise-item-content/exercise-item-content'
import { RemoveExercise } from './remove-exercise/remove-exercise'

type ExerciseItemProps = {
  exercise: WorkoutExerciseWithSets
  index: number
  onExerciseChange: (index: number, field: Field, value: Value) => void
  onRemove: (index: number) => void
}

export function ExerciseItem({
  exercise,
  index,
  onExerciseChange,
  onRemove
}: ExerciseItemProps) {
  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided) => (
        <div
          className="mb-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderContent({ exercise, index, onExerciseChange, onRemove })}
        </div>
      )}
    </Draggable>
  )
}

function renderContent({
  exercise,
  index,
  onExerciseChange,
  onRemove
}: ExerciseItemProps) {
  const { exercises } = useLoaderData<typeof loader>()
  const { handleChange, handleAddSet } = useHandleSet({
    exercise,
    index,
    onExerciseChange
  })

  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg border p-4">
      <div className="mb-4 flex w-full items-center gap-2">
        <GripVertical className="size-5 cursor-grab text-gray-500" />
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

      <ExerciseItemContent
        exercise={exercise}
        index={index}
        onExerciseChange={onExerciseChange}
      />

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
}
