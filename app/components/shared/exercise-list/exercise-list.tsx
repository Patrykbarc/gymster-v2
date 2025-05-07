import { type DropResult, DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import type { Exercise, ExerciseListProps } from './_types/types'
import { EmptyState } from './empty-state/empty-state'
import { ExerciseItem } from './exercise-item/exercise-item'

export function ExerciseList({
  exercises,
  availableExercises,
  onExercisesChange,
  draggable = false,
  className = ''
}: ExerciseListProps) {
  const handleAddExercise = () => {
    onExercisesChange([
      ...exercises,
      { id: Date.now().toString(), exerciseId: '', sets: 3, reps: 10 }
    ])
  }

  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value as never
    onExercisesChange(updatedExercises)
  }

  const handleRemoveExercise = (index: number) => {
    onExercisesChange(exercises.filter((_, i) => i !== index))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(exercises)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onExercisesChange(items)
  }

  const renderExercises = () => (
    <div>
      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          index={index}
          availableExercises={availableExercises}
          onExerciseChange={handleExerciseChange}
          onRemove={handleRemoveExercise}
          draggable={draggable}
        />
      ))}
      {exercises.length === 0 && <EmptyState />}
    </div>
  )

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label>Exercises</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddExercise}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      {draggable ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="exercises">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {renderExercises()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        renderExercises()
      )}
    </div>
  )
}
