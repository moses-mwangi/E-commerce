"use client";

import { useState } from "react";
import {
  Home,
  Package,
  Users,
  BarChart,
  Settings,
  MessageSquare,
  ShoppingCart,
  Layers,
  Star,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen bg-white text-gray-800 border-r-gray-200 border-solid border ${
        expanded ? "w-64" : "w-20"
      } transition-all duration-300 p-4`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-white mb-4"
      >
        {expanded ? "Collapse" : "Expand"}
      </button>
      <nav className="space-y-4">
        <SidebarItem
          icon={<Home />}
          text="Dashboard"
          link="/admin"
          expanded={expanded}
        />
        <SidebarItem
          icon={<Package />}
          text="Products"
          link="/dashboard/admin/"
          expanded={expanded}
        />
        <SidebarItem
          icon={<Layers />}
          text="Categories"
          link="/admin/categories"
          expanded={expanded}
        />
        <SidebarItem
          icon={<ShoppingCart />}
          text="Orders"
          link="/admin/orders"
          expanded={expanded}
        />
        <SidebarItem
          icon={<Users />}
          text="Users"
          link="/admin/users"
          expanded={expanded}
        />
        <SidebarItem
          icon={<BarChart />}
          text="Analytics"
          link="/admin/analytics"
          expanded={expanded}
        />
        <SidebarItem
          icon={<Star />}
          text="AI Recommendations"
          link="/admin/recommendations"
          expanded={expanded}
        />
        <SidebarItem
          icon={<MessageSquare />}
          text="AI Chatbot"
          link="/admin/chatbot"
          expanded={expanded}
        />
        <SidebarItem
          icon={<Settings />}
          text="Settings"
          link="/admin/settings"
          expanded={expanded}
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, text, link, expanded }: any) => {
  return (
    <Link
      href={link}
      className="flex items-center p-2 hover:bg-gray-700 rounded"
    >
      <span className="mr-3">{icon}</span>
      {expanded && <span>{text}</span>}
    </Link>
  );
};

export default Sidebar;

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GrAnalytics } from "react-icons/gr";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    // {
    //   name: "Analytics",
    //   url: "#",
    //   icon: GrAnalytics,
    // },
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         <NavProjects projects={data.projects} />
//       </SidebarContent>

//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }
