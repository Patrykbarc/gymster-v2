import { ClipboardList, Dumbbell, HistoryIcon, Home, Play } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'

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
    url: '/dashboard/workout-plans',
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
  const location = useLocation()

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(itemUrl)
  }

  return (
    <Sidebar>
      <SidebarContent>
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
      </SidebarContent>
    </Sidebar>
  )
}
