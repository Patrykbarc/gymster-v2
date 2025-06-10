import {
  ActionCell,
  DefaultCell,
  DeleteAction,
  DescriptionCell,
  EditAction,
  StartWorkoutAction
} from '~/components/shared/table-cells/table-cells'
import { Badge } from '~/components/ui/badge'
import { workoutsService } from '~/services/api/workouts/workoutsService'
import type { Workout } from '~/types/workouts.types'

type WorkoutExercisesCount = { count: number }
type WorkoutsWithActions = Partial<Workout> & {
  actions: string
  workout_exercises: WorkoutExercisesCount[]
}

type TableConfig = {
  [key in keyof WorkoutsWithActions]: {
    head: string
    value: (
      workout: Workout & { workout_exercises: WorkoutExercisesCount[] }
    ) => string | React.ReactNode
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
    value: (workout) => (
      <DefaultCell className="font-medium">
        <Badge variant="outline">{workout.workout_exercises?.length}</Badge>
      </DefaultCell>
    )
  },
  actions: {
    head: 'Actions',
    value: (workout) => (
      <ActionCell>
        <StartWorkoutAction link={`workout/${workout.id}`} />
        <EditAction link={`edit/${workout.id}`} />
        <DeleteAction
          callback={async () => await workoutsService.deleteWorkout(workout.id)}
          description={`This will permanently delete the workout &quot;${workout.name}&quot;. This action cannot be undone.`}
        />
      </ActionCell>
    )
  }
}
