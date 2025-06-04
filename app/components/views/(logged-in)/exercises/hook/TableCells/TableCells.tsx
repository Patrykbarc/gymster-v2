import { ChevronDown, Edit, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useRevalidator } from 'react-router'
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
import { Button, buttonVariants } from '~/components/ui/button'
import { TableCell } from '~/components/ui/table'
import { cn } from '~/lib/utils'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import type { Exercises } from '../../exercise-form/types/types'

type DefaultCellProps = {
  className?: string
} & (
  | { value: string | React.ReactNode; children?: never }
  | { value?: never; children: React.ReactNode }
)

function DefaultCell({ value, children, className }: DefaultCellProps) {
  const content = value || children

  if (typeof content === 'string') {
    return <TableCell className={cn(className)}>{content}</TableCell>
  }
  return <TableCell className={cn(className)}>{content}</TableCell>
}

function DescriptionCell({
  exercise,
  className
}: {
  exercise: Exercises
  className?: string
}) {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const descriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleDescription = (exerciseId: string) => {
    setExpandedExercise((current) =>
      current === exerciseId ? null : exerciseId
    )
  }

  return (
    <TableCell className={cn(className)}>
      {exercise.description && (
        <div className="relative">
          <div
            ref={(el) => {
              if (el) descriptionRefs.current[exercise.id] = el
            }}
            className={cn(
              'overflow-hidden whitespace-break-spaces transition-[max-height] duration-300 ease-in-out',
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
  )
}

function ActionCell({ exercise }: { exercise: Exercises }) {
  const { revalidate } = useRevalidator()

  const handleDelete = async (id: string) => {
    await exercisesService.deleteExercise(id)
    revalidate()
  }

  return (
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
                This will permanently delete the exercise &quot;{exercise.name}
                &quot;. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(exercise.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TableCell>
  )
}

export { ActionCell, DefaultCell, DescriptionCell }
