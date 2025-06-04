import type { LoaderFunctionArgs } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { WorkoutPlanForm } from '~/components/views/(logged-in)/workout/workout-plan-form/workout-plan-form'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export async function loader({ request }: LoaderFunctionArgs) {
  const exercises = await exercisesService.getExercises(request) // for add exercises to the workout plan

  return { exercises }
}

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
