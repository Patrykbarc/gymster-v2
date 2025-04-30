import { Outlet } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/views/dashboard/app-sidebar'
import { Header } from '~/components/views/dashboard/header'

const texts = {
  header: {
    title: 'Dashboard',
    description: 'Track your fitness journey and monitor your progress'
  }
}

export default function DashboardLayout() {
  return (
    <>
      <main className="min-h-dvh">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="fixed right-0 p-6 md:hidden" />

          <div className="flex w-full flex-col">
            <Header
              title={texts.header.title}
              description={texts.header.description}
            />
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </main>
    </>
  )
}
