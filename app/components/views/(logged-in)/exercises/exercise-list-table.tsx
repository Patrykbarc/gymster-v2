import { ChevronDown, Edit, Trash2 } from 'lucide-react'
import { Link, useLoaderData, useRevalidator } from 'react-router'
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
import type { loader } from '~/routes/(logged-in)/exercises/exercises'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export function ExerciseListTable() {
  const { exercises } = useLoaderData<typeof loader>()
  const { revalidate } = useRevalidator()

  const handleDelete = async (id: string) => {
    await exercisesService.deleteExercise(id)
    revalidate()
  }

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
        {exercises?.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell className="font-medium">{exercise.name}</TableCell>
            <TableCell
              className="relative hidden min-w-[350px] max-w-[600px] overflow-hidden truncate whitespace-break-spaces md:block"
              style={{ height: '200px' }}
            >
              <span className="block">{exercise.description}</span>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </TableCell>
            <TableCell>
              {exercise.muscle_group?.map((muscle) => (
                <Badge variant="outline" key={muscle}>
                  {muscle}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              {exercise.equipment?.map((equipment) => (
                <Badge variant="outline" key={equipment}>
                  {equipment}
                </Badge>
              ))}
            </TableCell>
            <TableCell>{exercise.difficulty}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`edit/${exercise.id}`}>
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
                        onClick={() => handleDelete(exercise.id)}
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
