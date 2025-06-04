import {
  ClipboardList,
  Dumbbell,
  HistoryIcon,
  Home,
  LogOut,
  Play
} from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Button } from '~/components/ui/button'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import { useAuthStore } from '~/store/authStore'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home
  },
  {
    title: 'Exercises',
    url: '/dashboard/exercises',
    icon: Dumbbell
  },
  {
    title: 'Workout plans',
    url: '/dashboard/workouts',
    icon: ClipboardList
  },
  {
    title: 'Start workout',
    url: '/dashboard/start-workout',
    icon: Play
  },
  {
    title: 'History',
    url: '/dashboard/history',
    icon: HistoryIcon
  }
]

export function AppSidebar() {
  const { signOut } = useAuthStore()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <Sidebar>
      <SidebarContent className="flex h-full flex-col justify-between">
        <SidebarLinks />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  className="justify-start"
                  variant="ghost"
                  onClick={handleSignOut}
                >
                  <LogOut />
                  <span>Sign out</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

function SidebarLinks() {
  const location = useLocation()

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(itemUrl)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Gymster</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isItemActive(item.url)}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
