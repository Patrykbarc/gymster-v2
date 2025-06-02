import { Search } from 'lucide-react'
import { useLoaderData } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ExerciseListTable } from '~/components/views/(logged-in)/exercises/exercise-list-table'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export async function loader() {
  const exercises = await exercisesService.getExercises()
  return { exercises }
}

export default function Exercises() {
  const { exercises } = useLoaderData<typeof loader>()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Exercise Library</CardTitle>
          <CardDescription>
            Browse, search, and manage your exercises
          </CardDescription>
          <div className="relative mt-2">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search exercises..."
              className="w-full pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ExerciseListTable exerciseList={exercises} />
        </CardContent>
      </Card>
    </div>
  )
}
