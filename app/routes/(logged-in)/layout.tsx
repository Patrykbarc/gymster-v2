import { Outlet } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/views/(logged-in)/app-sidebar'
import { Header } from '~/components/views/(logged-in)/header'

export default function DashboardLayout() {
  return (
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
  )
}
