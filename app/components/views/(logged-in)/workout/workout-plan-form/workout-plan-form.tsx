import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { DraftAlertDialog } from '~/components/shared/draft-alert-dialog/draft-alert-dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { ExerciseList } from '~/components/views/(logged-in)/workout/workout-plan-form/exercise-list/exercise-list'
import { useLocalStorage } from '~/hooks/useLocalStorage'
import { workoutsService } from '~/services/api/workouts/workoutsService'
import type {
  WorkoutExerciseWithSets,
  WorkoutWithExercises
} from '~/types/workouts.types'
import { schema, type FormData } from '../_schema/schema'
import { ExercisesErrors } from '../exercises-errors/exercises-errors'

export function WorkoutPlanForm({
  plan = null,
  userId
}: {
  userId: string
  plan?: WorkoutWithExercises | null
}) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_id: userId,
      name: plan?.name || '',
      description: plan?.description || '',
      exercises: plan?.workout_exercises || []
    }
  })

  const storageKey = plan?.id ? `workout-draft-${plan.id}` : 'workout-draft'

  const [workoutDraft, setWorkoutDraft] = useLocalStorage<FormData | null>(
    storageKey,
    null
  )

  const initialExercises: WorkoutExerciseWithSets[] = plan
    ? plan.workout_exercises.map((exercise) => ({
        ...exercise,
        workout_id: plan.id,
        exercise_sets: exercise.exercise_sets || []
      }))
    : []

  const initialDraftRef = useRef<FormData>({
    user_id: userId,
    name: plan?.name || '',
    description: plan?.description || '',
    exercises: initialExercises
  })

  const [exercises, setExercises] =
    useState<WorkoutExerciseWithSets[]>(initialExercises)

  useEffect(() => {
    setValue('exercises', exercises)
  }, [exercises, setValue])

  const watchedName = watch('name')
  const watchedDescription = watch('description')

  const [isDraftDialogOpen, setIsDraftDialogOpen] = useState(false)
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false)

  useEffect(() => {
    if (!isInitialCheckDone || isDraftDialogOpen) {
      return
    }

    const currentDraft: FormData = {
      user_id: userId,
      name: watchedName,
      description: watchedDescription,
      exercises
    }

    setWorkoutDraft(currentDraft)
  }, [
    watchedName,
    watchedDescription,
    exercises,
    setWorkoutDraft,
    userId,
    isDraftDialogOpen,
    isInitialCheckDone
  ])

  useEffect(() => {
    if (isInitialCheckDone) return

    if (
      workoutDraft &&
      (workoutDraft.name ||
        workoutDraft.description ||
        workoutDraft.exercises.length > 0)
    ) {
      setIsDraftDialogOpen(true)
    } else {
      setIsInitialCheckDone(true)
    }
  }, [workoutDraft, isInitialCheckDone])

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
      setWorkoutDraft(null)
    } catch (error) {
      console.error('Error saving workout:', error)
    }
  }

  return (
    <fieldset disabled={isSubmitting}>
      <DraftAlertDialog
        texts={{
          title: 'Unfinished draft found',
          description:
            "It looks like you have a saved workout plan draft. Would you like to continue editing? Discarding this draft can't be undone."
        }}
        isOpen={isDraftDialogOpen}
        onContinue={() => {
          if (workoutDraft) {
            setValue('name', workoutDraft.name)
            setValue('description', workoutDraft.description ?? '')
            setExercises(workoutDraft.exercises as WorkoutExerciseWithSets[])
            initialDraftRef.current = workoutDraft
          }
          setIsDraftDialogOpen(false)
          setIsInitialCheckDone(true)
        }}
        onDiscard={() => {
          setWorkoutDraft(null)
          setIsDraftDialogOpen(false)
          setIsInitialCheckDone(true)
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          workoutId={plan?.id || null}
        />

        <div className="flex justify-between">
          <ExercisesErrors errors={errors} />
          <div className="flex w-full justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {plan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </div>
      </form>
    </fieldset>
  )
}
