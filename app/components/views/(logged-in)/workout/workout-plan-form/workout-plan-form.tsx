import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { ExerciseList } from '~/components/views/(logged-in)/workout/workout-plan-form/exercise-list/exercise-list'
import { workoutsService } from '~/services/api/workouts/workoutsService'
import type {
  WorkoutExerciseWithSets,
  WorkoutWithExercises
} from '~/types/workouts.types'

type WorkoutPlanFormProps = {
  userId: string
  plan?: WorkoutWithExercises | null
}

const exerciseSetSchema = z.object({
  id: z.string().optional(),
  reps: z.number().nullable(),
  weight: z.number().nullable(),
  notes: z.string().nullable(),
  order_position: z.number(),
  workout_exercise_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

const schema = z.object({
  user_id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      id: z.string(),
      exercise_id: z.string().nullable(),
      order_position: z.number(),
      workout_id: z.string().nullable(),
      user_id: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      notes: z.string().nullable(),
      exercise_sets: z.array(exerciseSetSchema)
    })
  )
})

type FormData = z.infer<typeof schema>

export function WorkoutPlanForm({ plan = null, userId }: WorkoutPlanFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_id: userId,
      name: plan?.name || '',
      description: plan?.description || '',
      exercises: plan?.workout_exercises || []
    }
  })

  const [exercises, setExercises] = useState<WorkoutExerciseWithSets[]>(
    plan?.workout_exercises?.map((exercise) => ({
      ...exercise,
      workout_id: plan.id,
      exercise_sets: exercise.exercise_sets || []
    })) || []
  )

  useEffect(() => {
    setValue('exercises', exercises)
  }, [exercises, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      const workoutData = {
        name: data.name,
        description: data.description,
        user_id: data.user_id
      }

      const workout = plan?.id
        ? await workoutsService.updateWorkout(plan.id, workoutData)
        : await workoutsService.insertWorkout(workoutData)

      if (!workout) {
        throw new Error('Failed to save workout')
      }

      if (exercises.length > 0) {
        const workoutExercises = exercises.map((exercise, index) => ({
          ...exercise,
          workout_id: workout.id,
          order_position: index + 1
        }))

        const savedExercises = await workoutsService.updateWorkoutExercises(
          workoutExercises,
          data.user_id
        )

        if (!savedExercises) {
          throw new Error('Failed to save exercises')
        }
      }

      navigate('/dashboard/workouts')
    } catch (error) {
      console.error('Error saving workout:', error)
    }
  }

  const onError = (errors: any) => {
    console.error('Form validation errors:', errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Plan Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Upper Body Split"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Describe the workout plan..."
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <ExerciseList
        exercises={exercises}
        onExercisesChange={setExercises}
        draggable
        workoutId={plan?.id || null}
      />
      {errors.exercises && (
        <p className="text-sm text-red-500">{errors.exercises.message}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit">{plan ? 'Update Plan' : 'Create Plan'}</Button>
      </div>
    </form>
  )
}
