import { Draggable } from '@hello-pangea/dnd'
import { Card, CardContent } from '~/components/ui/card'
import type { ExerciseItemContentProps } from '../_types/types'
import { ExerciseItemContent } from '../exercise-item-content/exercise-item-content'

type ExerciseItemProps = ExerciseItemContentProps & {
  draggable: boolean
}
export function ExerciseItem({ draggable, ...props }: ExerciseItemProps) {
  const content = <ExerciseItemContent {...props} draggable={draggable} />

  console.log(props)

  if (draggable) {
    return (
      <Draggable
        key={props.exercise.id}
        draggableId={props.exercise.id}
        index={props.index}
      >
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-4 border"
          >
            <CardContent>{content}</CardContent>
          </Card>
        )}
      </Draggable>
    )
  }

  return (
    <div key={props.exercise.id} className="rounded-md border p-3">
      {content}
    </div>
  )
}
