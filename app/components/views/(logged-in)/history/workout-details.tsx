import { format } from 'date-fns'
import { Clock, Dumbbell } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'

type Workout = {
  id: string
  name: string
  date: Date
  duration: number
  exerciseCount: number
  exercises: {
    name: string
    sets: {
      reps: number
      weight: number
      completed: boolean
    }[]
  }[]
}

export function WorkoutDetails({ workout }: { workout: Workout }) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground h-5 w-5" />
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-lg">{formatDuration(workout.duration)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dumbbell className="text-muted-foreground h-5 w-5" />
          <div>
            <p className="text-sm font-medium">Exercises</p>
            <p className="text-lg">{workout.exerciseCount}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Date</p>
          <p className="text-lg">{format(workout.date, 'MMMM d, yyyy')}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Exercise Details</h3>

        {workout.exercises.map((exercise, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium">{exercise.name}</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Set</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Reps</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercise.sets.map((set, setIndex) => (
                  <TableRow key={setIndex}>
                    <TableCell>{setIndex + 1}</TableCell>
                    <TableCell>
                      {set.weight > 0 ? `${set.weight} lbs` : 'Bodyweight'}
                    </TableCell>
                    <TableCell>{set.reps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  )
}
