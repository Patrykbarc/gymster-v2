import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import type { Exercise } from '~/components/shared/exercise-list/_types/types'
import { ExerciseList } from '~/components/shared/exercise-list/exercise-list'
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

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  exercises: z.array(
    z.object({
      id: z.string(),
      exerciseId: z.string(),
      sets: z.number(),
      reps: z.number()
    })
  )
})

type FormData = z.infer<typeof schema>

export function WorkoutPlanForm({ plan = null }: WorkoutPlanFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: plan?.name || '',
      description: plan?.description || '',
      exercises: plan?.exercises || []
    }
  })
  const [exercises, setExercises] = useState<Exercise[]>(plan?.exercises || [])

  const onSubmit = (data: FormData) => {
    console.log('Saving workout plan:', data)

    navigate('/dashboard/workouts')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Plan Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Upper Body Split"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
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
