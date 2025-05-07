import { Search } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { WorkoutPlanList } from '~/components/views/(logged-in)/workout/workout-plan-list'

export default function WorkoutPlansPage() {
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
