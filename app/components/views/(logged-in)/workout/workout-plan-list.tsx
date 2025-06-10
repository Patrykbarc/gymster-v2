import { Fragment } from 'react'
import { useLoaderData } from 'react-router'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import type { loader } from '~/routes/(logged-in)/workout/workouts'
import { useWorkoutsTableConfig } from './_hooks/useWorkoutsTableConfig'

export function WorkoutPlanList() {
  const { workouts } = useLoaderData<typeof loader>()
  const tableConfig = useWorkoutsTableConfig()

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
        {workouts?.map((workout) => (
          <TableRow key={workout.id}>
            {tableConfig.map((config) => (
              <Fragment key={config.head}>{config.value(workout)}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
