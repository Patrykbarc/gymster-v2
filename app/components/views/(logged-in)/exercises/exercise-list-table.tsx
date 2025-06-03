import { Fragment } from 'react'
import { useLoaderData } from 'react-router'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import type { loader } from '~/routes/(logged-in)/exercises/exercises'
import type { Database } from '~/types/database.types'
import { useExercisesTableConfig } from './exercise-form/hook/useExercisesTableConfig'

type Exercises = Database['public']['Tables']['exercises']['Row']

type TableConfig = {
  header: {
    name: string
    className?: string
  }
  render: (exercise: Exercises) => React.ReactNode | string
}

export function ExerciseListTable() {
  const { exercises } = useLoaderData<typeof loader>()
  const tableConfig = useExercisesTableConfig()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableConfig.map((config) => (
            <TableHead key={config.head}>{config.head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises?.map((exercise) => (
          <TableRow key={exercise.id} className="align-top">
            {tableConfig.map((config) => (
              <Fragment key={config.head}>{config.value(exercise)}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
