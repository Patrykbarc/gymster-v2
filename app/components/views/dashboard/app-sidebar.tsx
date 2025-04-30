import { ClipboardList, Dumbbell, HistoryIcon, Home, Play } from 'lucide-react'

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
    url: '/app',
    icon: Home
  },
  {
    title: 'Exercises',
    url: '/app/exercises',
    icon: Dumbbell
  },
  {
    title: 'Workout plans',
    url: '/app/plans',
    icon: ClipboardList
  },
  {
    title: 'Start workout',
    url: '/app/workout',
    icon: Play
  },
  {
    title: 'History',
    url: '/app/history',
    icon: HistoryIcon
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gymster</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
