import { Draggable } from '@hello-pangea/dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
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
import { cn } from '~/lib/utils'
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
      <div className="flex w-full items-center gap-2">
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

        <RemoveExercise
          onRemove={onRemove}
          index={index}
          className="lg:hidden"
        />
      </div>

      <div className="space-y-4">
        {exercise.exercise_sets?.map((set, setIndex) => (
          <div key={setIndex} className="grid grid-cols-3 gap-2 border-b pb-4">
            <div className="col-span-1 space-y-2">
              <Label>Set {set.order_position}</Label>
            </div>
            <div className="col-span-1 space-y-2">
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
            <div className="col-span-1 space-y-2">
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

        <RemoveExercise
          onRemove={onRemove}
          index={index}
          className="mt-2 hidden lg:block"
        />
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
      className={cn(className)}
      onClick={() => onRemove(index)}
    >
      <Trash2 className="size-4" />
    </Button>
  )
}
