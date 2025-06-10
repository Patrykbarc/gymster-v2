import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Plus } from 'lucide-react'
import { NoDataFound } from '~/components/shared/no-data-found/no-data-found'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import type { WorkoutExerciseWithSets } from '~/types/workouts.types'
import { useExerciseList } from '../../_hooks/useExerciseList'
import { ExerciseItem } from '../exercise-item/exercise-item'

type ExerciseListProps = {
  exercises: WorkoutExerciseWithSets[]
  onExercisesChange: (exercises: WorkoutExerciseWithSets[]) => void
  className?: string
  workoutId?: string | null
}

export function ExerciseList({
  exercises,
  onExercisesChange,
  className,
  workoutId = null
}: ExerciseListProps) {
  const {
    sortedExercises,
    handleAddExercise,
    handleExerciseChange,
    handleRemoveExercise,
    handleDragEnd
  } = useExerciseList({
    exercises,
    onExercisesChange,
    workoutId
  })

  return (
    <div className={cn('space-y-4', className)}>
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="exercises">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sortedExercises.map((exercise, index) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  onExerciseChange={handleExerciseChange}
                  onRemove={handleRemoveExercise}
                />
              ))}
              {sortedExercises.length === 0 && (
                <NoDataFound
                  message={
                    <>
                      No exercises added. Click &quot;Add Exercise&quot; to
                      start building your plan.
                    </>
                  }
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
