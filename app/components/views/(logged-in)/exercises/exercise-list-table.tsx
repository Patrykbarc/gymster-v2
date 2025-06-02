import { Edit, Trash2 } from 'lucide-react'
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
import type { Database } from '~/types/database.types'

const exercises = [
  {
    id: '1',
    name: 'Bench Press',
    description: 'Compound chest exercise',
    muscleCategory: 'Chest'
  },
  {
    id: '2',
    name: 'Squat',
    description: 'Compound lower body exercise',
    muscleCategory: 'Legs'
  },
  {
    id: '3',
    name: 'Deadlift',
    description: 'Compound back exercise',
    muscleCategory: 'Back'
  },
  {
    id: '4',
    name: 'Pull-up',
    description: 'Upper body pulling exercise',
    muscleCategory: 'Back'
  },
  {
    id: '5',
    name: 'Shoulder Press',
    description: 'Compound shoulder exercise',
    muscleCategory: 'Shoulders'
  },
  {
    id: '6',
    name: 'Bicep Curl',
    description: 'Isolation exercise for biceps',
    muscleCategory: 'Arms'
  },
  {
    id: '7',
    name: 'Tricep Extension',
    description: 'Isolation exercise for triceps',
    muscleCategory: 'Arms'
  },
  {
    id: '8',
    name: 'Leg Press',
    description: 'Machine-based leg exercise',
    muscleCategory: 'Legs'
  }
]

type ExerciseList = Database['public']['Tables']['exercises']['Row'][]

export function ExerciseListTable({
  exerciseList
}: {
  exerciseList: ExerciseList
}) {
  // const [exerciseList, setExerciseList] = useState(exercises)

  // const handleDelete = (id: string) => {
  //   setExerciseList(exerciseList.filter((exercise) => exercise.id !== id))
  // }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead className="hidden md:table-cell">Muscle group</TableHead>
          <TableHead>Equipment</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exerciseList.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell className="font-medium">{exercise.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {exercise.description}
            </TableCell>
            <TableCell>
              {exercise.muscle_group?.map((muscle) => (
                <Badge variant="outline" key={muscle}>
                  {muscle}
                </Badge>
              ))}
            </TableCell>
            <TableCell>{exercise.equipment}</TableCell>
            <TableCell>{exercise.difficulty}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/exercises/${exercise.id}/edit`}>
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
                        This will permanently delete the exercise "
                        {exercise.name}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                      // onClick={() => handleDelete(exercise.id)}
                      >
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
