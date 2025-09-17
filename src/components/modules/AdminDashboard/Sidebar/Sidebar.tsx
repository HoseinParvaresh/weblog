"use client"

import * as React from "react"
import { HiOutlineUsers, HiOutlineClipboardList, HiOutlineNewspaper } from "react-icons/hi";
import { TbReportAnalytics, TbSettings, TbPackages, TbDiscount } from "react-icons/tb";

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "@/components/modules/AdminDashboard/Sidebar/team-switcher"
import { Sidebar as AdminSidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"


// This is sample data.
const data = {
  user: {
    name: "مدیر سیستم",
    email: "parvaresh.dev@gmail.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "تیم توسعه",
      logo: GalleryVerticalEnd,
      plan: "حرفه‌ای",
    },
    {
      name: "تیم بازاریابی",
      logo: AudioWaveform,
      plan: "استاندارد",
    },
    {
      name: "تیم پشتیبانی",
      logo: Command,
      plan: "رایگان",
    },
  ],
  navMain: [
    {
      title: "داشبورد",
      url: "http://localhost:3000/admin-dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "خانه",
          url: "http://localhost:3000/admin-dashboard",
        }
      ],
    },
    {
      title: "مدیریت پست ها",
      url: "#",
      icon: TbPackages,
      items: [
        {
          title: "لیست پست ها",
          url: "http://localhost:3000/admin-dashboard/posts",
        },
        {
          title: "افزودن پست جدید",
          url: "http://localhost:3000/admin-dashboard/posts/create",
        },
        {
          title: "لیست کامنت های پست ها",
          url: "http://localhost:3000/admin-dashboard/comments",
        }
      ],
    },
    {
      title: "مدیریت کاربران",
      url: "#",
      icon: HiOutlineUsers,
      items: [
        {
          title: "لیست کاربران",
          url: "http://localhost:3000/admin-dashboard/users",
        },
        {
          title: "افزودن کاربر جدید",
          url: "http://localhost:3000/admin-dashboard/users/create",
        },
      ],
    },
    {
      title: "مدیریت دسته بندی ها",
      url: "#",
      icon: HiOutlineUsers,
      items: [
        {
          title: "لیست دسته بندی",
          url: "http://localhost:3000/admin-dashboard/categories",
        },
        {
          title: "افزودن دسته بندی جدید",
          url: "http://localhost:3000/admin-dashboard/categories/create",
        },
      ],
    },
  ],
}


export function Sidebar({ ...props }: React.ComponentProps<typeof AdminSidebar>) {

  const { toggleSidebar } = useSidebar()
  const triggeredRef = React.useRef(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const handleChange = (e : MediaQueryListEvent) => {
      if (e.matches && !triggeredRef.current) {
        triggeredRef.current = true;
        toggleSidebar()
      }
    };
    if (mediaQuery.matches && !triggeredRef.current) {
      triggeredRef.current = true;
      toggleSidebar()
    }
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <AdminSidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail className="!hidden lg:!block" />
    </AdminSidebar>
  )
}
