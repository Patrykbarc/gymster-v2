import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { ExerciseList } from '~/components/shared/exercise-list/exercise-list'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { workoutsService } from '~/services/api/workouts/workoutsService'
import type { Database } from '~/types/database.types'

type Workout = Database['public']['Tables']['workouts']['Row']
type Exercise = Database['public']['Tables']['workout_exercises']['Row']
type WorkoutPlanFormProps = {
  userId: string
  plan?: (Workout & { workout_exercises: Exercise[] }) | null
}

const schema = z.object({
  user_id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      id: z.string(),
      exercise_id: z.string().nullable(),
      sets: z.number().nullable(),
      reps: z.number().nullable(),
      weight: z.number().nullable(),
      order_position: z.number(),
      workout_id: z.string().nullable(),
      user_id: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      notes: z.string().nullable()
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

  const [exercises, setExercises] = useState<Exercise[]>(
    plan?.workout_exercises || []
  )

  useEffect(() => {
    setValue('exercises', exercises)
  }, [exercises, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      const workoutData: Database['public']['Tables']['workouts']['Insert'] = {
        name: data.name,
        description: data.description,
        user_id: data.user_id
      }

      const workout = plan?.id
        ? await workoutsService.updateWorkout(plan.id, workoutData)
        : await workoutsService.insertWorkout(workoutData)

      if (workout && exercises.length > 0) {
        const workoutExercises = exercises.map((exercise, index) => ({
          workout_id: workout.id,
          exercise_id: exercise.exercise_id,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          order_position: index + 1
        }))

        plan?.id
          ? await workoutsService.updateWorkoutExercises(
              workoutExercises,
              data.user_id
            )
          : await workoutsService.insertWorkoutExercises(
              workoutExercises,
              data.user_id
            )
      }

      navigate('/dashboard/workouts')
    } catch (error) {
      console.error('Error saving workout:', error)
    }
  }

  const onError = async (errors: any) => {
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
