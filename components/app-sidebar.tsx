'use client';

import * as React from 'react';
import {
  Command,
  User,
  Briefcase,
  LogIn,
  Settings,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/avatars/admin.jpg',
  },
  navMain: [
    {
      title: 'Admin',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'Dashboard',
          url: 'dashboard',
        },
        {
          title: 'Settings',
          url: 'admin',
        },
      ],
    },
    {
      title: 'My',
      url: '#',
      icon: User,
      items: [
        {
          title: 'Profile',
          url: 'my',
        },
        {
          title: 'Activities',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Project',
      url: '#',
      icon: Briefcase,
      items: [
        {
          title: 'Overview',
          url: 'project',
        },
        {
          title: 'Tasks',
          url: '#',
        },
        {
          title: 'Reports',
          url: '#',
        },
      ],
    },
    {
      title: 'Sign In',
      url: 'signin',
      icon: LogIn,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">My App</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <appkit-button balance="hide" size='sm'/>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
