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

export type HeaderType = {
  title: string
  description: string
  button?: {
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
        text: 'Start Workout',
        href: 'start-workout'
      }
    },
    exercises: {
      title: 'Exercises',
      description: 'Browse, search, and manage your exercises',
      button: {
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
            <Header />
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </main>
    </>
  )
}
