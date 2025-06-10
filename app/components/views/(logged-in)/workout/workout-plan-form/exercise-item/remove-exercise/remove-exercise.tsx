import { Trash2 } from 'lucide-react'
import { Dialog } from '~/components/shared/dialog/dialog'
import { Button } from '~/components/ui/button'

type RemoveExerciseProps = {
  onRemove: (index: number) => void
  index: number
  className?: string
}

export function RemoveExercise({ onRemove, index }: RemoveExerciseProps) {
  return (
    <Dialog
      title="Remove Exercise"
      description="This action cannot be undone."
      callback={() => onRemove(index)}
    >
      <Button type="button" variant="ghost" size="icon" className="ms-auto">
        <Trash2 className="size-4" />
      </Button>
    </Dialog>
  )
}
