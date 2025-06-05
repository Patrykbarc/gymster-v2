import { Draggable } from '@hello-pangea/dnd'
import { GripVertical, Trash2 } from 'lucide-react'
import { useLoaderData } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input as InputProps } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import type { loader } from '~/routes/(logged-in)/workout/edit-workout-plan'
import type { Database } from '~/types/database.types'

type Exercise = Database['public']['Tables']['workout_exercises']['Row']

type ExerciseItemProps = {
  exercise: Exercise
  index: number
  onExerciseChange: (
    index: number,
    field: keyof Exercise,
    value: string | number | null
  ) => void
  onRemove: (index: number) => void
  draggable?: boolean
}

type InputProps = {
  label: string
  value: keyof Exercise
  placeholder: string
}

const inputs: InputProps[] = [
  {
    label: 'Exercise',
    value: 'exercise_id',
    placeholder: 'Select exercise'
  },
  {
    label: 'Sets',
    value: 'sets',
    placeholder: 'Sets'
  },
  {
    label: 'Reps',
    value: 'reps',
    placeholder: 'Reps'
  },
  {
    label: 'Weight',
    value: 'weight',
    placeholder: 'Weight'
  }
]

export function ExerciseItem({
  exercise,
  index,
  onExerciseChange,
  onRemove,
  draggable = false
}: ExerciseItemProps) {
  const { exercises } = useLoaderData<typeof loader>()
  const handleChange = (
    field: keyof Exercise,
    value: string | number | null
  ) => {
    onExerciseChange(index, field, value)
  }

  const renderContent = () => (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      {draggable && (
        <GripVertical className="h-5 w-5 cursor-grab text-gray-500" />
      )}
      <Select
        value={exercise.exercise_id || ''}
        onValueChange={(value) => handleChange('exercise_id', value)}
      >
        <SelectTrigger className="w-[300px]">
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

      {inputs.map((input) => (
        <InputProps
          key={input.value}
          type="number"
          value={exercise[input.value] || 0}
          onChange={(e) => handleChange(input.value, Number(e.target.value))}
          placeholder={input.placeholder}
          className="w-20"
        />
      ))}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
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
