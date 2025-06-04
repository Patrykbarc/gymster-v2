import { Badge } from '~/components/ui/badge'
import type { Exercises } from '../exercise-form/types/types'
import {
  ActionCell,
  DefaultCell,
  DescriptionCell
} from './TableCells/TableCells'

type ExercisesWithActions = Partial<Exercises> & { actions: string }

type TableConfig = {
  [key in keyof ExercisesWithActions]: {
    head: string
    value: (exercise: Exercises) => string | React.ReactNode
  }
}

export function useExercisesTableConfig() {
  return Object.values(tableConfig)
}

const tableConfig: TableConfig = {
  name: {
    head: 'Name',
    value: (exercise) => (
      <DefaultCell className="font-medium" value={exercise.name} />
    )
  },
  description: {
    head: 'Description',
    value: (exercise) => (
      <DescriptionCell
        exercise={exercise}
        className="relative hidden  md:table-cell"
      />
    )
  },
  muscle_group: {
    head: 'Muscle group',
    value: (exercise) => (
      <DefaultCell>
        <div className="flex flex-wrap gap-1">
          {exercise.muscle_group?.map((muscle) => (
            <Badge variant="outline" key={muscle}>
              {muscle}
            </Badge>
          ))}
        </div>
      </DefaultCell>
    )
  },
  equipment: {
    head: 'Equipment',
    value: (exercise) => (
      <DefaultCell>
        <div className="flex flex-wrap gap-1">
          {exercise.equipment?.map((equipment) => (
            <Badge variant="outline" key={equipment}>
              {equipment}
            </Badge>
          ))}
        </div>
      </DefaultCell>
    )
  },
  difficulty: {
    head: 'Difficulty',
    value: (exercise) => <DefaultCell value={exercise.difficulty} />
  },
  actions: {
    head: 'Actions',
    value: (exercise) => <ActionCell exercise={exercise} />
  }
}
