import { Search } from 'lucide-react'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { NoDataFound } from '~/components/shared/no-data-found/no-data-found'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { WorkoutPlanList } from '~/components/views/(logged-in)/workout/workout-plan-list'
import { workoutsService } from '~/services/api/workouts/workoutsService'

export async function loader({ request }: LoaderFunctionArgs) {
  const workouts = await workoutsService.getWorkouts(request)

  return { workouts }
}

export default function WorkoutsPage() {
  const { workouts } = useLoaderData<typeof loader>()

  if (workouts?.length === 0) {
    return (
      <NoDataFound
        message="No workout plans found."
        link={{
          to: '/dashboard/workouts/new',
          text: 'Create your first workout plan.'
        }}
      />
    )
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Workout Plans</CardTitle>
            <CardDescription>
              Browse and manage your saved workout plans
            </CardDescription>
            <div className="relative mt-2">
              <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search plans..."
                className="w-full pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <WorkoutPlanList />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
