"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCurrentUser, logoutUser } from "@/redux/slices/userSlice";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ShoppingBag,
  Heart,
  User,
  MessageSquare,
  LogOut,
  User2,
} from "lucide-react";

export default function UserProfileImage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const token = document.cookie.split("=")[1];

  function handleLogOut() {
    dispatch(logoutUser());
  }

  return (
    <HoverCard>
      <HoverCardTrigger className="p-0" asChild>
        <div className="bg-pink-700 cursor-pointer rounded-full text-white font-semibold flex items-center justify-center w-10 h-10 transition-transform hover:scale-110">
          {currentUser?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 pt-0 px-0 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col space-y-[6px]">
          <div className="px-4 flex items-center gap-3 py-3 bg-pink-50">
            <div className="h-11 w-11 flex items-center justify-center font-bold text-white rounded-full bg-pink-500">
              {currentUser?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                {currentUser?.name || "Guest User"}
              </h1>
              <p className="text-sm text-gray-600">
                {currentUser?.email || "No email available"}
              </p>
            </div>
          </div>

          <MenuItem
            label="Orders"
            icon={<ShoppingBag className="w-5 h-5" />}
            onClick={() => router.push("/pages/order")}
          />
          <MenuItem
            label="Messages"
            icon={<MessageSquare className="w-5 h-5" />}
          />
          <MenuItem label="Favorites" icon={<Heart className="w-5 h-5" />} />
          <MenuItem
            label="Admin"
            icon={<User2 className="w-5 h-5" />}
            onClick={() => router.push("/dashboard/admin")}
          />
          <MenuItem
            label="Account Settings"
            icon={<User className="w-5 h-5" />}
            onClick={() => router.push("/pages/account")}
          />

          <Separator />

          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-gray-700 transition-all duration-200"
            onClick={handleLogOut}
          >
            <LogOut className="w-[18px] h-[18px] text-red-500" />
            <span className="text-red-500 text-[15px] font-semibold">
              Log Out
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Reusable MenuItem Component
function MenuItem({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}
