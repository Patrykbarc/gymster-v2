import { Outlet } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/views/(logged-in)/app-sidebar'
import { Header } from '~/components/views/(logged-in)/header'

export default function DashboardLayout() {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="fixed right-0 p-6 md:hidden" />

        <div className="grid h-screen w-full grid-rows-[auto_1fr]">
          <Header />
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </main>
  )
}
