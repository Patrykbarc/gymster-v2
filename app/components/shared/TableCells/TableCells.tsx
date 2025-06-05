import { ChevronDown, Edit, Play, Trash2 } from 'lucide-react'
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
  item,
  className
}: {
  item: {
    id: string
    description: string | null
  }
  className?: string
}) {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const descriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const tableCellRef = useRef<HTMLTableCellElement>(null)

  const toggleDescription = (exerciseId: string) => {
    setExpandedExercise((current) =>
      current === exerciseId ? null : exerciseId
    )
  }

  const tableCellHeight = tableCellRef.current?.clientHeight
  const showExpandDescription = tableCellHeight && tableCellHeight > 60

  return (
    <TableCell className={cn(className)} ref={tableCellRef}>
      <div className="relative">
        <div
          ref={(el) => {
            if (el) descriptionRefs.current[item.id] = el
          }}
          className={cn(
            'overflow-hidden whitespace-break-spaces transition-[max-height] duration-300 ease-in-out',
            showExpandDescription &&
              (expandedExercise === item.id
                ? 'max-h-[1000px]'
                : 'relative max-h-[80px] overflow-hidden text-ellipsis after:absolute after:bottom-0 after:left-0 after:h-8 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent after:content-[""]')
          )}
        >
          <p className="pr-8">{item.description || '-'}</p>
        </div>

        {tableCellHeight && tableCellHeight > 60 && (
          <button
            onClick={() => toggleDescription(item.id)}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'absolute right-0 top-0 size-6 transition-transform duration-300',
              expandedExercise === item.id && 'rotate-180'
            )}
            aria-label={
              expandedExercise === item.id
                ? 'Collapse description'
                : 'Expand description'
            }
          >
            <ChevronDown className={cn('size-4')} />
          </button>
        )}
      </div>
    </TableCell>
  )
}

function ActionCell({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <TableCell className={cn(className)}>
      <div className="flex justify-end gap-2">{children}</div>
    </TableCell>
  )
}

function StartWorkoutAction({ link }: { link: string }) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to={link}>
        <Play className="h-4 w-4" />
        <span className="sr-only">Start workout</span>
      </Link>
    </Button>
  )
}

function EditAction({ link }: { link: string }) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to={link}>
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Link>
    </Button>
  )
}

function DeleteAction({
  description,
  callback
}: {
  description: string | React.ReactNode
  callback: () => Promise<null>
}) {
  const { revalidate } = useRevalidator()

  const handleDelete = async () => {
    await callback()
    revalidate()
  }

  return (
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
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export {
  ActionCell,
  DefaultCell,
  DeleteAction,
  DescriptionCell,
  EditAction,
  StartWorkoutAction
}
