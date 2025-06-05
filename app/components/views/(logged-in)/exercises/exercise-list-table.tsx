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
import { useExercisesTableConfig } from './hook/useExercisesTableConfig'

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
          <TableRow key={exercise.id}>
            {tableConfig.map((config) => (
              <Fragment key={config.head}>{config.value(exercise)}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
