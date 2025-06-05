import {
  ActionCell,
  DefaultCell,
  DeleteAction,
  DescriptionCell,
  EditAction,
  StartWorkoutAction
} from '~/components/shared/TableCells/TableCells'
import { Badge } from '~/components/ui/badge'
import type { Workouts } from '~/services/api/workouts/workoutsService'

type WorkoutsWithActions = Partial<Workouts> & {
  actions: string
  workout_exercises: string
}

type TableConfig = {
  [key in keyof WorkoutsWithActions]: {
    head: string
    value: (workout: Workouts) => string | React.ReactNode
  }
}

export function useWorkoutsTableConfig() {
  return Object.values(tableConfig)
}

const tableConfig: TableConfig = {
  name: {
    head: 'Name',
    value: (workout) => (
      <DefaultCell className="font-medium" value={workout.name} />
    )
  },
  description: {
    head: 'Description',
    value: (workout) => (
      <DescriptionCell
        item={{
          id: workout.id,
          description: workout.description
        }}
      />
    )
  },
  workout_exercises: {
    head: 'Exercises',
    value: (workout) => {
      return (
        <DefaultCell className="font-medium">
          <Badge variant="outline">{workout.workout_exercises[0]?.count}</Badge>
        </DefaultCell>
      )
    }
  },
  actions: {
    head: 'Actions',
    value: (workout) => (
      <ActionCell>
        <StartWorkoutAction link={`workout/${workout.id}`} />
        <EditAction link={`workout/${workout.id}`} />
        <DeleteAction
          description={`This will permanently delete the workout &quot;${workout.name}&quot;. This action cannot be undone.`}
          id={workout.id}
        />
      </ActionCell>
    )
  }
}
