import { useParams } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { StartFromPlan } from '~/components/views/(logged-in)/start-workout/start-from-plan'

export default function StartWorkoutPage() {
  const searchParams = useParams()
  const planId = searchParams.planId

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Workout</CardTitle>
          <CardDescription>
            Choose how you want to start your workout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StartFromPlan initialPlanId={planId} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
