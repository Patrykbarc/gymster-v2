import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { NoDataFound } from '~/components/shared/no-data-found/no-data-found'
import { Card, CardContent } from '~/components/ui/card'
import { ExerciseListTable } from '~/components/views/(logged-in)/exercises/exercise-list-table'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export async function loader({ request }: LoaderFunctionArgs) {
  const exercises = await exercisesService.getExercises(request)

  return { exercises, request }
}

export default function Exercises() {
  const { exercises } = useLoaderData<typeof loader>()

  if (exercises?.length === 0) {
    return (
      <NoDataFound
        message="No exercises found."
        link="new"
        linkText="Create your first exercise."
      />
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <ExerciseListTable />
        </CardContent>
      </Card>
    </div>
  )
}
