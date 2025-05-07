import { History, Play, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'

const links = [
  {
    label: 'Add New Exercise',
    icon: Plus,
    to: '/dashboard/exercises/new'
  },
  {
    label: 'Create Workout Plan',
    icon: Plus,
    to: '/dashboard/workout-plans/new'
  },
  {
    label: 'Start New Workout',
    icon: Play,
    to: '/dashboard/start-workout'
  },
  {
    label: 'View Workout History',
    icon: History,
    to: '/dashboard/history'
  }
]

export function QuickActions() {
  return (
    <Card className="col-span-1 w-fit">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {links.map((link) => (
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
            key={link.to}
          >
            <Link to={link.to}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
