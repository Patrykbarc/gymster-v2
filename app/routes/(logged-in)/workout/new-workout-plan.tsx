import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { WorkoutPlanForm } from '~/components/views/(logged-in)/workout/workout-plan-form'

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
