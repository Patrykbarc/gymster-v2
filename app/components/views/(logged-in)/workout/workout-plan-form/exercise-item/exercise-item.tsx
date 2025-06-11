import { Draggable } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import type { WorkoutExerciseWithSets } from '~/types/workouts.types'
import { type Field, type Value } from '~/types/workouts.types'
import { useHandleSet } from '../../_hooks/useHandleSet'
import {
  AddSetButton,
  RemoveExercise
} from './exercise-handlers/exercise-handlers'
import { ExerciseItemContent } from './exercise-item-content/exercise-item-content'
import { ExerciseSelect } from './exercise-select/exercise-select'

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
  const { handleChange, handleAddSet } = useHandleSet({
    exercise,
    index,
    onExerciseChange
  })

  return (
    <DraggableWrapper exercise={exercise} index={index}>
      <div className="flex flex-col justify-between gap-4 rounded-lg border p-4">
        <div className="flex w-full items-center gap-2">
          <GripVertical className="size-5 cursor-grab text-gray-500" />
          <ExerciseSelect exercise={exercise} handleChange={handleChange} />
          <RemoveExercise onRemove={() => onRemove(index)} />
        </div>

        <ExerciseItemContent
          exercise={exercise}
          index={index}
          onExerciseChange={onExerciseChange}
        />

        <AddSetButton onAdd={handleAddSet} />
      </div>
    </DraggableWrapper>
  )
}

type DraggableWrapperProps = {
  children: React.ReactNode
  exercise: WorkoutExerciseWithSets
  index: number
}

function DraggableWrapper({
  children,
  exercise,
  index
}: DraggableWrapperProps) {
  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided) => (
        <div
          className="z-50 mb-3 bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}
