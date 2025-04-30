import { formatDistanceToNow } from 'date-fns'
import { Badge } from '~/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'

const recentWorkouts = [
  {
    id: '1',
    name: 'Upper Body',
    date: new Date(2023, 3, 28),
    duration: '45 min',
    exercises: 6
  },
  {
    id: '2',
    name: 'Leg Day',
    date: new Date(2023, 3, 26),
    duration: '60 min',
    exercises: 5
  },
  {
    id: '3',
    name: 'Full Body',
    date: new Date(2023, 3, 24),
    duration: '75 min',
    exercises: 8
  },
  {
    id: '4',
    name: 'Core Focus',
    date: new Date(2023, 3, 22),
    duration: '30 min',
    exercises: 4
  },
  {
    id: '5',
    name: 'Upper Body',
    date: new Date(2023, 3, 20),
    duration: '50 min',
    exercises: 6
  }
]

export function RecentWorkouts() {
  return (
    <Card className="col-span-1 w-full">
      <CardHeader>
        <CardTitle>Recent Workouts</CardTitle>
        <CardDescription>Your last 5 workout sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workout</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Exercises</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentWorkouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell className="font-medium">{workout.name}</TableCell>
                <TableCell>
                  {formatDistanceToNow(workout.date, { addSuffix: true })}
                </TableCell>
                <TableCell>{workout.duration}</TableCell>
                <TableCell>
                  <Badge variant="outline">{workout.exercises}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
