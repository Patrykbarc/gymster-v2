import type { LoaderFunctionArgs } from 'react-router'
import { redirect, useLoaderData } from 'react-router'
import { FormCardWrapper } from '~/components/shared/form-card-wrapper/form-card-wrapper'
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
    <FormCardWrapper
      title="Exercise Details"
      description="Fill in the details for your new exercise"
    >
      <ExerciseForm userId={user_id} />
    </FormCardWrapper>
  )
}
