import { ChevronDown, Edit, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
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
import { Button, buttonVariants } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { cn } from '~/lib/utils'
import type { loader } from '~/routes/(logged-in)/exercises/exercises'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export function ExerciseListTable() {
  const { exercises } = useLoaderData<typeof loader>()
  const { revalidate } = useRevalidator()
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const descriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleDelete = async (id: string) => {
    await exercisesService.deleteExercise(id)
    revalidate()
  }

  const toggleDescription = (exerciseId: string) => {
    setExpandedExercise((current) =>
      current === exerciseId ? null : exerciseId
    )
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
            <TableCell className="relative hidden min-w-[350px] max-w-[600px] md:table-cell">
              {exercise.description && (
                <div className="relative">
                  <div
                    ref={(el) => {
                      if (el) descriptionRefs.current[exercise.id] = el
                    }}
                    className={cn(
                      'mt-1.5 overflow-hidden whitespace-break-spaces transition-[max-height] duration-300 ease-in-out',
                      expandedExercise === exercise.id
                        ? 'max-h-[1000px]'
                        : 'relative max-h-[80px] overflow-hidden text-ellipsis after:absolute after:bottom-0 after:left-0 after:h-8 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent after:content-[""]'
                    )}
                  >
                    <p className="pr-8">{exercise.description}</p>
                  </div>
                  <button
                    onClick={() => toggleDescription(exercise.id)}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'absolute right-0 top-0 size-6 transition-transform duration-300',
                      expandedExercise === exercise.id && 'rotate-180'
                    )}
                    aria-label={
                      expandedExercise === exercise.id
                        ? 'Collapse description'
                        : 'Expand description'
                    }
                  >
                    <ChevronDown className={cn('size-4')} />
                  </button>
                </div>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {exercise.muscle_group?.map((muscle) => (
                  <Badge variant="outline" key={muscle}>
                    {muscle}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {exercise.equipment?.map((equipment) => (
                  <Badge variant="outline" key={equipment}>
                    {equipment}
                  </Badge>
                ))}
              </div>
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
