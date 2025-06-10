import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { FormCardWrapper } from '~/components/shared/form-card-wrapper/form-card-wrapper'
import { WorkoutPlanForm } from '~/components/views/(logged-in)/workout/workout-plan-form/workout-plan-form'
import { authService } from '~/services/api/auth/authService'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import { workoutsService } from '~/services/api/workouts/workoutsService'
import { getLastUrlSegment } from '~/utils/getLastUrlSegment'

export async function loader({ request }: LoaderFunctionArgs) {
  const exercises = await exercisesService.getExercises(request) // Neccesary for the edit exercise list

  const url = new URL(request.url)
  const workoutId = getLastUrlSegment(url.pathname)

  if (!workoutId) {
    return redirect('/workouts')
  }

  const workout = await workoutsService
    .getWorkoutById(request, workoutId)
    .then((workout) => workout?.[0] || null)
  const { session } = await authService.getUser(request)

  if (!session?.user_id) {
    return redirect('/login')
  }

  return { workout, exercises, userId: session?.user_id }
}

export default function EditWorkoutPlanPage() {
  const { workout, userId } = useLoaderData<typeof loader>()

  return (
    <FormCardWrapper
      title="Plan Details"
      description="Fill in the details and add exercises to your plan"
    >
      <WorkoutPlanForm userId={userId} plan={workout} />
    </FormCardWrapper>
  )
}
