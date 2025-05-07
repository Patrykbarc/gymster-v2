import { GripVertical, Trash2 } from 'lucide-react'
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
import { SetsInputWrapper } from '../sets-input-wrapper/sets-input-wrapper'
import type { ExerciseItemContentProps } from '../_types/types'


export function ExerciseItemContent({
  exercise,
  index,
  availableExercises,
  onExerciseChange,
  onRemove,
  draggable
}: ExerciseItemContentProps) {
  return (
    <div className="flex items-center gap-2">
      {draggable && (
        <div className="cursor-move">
          <GripVertical className="text-muted-foreground hidden h-5 w-5 md:block" />
        </div>
      )}

      <div className="grid flex-1 gap-4 md:grid-cols-4">
        <SetsInputWrapper className="md:col-span-2">
          <Label htmlFor={`exercise-${index}`}>Exercise</Label>
          <Select
            value={exercise.exerciseId}
            onValueChange={(value) =>
              onExerciseChange(index, 'exerciseId', value)
            }
          >
            <SelectTrigger className="w-full md:w-fit" id={`exercise-${index}`}>
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
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  )
}
