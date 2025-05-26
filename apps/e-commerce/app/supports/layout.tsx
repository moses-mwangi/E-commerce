// "use client";

import { Toaster } from "react-hot-toast";
import SupportNavbar from "./SupportNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative min-h-screen bg-gray-50">
      <SupportNavbar />
      <div className="flex w-full min-h-screen bg-gray-50 mt-[60px]">
        {children}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
