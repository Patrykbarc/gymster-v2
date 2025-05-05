import { useLoaderData } from 'react-router'
import { QuickActions } from '~/components/views/home/dashboard/quick-actions'
import { RecentWorkouts } from '~/components/views/home/dashboard/recent-workouts'
import { SummaryCards } from '~/components/views/home/dashboard/summary-cards'
import type { Route } from '../+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Gymster | Dashboard' }]
}

export async function loader() {
  const summaryCards = [
    {
      title: 'Total Workouts',
      icon: 'History',
      value: '12',
      description: '+2 from last month'
    },
    {
      title: 'Workout Plans',
      icon: 'ClipboardList',
      value: '3',
      description: '+1 from last month'
    },
    {
      title: 'Exercises',
      icon: 'Dumbbell',
      value: '24',
      description: '+5 from last month'
    },
    {
      title: 'Last Workout',
      icon: 'Play',
      value: '2 days ago',
      description: 'Upper body'
    }
  ]

  return {
    summaryCards
  }
}

export default function Dashboard() {
  useLoaderData<typeof loader>()

  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid grid-cols-1 gap-6 lg:flex">
        <QuickActions />
        <RecentWorkouts />
      </div>
    </div>
  )
}
