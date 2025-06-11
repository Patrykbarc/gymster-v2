import { Plus, Trash2 } from 'lucide-react'
import { Dialog } from '~/components/shared/dialog/dialog'
import { Button } from '~/components/ui/button'

function RemoveExercise({ onRemove }: { onRemove: () => void }) {
  return (
    <Dialog
      title="Remove Exercise"
      description="This action cannot be undone."
      callback={onRemove}
    >
      <Button type="button" variant="ghost" size="icon" className="ms-auto">
        <Trash2 className="size-4" />
      </Button>
    </Dialog>
  )
}

function AddSetButton({ handleAddSet }: { handleAddSet: () => void }) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={handleAddSet}
      >
        <Plus className="mr-2 size-4" /> Add Set
      </Button>
    </div>
  )
}

export { AddSetButton, RemoveExercise }
