import type { LoaderFunctionArgs } from 'react-router'
import { redirect, useLoaderData } from 'react-router'
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
  const {
    session: { user_id }
  } = await authService.getUser(request)

  if (!user_id) {
    return redirect('/login')
  }

  return { user_id }
}

export default function NewExercisePage() {
  const { user_id } = useLoaderData<typeof loader>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Details</CardTitle>
        <CardDescription>
          Fill in the details for your new exercise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExerciseForm userId={user_id} />
      </CardContent>
    </Card>
  )
}
