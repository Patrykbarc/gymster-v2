import { type DropResult, DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import type { Database } from '~/types/database.types'
import { NoDataFound } from '../no-data-found/no-data-found'
import { ExerciseItem } from './exercise-item'

type Exercise = Database['public']['Tables']['workout_exercises']['Row']

type ExerciseListProps = {
  exercises: Exercise[]
  onExercisesChange: (exercises: Exercise[]) => void
  draggable?: boolean
  className?: string
}

export function ExerciseList({
  exercises,
  onExercisesChange,
  draggable = false,
  className
}: ExerciseListProps) {
  const handleAddExercise = () => {
    const now = new Date().toISOString()
    onExercisesChange([
      ...exercises,
      {
        id: Date.now().toString(),
        exercise_id: null,
        sets: 3,
        reps: 10,
        weight: 100,
        notes: null,
        order_position: exercises.length + 1,
        workout_id: null,
        user_id: null,
        created_at: now,
        updated_at: now
      }
    ])
  }

  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string | number | null
  ) => {
    const updatedExercises = [...exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
      updated_at: new Date().toISOString()
    }
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

    // Update order_position for all items
    const updatedItems = items.map((item, index) => ({
      ...item,
      order_position: index + 1,
      updated_at: new Date().toISOString()
    }))

    onExercisesChange(updatedItems)
  }

  const renderExercises = () => (
    <div>
      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          index={index}
          onExerciseChange={handleExerciseChange}
          onRemove={handleRemoveExercise}
          draggable={draggable}
        />
      ))}
      {exercises.length === 0 && (
        <NoDataFound
          message={
            <>
              "No exercises added. Click &quot;Add Exercise&quot; to start
              building your plan."
            </>
          }
        />
      )}
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
