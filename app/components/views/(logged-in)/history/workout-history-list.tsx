import { format, isAfter, subDays, subMonths } from 'date-fns'
import { ChevronDown, ChevronUp, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { workoutHistory } from './_mock/workout-history'
import { WorkoutDetails } from './workout-details'

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

export function WorkoutHistoryList({
  dateRange,
  searchQuery
}: {
  dateRange: string
  searchQuery: string
}) {
  const [filteredWorkouts, setFilteredWorkouts] = useState(workoutHistory)
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    let filtered = [...workoutHistory]

    if (dateRange !== 'all') {
      const now = new Date()
      let cutoffDate

      switch (dateRange) {
        case 'week':
          cutoffDate = subDays(now, 7)
          break
        case 'month':
          cutoffDate = subMonths(now, 1)
          break
        case '3months':
          cutoffDate = subMonths(now, 3)
          break
        case 'year':
          cutoffDate = subMonths(now, 12)
          break
        default:
          cutoffDate = new Date(0)
      }

      filtered = filtered.filter((workout) => isAfter(workout.date, cutoffDate))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((workout) =>
        workout.name.toLowerCase().includes(query)
      )
    }

    filtered.sort((a, b) => {
      let comparison = 0

      if (sortField === 'date') {
        comparison = a.date.getTime() - b.date.getTime()
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === 'duration') {
        comparison = a.duration - b.duration
      } else if (sortField === 'exercises') {
        comparison = a.exerciseCount - b.exerciseCount
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    setFilteredWorkouts(filtered)
  }, [dateRange, searchQuery, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null

    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center">
                Date
                <SortIcon field="date" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Workout
                <SortIcon field="name" />
              </div>
            </TableHead>
            <TableHead
              className="hidden cursor-pointer md:table-cell"
              onClick={() => handleSort('duration')}
            >
              <div className="flex items-center">
                Duration
                <SortIcon field="duration" />
              </div>
            </TableHead>
            <TableHead
              className="hidden cursor-pointer md:table-cell"
              onClick={() => handleSort('exercises')}
            >
              <div className="flex items-center">
                Exercises
                <SortIcon field="exercises" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>{format(workout.date, 'MMM d, yyyy')}</TableCell>
                <TableCell className="font-medium">{workout.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDuration(workout.duration)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{workout.exerciseCount}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedWorkout(workout)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Workout Details</DialogTitle>
                        <DialogDescription>
                          {workout.name} -{' '}
                          {format(workout.date, 'MMMM d, yyyy')}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedWorkout && (
                        <WorkoutDetails workout={selectedWorkout} />
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-muted-foreground py-8 text-center"
              >
                No workouts found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}
