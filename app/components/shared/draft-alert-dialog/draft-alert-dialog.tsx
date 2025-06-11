import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/components/ui/alert-dialog'

export function DraftAlertDialog({
  isOpen,
  onContinue,
  onDiscard,
  texts
}: {
  isOpen: boolean
  onContinue: () => void
  onDiscard: () => void
  texts: {
    title: string
    description: string
    discardButton?: string
    continueButton?: string
  }
}) {
  if (!isOpen) return null

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{texts.title}</AlertDialogTitle>
          <AlertDialogDescription>{texts.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDiscard}>
            {texts.discardButton || 'Discard'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>
            {texts.continueButton || 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
