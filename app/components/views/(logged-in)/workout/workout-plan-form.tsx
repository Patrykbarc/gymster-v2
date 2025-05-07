import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ExerciseList, type Exercise } from '~/components/shared/exercise-list/exercise-list'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'

type WorkoutPlanFormProps = {
  plan?: {
    name?: string
    description?: string
    exercises?: Exercise[]
  } | null
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

export function WorkoutPlanForm({ plan = null }: WorkoutPlanFormProps) {
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

      <ExerciseList
        exercises={exercises}
        availableExercises={availableExercises}
        onExercisesChange={setExercises}
        draggable
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit">{plan ? 'Update Plan' : 'Create Plan'}</Button>
      </div>
    </form>
  )
}
