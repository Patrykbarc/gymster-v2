import {
  type DropResult,
  DragDropContext,
  Draggable,
  Droppable
} from '@hello-pangea/dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

export type Exercise = {
  id: string
  exerciseId: string
  sets: number
  reps: number
}

type AvailableExercise = {
  id: string
  name: string
  muscleCategory: string
}

type ExerciseListProps = {
  exercises: Exercise[]
  availableExercises: AvailableExercise[]
  onExercisesChange: (exercises: Exercise[]) => void
  draggable?: boolean
  className?: string
}

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

  const renderExercise = (exercise: Exercise, index: number) => {
    const exerciseContent = (
      <div className="flex items-center gap-2">
        {draggable && (
          <div className="cursor-move">
            <GripVertical className="text-muted-foreground h-5 w-5" />
          </div>
        )}

        <div className="grid flex-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Label htmlFor={`exercise-${index}`} className="sr-only">
              Exercise
            </Label>
            <Select
              value={exercise.exerciseId}
              onValueChange={(value) =>
                handleExerciseChange(index, 'exerciseId', value)
              }
            >
              <SelectTrigger id={`exercise-${index}`}>
                <SelectValue placeholder="Select exercise" />
              </SelectTrigger>
              <SelectContent>
                {availableExercises.map((ex) => (
                  <SelectItem key={ex.id} value={ex.id}>
                    {ex.name} ({ex.muscleCategory})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`sets-${index}`} className="sr-only">
              Sets
            </Label>
            <Input
              id={`sets-${index}`}
              type="number"
              min="1"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) =>
                handleExerciseChange(
                  index,
                  'sets',
                  Number.parseInt(e.target.value)
                )
              }
            />
          </div>

          <div>
            <Label htmlFor={`reps-${index}`} className="sr-only">
              Reps
            </Label>
            <Input
              id={`reps-${index}`}
              type="number"
              min="1"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) =>
                handleExerciseChange(
                  index,
                  'reps',
                  Number.parseInt(e.target.value)
                )
              }
            />
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleRemoveExercise(index)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    )

    if (draggable) {
      return (
        <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
          {(provided) => (
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="border"
            >
              <CardContent className="p-4">{exerciseContent}</CardContent>
            </Card>
          )}
        </Draggable>
      )
    }

    return (
      <div key={exercise.id} className="rounded-md border p-3">
        {exerciseContent}
      </div>
    )
  }

  const content = (
    <div className="space-y-3">
      {exercises.map((exercise, index) => renderExercise(exercise, index))}
      {exercises.length === 0 && (
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground text-sm">
            No exercises added. Click "Add Exercise" to start building your
            plan.
          </p>
        </div>
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
                {content}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        content
      )}
    </div>
  )
}
