import { Play, Plus } from 'lucide-react'
import { Outlet, useLoaderData } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/views/dashboard/app-sidebar'
import { Header } from '~/components/views/dashboard/header'

export type PathSegments =
  | 'dashboard'
  | 'exercises'
  | 'plans'
  | 'workout'
  | 'history'

const itemMap = {
  Play,
  Plus
}

export type HeaderType = {
  title: string
  description: string
  button?: {
    icon: keyof typeof itemMap
    text: string
    href: string
  }
}

export type Headers = {
  [key in PathSegments]: HeaderType
}

export async function loader() {
  const headers: Partial<Headers> = {
    dashboard: {
      title: 'Dashboard',
      description: 'Track your fitness journey and monitor your progress',
      button: {
        icon: 'Play',
        text: 'Start Workout',
        href: 'start-workout'
      }
    },
    exercises: {
      title: 'Exercises',
      description: 'Browse, search, and manage your exercises',
      button: {
        icon: 'Plus',
        text: 'Add Exercise',
        href: 'add-exercise'
      }
    }
  }

  return { headers }
}
export default function DashboardLayout() {
  useLoaderData<typeof loader>()

  return (
    <>
      <main className="min-h-dvh">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="fixed right-0 p-6 md:hidden" />

          <div className="flex w-full flex-col">
            <Header iconMap={itemMap} />
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </main>
    </>
  )
}
