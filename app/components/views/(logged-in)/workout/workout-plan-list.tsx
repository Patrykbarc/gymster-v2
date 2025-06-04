import { Edit, Play, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'

const workoutPlans = [
  {
    id: '1',
    name: 'Upper Body Split',
    description: 'Focus on chest, back, and arms',
    exerciseCount: 8
  },
  {
    id: '2',
    name: 'Lower Body Split',
    description: 'Focus on quads, hamstrings, and calves',
    exerciseCount: 6
  },
  {
    id: '3',
    name: 'Full Body Workout',
    description: 'Complete body workout for beginners',
    exerciseCount: 10
  },
  {
    id: '4',
    name: 'Core Blast',
    description: 'Intense core and ab workout',
    exerciseCount: 5
  }
]

export function WorkoutPlanList() {
  const [plans, setPlans] = useState(workoutPlans)

  const handleDelete = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead>Exercises</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {plan.description}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{plan.exerciseCount}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/start-workout?planId=${plan.id}`}>
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Start</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/workouts/${plan.id}/edit`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the workout plan &quot;
                        {plan.name}&quot;. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(plan.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
