"use client";

import Sidebar from "./adminComponents/SideBar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
      <Toaster position="top-right" />
    </div>
  );
}
