import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { FormCardWrapper } from '~/components/shared/form-card-wrapper/form-card-wrapper'
import { WorkoutPlanForm } from '~/components/views/(logged-in)/workout/workout-plan-form/workout-plan-form'
import { authService } from '~/services/api/auth/authService'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import { workoutsService } from '~/services/api/workouts/workoutsService'

export async function loader({ request }: LoaderFunctionArgs) {
  const workouts = await workoutsService.getWorkouts(request)
  const exercises = await exercisesService.getExercises(request)
  const { session } = await authService.getUser(request)

  if (!session?.user_id) {
    return redirect('/login')
  }

  return { workouts, exercises, userId: session?.user_id }
}

export default function NewWorkoutPlanPage() {
  const { userId } = useLoaderData<typeof loader>()

  return (
    <FormCardWrapper
      title="Plan Details"
      description="Fill in the details and add exercises to your plan"
    >
      <WorkoutPlanForm userId={userId} />
    </FormCardWrapper>
  )
}
