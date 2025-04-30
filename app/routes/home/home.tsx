import { useLoaderData } from 'react-router'
import { QuickActions } from '~/components/views/dashboard/quick-actions'
import { RecentWorkouts } from '~/components/views/dashboard/recent-workouts'
import type { Route } from '../+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Gymster | Home' }]
}

export async function loader() {
  return {
    data: {
      message: 'Welcome to Gymster V2!',
      name: 'John Doe',
      age: 30
    }
  }
}

export default function Home() {
  const { data } = useLoaderData<typeof loader>()

  return (
    <div className="grid grid-cols-1 gap-4 lg:flex">
      <QuickActions />
      <RecentWorkouts />
    </div>
  )
}
