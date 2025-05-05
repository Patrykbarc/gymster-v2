import {
  type DropResult,
  DragDropContext,
  Draggable,
  Droppable
} from '@hello-pangea/dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'

export default function NewWorkoutPlanPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
          <CardDescription>
            Fill in the details and add exercises to your plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkoutPlanForm />
        </CardContent>
      </Card>
    </div>
  )
}

const availableExercises = [
  { id: '1', name: 'Bench Press', muscleCategory: 'Chest' },
  { id: '2', name: 'Squat', muscleCategory: 'Legs' },
  { id: '3', name: 'Deadlift', muscleCategory: 'Back' },
  { id: '4', name: 'Pull-up', muscleCategory: 'Back' },
  { id: '5', name: 'Shoulder Press', muscleCategory: 'Shoulders' },
  { id: '6', name: 'Bicep Curl', muscleCategory: 'Arms' },
  { id: '7', name: 'Tricep Extension', muscleCategory: 'Arms' },
  { id: '8', name: 'Leg Press', muscleCategory: 'Legs' }
]

type Exercise = {
  id: string
  exerciseId: string
  sets: number
  reps: number
}

type WorkoutPlanFormProps = {
  plan?: {
    name?: string
    description?: string
    exercises?: Exercise[]
  } | null
}

function WorkoutPlanForm({ plan = null }: WorkoutPlanFormProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: plan?.name || '',
    description: plan?.description || ''
  })
  const [exercises, setExercises] = useState<Exercise[]>(plan?.exercises || [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddExercise = () => {
    setExercises([
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
    setExercises(updatedExercises)
  }

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(exercises)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setExercises(items)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving workout plan:', { ...formData, exercises })

    navigate('/workout-plans')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Plan Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Upper Body Split"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the workout plan..."
          rows={3}
        />
      </div>

      <div className="space-y-4">
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
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {exercises.map((exercise, index) => (
                  <Draggable
                    key={exercise.id}
                    draggableId={exercise.id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="border"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-move"
                            >
                              <GripVertical className="text-muted-foreground h-5 w-5" />
                            </div>

                            <div className="grid flex-1 gap-4 md:grid-cols-4">
                              <div className="md:col-span-2">
                                <Label
                                  htmlFor={`exercise-${index}`}
                                  className="sr-only"
                                >
                                  Exercise
                                </Label>
                                <Select
                                  value={exercise.exerciseId}
                                  onValueChange={(value) =>
                                    handleExerciseChange(
                                      index,
                                      'exerciseId',
                                      value
                                    )
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
                                <Label
                                  htmlFor={`sets-${index}`}
                                  className="sr-only"
                                >
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
                                <Label
                                  htmlFor={`reps-${index}`}
                                  className="sr-only"
                                >
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
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {exercises.length === 0 && (
                  <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground text-sm">
                      No exercises added. Click "Add Exercise" to start building
                      your plan.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit">{plan ? 'Update Plan' : 'Create Plan'}</Button>
      </div>
    </form>
  )
}
