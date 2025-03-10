"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarItemProps, sidebarItems } from "./sidebar_Type_Item";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCurrentUser } from "@/redux/slices/userSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="relative">
      <aside
        className={cn(
          "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          expanded ? "w-[270px]" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {expanded && (
                <div className="flex cursor-pointer items-center space-x-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/admin-avatar.png" alt="Admin" />
                    <AvatarFallback className=" bg-pink-100">
                      {currentUser?.name[0].toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {currentUser?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {currentUser?.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.link}
                icon={item.icon}
                text={item.text}
                link={item.link}
                expanded={expanded}
                active={pathname === item.link}
              />
            ))}
          </nav>

          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -right-3 top-5 bg-white border border-gray-200 text-orange-600 hover:text-orange-500 rounded-full p-1.5 hover:bg-gray-100"
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              {expanded && (
                <div className="text-xs text-gray-500">
                  v1.0.0 • © 2024 E-Commerce
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  link,
  expanded,
  active,
}) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link
      href={`/admin${link}`}
      className={cn(
        "flex items-center cursor-pointer space-x-2 px-3 py-2 rounded-lg transition-colors",
        active
          ? "bg-gray-100 text-orange-500"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      <div className={cn("min-w-[24px]", !expanded && "mx-auto")}>{icon}</div>
      {expanded && <span className="text-sm font-medium">{text}</span>}
    </Link>
  );
};

export default Sidebar;
