"use client";

import {
  BarChart,
  Bell,
  HelpCircle,
  Home,
  Layers,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Tag,
  Truck,
  Users,
} from "lucide-react";

export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  expanded: boolean;
  active?: boolean;
  onClick?: () => void;
}

export const sidebarItems = [
  { icon: <Home size={20} />, text: "Dashboard", link: "/dashboard" },
  {
    icon: <Package size={20} />,
    text: "Products",
    link: "/dashboard/products",
  },
  {
    icon: <Layers size={20} />,
    text: "Categories",
    link: "/dashboard/categories",
  },
  {
    icon: <ShoppingCart size={20} />,
    text: "Orders",
    link: "/dashboard/orders",
  },
  {
    icon: <Users size={20} />,
    text: "Customers",
    link: "/dashboard/customers",
  },
  {
    icon: <Tag size={20} />,
    text: "Discounts",
    link: "/dashboard/discounts",
  },
  {
    icon: <Truck size={20} />,
    text: "Shipping",
    link: "/dashboard/shipping",
  },
  {
    icon: <BarChart size={20} />,
    text: "Analytics",
    link: "/dashboard/analytics",
  },
  { icon: <Star size={20} />, text: "Reviews", link: "/dashboard/reviews" },
  {
    icon: <MessageSquare size={20} />,
    text: "Messages",
    link: "/dashboard/messages",
  },
  {
    icon: <Bell size={20} />,
    text: "Notifications",
    link: "/dashboard/notifications",
  },
  {
    icon: <Settings size={20} />,
    text: "Settings",
    link: "/dashboard/settings",
  },
  {
    icon: <HelpCircle size={20} />,
    text: "Help Center",
    link: "/dashboard/help",
  },
];
