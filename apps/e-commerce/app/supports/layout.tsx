import { Toaster } from "react-hot-toast";
import SupportNavbar from "./SupportNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative min-h-screen">
      <SupportNavbar />
      <div className="flex w-full min-h-screen mt-[60px]">
        {children}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
