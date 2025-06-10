import { Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'

type RemoveExerciseProps = {
  onRemove: (index: number) => void
  index: number
  className?: string
}

export function RemoveExercise({
  onRemove,
  index,
  className
}: RemoveExerciseProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onRemove(index)}
      className={className}
    >
      <Trash2 className="size-4" />
    </Button>
  )
}
