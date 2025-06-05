import { GripVertical, Trash2 } from 'lucide-react'
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
import type { loader } from '~/routes/(logged-in)/workout/new-workout-plan'
import type { ExerciseItemContentProps } from '../_types/types'
import { SetsInputWrapper } from '../sets-input-wrapper/sets-input-wrapper'

export function ExerciseItemContent({
  exercise,
  index,
  onExerciseChange,
  onRemove,
  draggable
}: ExerciseItemContentProps) {
  const { exercises } = useLoaderData<typeof loader>()

  return (
    <div className="flex items-center gap-2">
      {draggable && (
        <div className="cursor-move">
          <GripVertical className="text-muted-foreground hidden h-5 w-5 md:block" />
        </div>
      )}

      <div className="grid flex-1 gap-4 md:grid-cols-5">
        <SetsInputWrapper className="md:col-span-2">
          <Label htmlFor={`exercise-${index}`}>Exercise</Label>
          <Select
            value={exercise.exercise_id}
            onValueChange={(value) =>
              onExerciseChange(index, 'exercise_id', value)
            }
          >
            <SelectTrigger className="w-full md:w-fit" id={`exercise-${index}`}>
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
        </SetsInputWrapper>

        <SetsInputWrapper>
          <Label htmlFor={`sets-${index}`}>Sets</Label>
          <Input
            id={`sets-${index}`}
            type="number"
            min="1"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(e) =>
              onExerciseChange(index, 'sets', Number.parseInt(e.target.value))
            }
          />
        </SetsInputWrapper>

        <SetsInputWrapper>
          <Label htmlFor={`reps-${index}`}>Reps</Label>
          <Input
            id={`reps-${index}`}
            type="number"
            min="1"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(e) =>
              onExerciseChange(index, 'reps', Number.parseInt(e.target.value))
            }
          />
        </SetsInputWrapper>

        <SetsInputWrapper>
          <Label htmlFor={`weight-${index}`}>Weight</Label>
          <Input
            id={`weight-${index}`}
            type="number"
            min="1"
            placeholder="Weight"
            value={exercise.weight}
            onChange={(e) =>
              onExerciseChange(index, 'weight', Number.parseInt(e.target.value))
            }
          />
        </SetsInputWrapper>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="mt-3"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  )
}
