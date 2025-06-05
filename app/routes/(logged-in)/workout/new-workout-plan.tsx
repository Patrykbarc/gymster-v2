import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { WorkoutPlanForm } from '~/components/views/(logged-in)/workout/workout-plan-form/workout-plan-form'
import { authService } from '~/services/api/auth/authService'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export async function loader({ request }: LoaderFunctionArgs) {
  const exercises = await exercisesService.getExercises(request)
  const { session } = await authService.getUser(request)

  if (!session?.user_id) {
    return redirect('/login')
  }

  return { exercises, userId: session?.user_id }
}

export default function NewWorkoutPlanPage() {
  const { userId } = useLoaderData<typeof loader>()

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
          <WorkoutPlanForm userId={userId} />
        </CardContent>
      </Card>
    </div>
  )
}
