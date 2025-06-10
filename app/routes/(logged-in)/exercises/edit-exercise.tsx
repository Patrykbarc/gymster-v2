import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { FormCardWrapper } from '~/components/shared/form-card-wrapper/form-card-wrapper'
import { ExerciseForm } from '~/components/views/(logged-in)/exercises/exercise-form/exercise-form'
import { authService } from '~/services/api/auth/authService'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import { getLastUrlSegment } from '~/utils/getLastUrlSegment'

export async function loader({ request }: LoaderFunctionArgs) {
  const {
    session: { user_id }
  } = await authService.getUser(request)

  const url = new URL(request.url)
  const exerciseId = getLastUrlSegment(url.pathname)

  if (!exerciseId || !user_id) {
    return redirect('/exercises')
  }

  const exercise = await exercisesService.getExercise(request, exerciseId)

  return { exercise: exercise?.[0], user_id }
}

export default function EditExercise() {
  const { exercise, user_id } = useLoaderData<typeof loader>()

  return (
    <FormCardWrapper
      title="Exercise Details"
      description="Fill in the details and add exercises to your plan"
    >
      <ExerciseForm exercise={exercise} userId={user_id} />
    </FormCardWrapper>
  )
}
