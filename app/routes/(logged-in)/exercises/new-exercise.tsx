import { redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { ExerciseForm } from '~/components/views/(logged-in)/exercises/exercise-form/exercise-form'
import { authService } from '~/services/api/auth/authService'

export async function loader({ request }: LoaderFunctionArgs) {
  const { user_id } = await authService.getUser(request)

  if (!user_id) {
    return redirect('/login')
  }

  return { user_id }
}

export default function NewExercisePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Exercise</h1>
        <p className="text-muted-foreground">
          Create a new exercise for your workout plans
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exercise Details</CardTitle>
          <CardDescription>
            Fill in the details for your new exercise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExerciseForm />
        </CardContent>
      </Card>
    </div>
  )
}
