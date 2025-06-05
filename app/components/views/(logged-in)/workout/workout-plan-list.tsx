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
import { useWorkoutsTableConfig } from './hook/useWorkoutsTableConfig'

export function WorkoutPlanList() {
  const { workouts } = useLoaderData<typeof loader>()
  // const handleDelete = (id: string) => {
  //   setPlans(plans.filter((plan) => plan.id !== id))
  // }
  console.log(workouts)
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

            {/* <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {plan.description}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{plan.exerciseCount}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/start-workout?planId=${plan.id}`}>
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Start</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/workouts/${plan.id}/edit`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the workout plan &quot;
                        {plan.name}&quot;. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(plan.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
