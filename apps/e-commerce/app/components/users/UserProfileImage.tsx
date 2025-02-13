"use client";

import React, { useEffect } from "react";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCurrentUser, logoutUser } from "@/redux/slices/userSlice";
import { Separator } from "@/components/ui/separator";

export default function UserProfileImage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const token = document.cookie.split("=")[1];

  // useEffect(() => {
  // dispatch(fetchUsers());

  //   if (token && token.length > 20 && token !== "undefined") {
  //     dispatch(getCurrentUser());
  //   }
  // }, [dispatch]);

  function handleLogOut() {
    dispatch(logoutUser());
  }

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="bg-pink-700 cursor-pointer rounded-full text-white font-semibold flex items-center justify-center w-10 h-10">
            {currentUser?.name[0].toUpperCase()}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 px-0">
          <div className="flex flex-col justify-between space-y-4">
            <div className=" px-4">
              <h1>Hi {currentUser?.name}</h1>
            </div>
            <div className=" px-4">
              <Separator className="" />
            </div>
            <div className=" px-4">gggg</div>
            <div className=" px-4">
              <Separator className="" />
            </div>
            <div>
              <div
                className="px-6 py-2 text-[15px] cursor-pointer text-gray-600 hover:bg-slate-50 transition-all duration-150"
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log out
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
