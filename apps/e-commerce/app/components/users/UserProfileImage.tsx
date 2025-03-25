// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { logoutUser } from "@/redux/slices/userSlice";
// import { Separator } from "@/components/ui/separator";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import {
//   ShoppingBag,
//   Heart,
//   User,
//   MessageSquare,
//   LogOut,
//   User2,
//   Settings,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const menuItems = [
//   {
//     label: "Orders",
//     icon: ShoppingBag,
//     href: "/pages/order",
//     color: "text-blue-600",
//   },
//   {
//     label: "Messages",
//     icon: MessageSquare,
//     href: "/messages",
//     color: "text-green-600",
//   },
//   {
//     label: "Favorites",
//     icon: Heart,
//     href: "/favorites",
//     color: "text-pink-600",
//   },
//   {
//     label: "Account",
//     icon: User,
//     href: "/pages/account",
//     color: "text-purple-600",
//   },
//   {
//     label: "Admin",
//     icon: User2,
//     href: "/dashboard/admin",
//     color: "text-orange-600",
//     adminOnly: true,
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     href: "/settings",
//     color: "text-gray-600",
//   },
// ];

// export default function UserProfileImage() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { currentUser } = useSelector((state: RootState) => state.user);

//   const handleLogOut = () => {
//     dispatch(logoutUser());
//     router.push("/");
//   };

//   const handleNavigation = (href: string) => {
//     router.push(href);
//   };

//   const userInitial = currentUser?.name?.[0]?.toUpperCase() || "U";
//   const isAdmin = currentUser?.tradeRole === "admin"; // Adjust based on your user roles

//   return (
//     <HoverCard openDelay={0} closeDelay={150}>
//       <HoverCardTrigger asChild>
//         <button
//           className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 rounded-full"
//           aria-label="User menu"
//         >
//           <div className="bg-gradient-to-br from-pink-500 to-pink-700 cursor-pointer rounded-full text-white font-semibold flex items-center justify-center w-10 h-10 transition-all duration-200 hover:shadow-lg hover:scale-110">
//             {userInitial}
//           </div>
//         </button>
//       </HoverCardTrigger>

//       <HoverCardContent
//         align="end"
//         className="w-80 p-0 shadow-xl rounded-xl overflow-hidden border-none"
//       >
//         <div className="flex flex-col">
//           {/* User Info Header */}
//           <div className="px-4 py-3 bg-gradient-to-br from-pink-50 to-pink-100">
//             <div className="flex items-center gap-3">
//               <div className="h-12 w-12 flex items-center justify-center font-bold text-white rounded-full bg-gradient-to-br from-pink-500 to-pink-700 shadow-md">
//                 {userInitial}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-lg font-semibold truncate">
//                   {currentUser?.name || "Guest User"}
//                 </h1>
//                 <p className="text-sm text-gray-600 truncate">
//                   {currentUser?.email || "No email available"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Menu Items */}
//           <nav className="p-2">
//             {menuItems.map((item) => {
//               if (item.adminOnly && !isAdmin) return null;

//               return (
//                 <button
//                   key={item.label}
//                   onClick={() => handleNavigation(item.href)}
//                   className="w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <item.icon className={cn("w-5 h-5", item.color)} />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               );
//             })}
//           </nav>

//           <Separator className="my-1" />

//           {/* Logout Button */}
//           <button
//             onClick={handleLogOut}
//             className="flex items-center gap-3 py-3 px-5 text-red-600 hover:bg-red-50 transition-colors duration-200"
//           >
//             <LogOut className="w-5 h-5" />
//             <span className="font-medium">Log Out</span>
//           </button>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
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
  Settings2,
} from "lucide-react";
import toast from "react-hot-toast";
import LoadingState from "../loaders/LoadingState";
import { FaBell } from "react-icons/fa";

export default function UserProfileImage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const token = document.cookie.split("=")[1];

  const handleLogOut = () => {
    try {
      dispatch(logoutUser());
      console.log("Logging out...");
      toast.success("Log out succefully");
      router.push("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <HoverCard>
        <HoverCardTrigger className="p-0" asChild>
          <div className="bg-pink-700 cursor-pointer rounded-full text-white font-semibold flex items-center justify-center w-10 h-10 transition-transform hover:scale-110">
            {currentUser?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </HoverCardTrigger>

        <HoverCardContent className="w-80 z-40 pt-0 px-0 shadow-xl rounded-lg overflow-hidden">
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
              onClick={() => {
                setIsLoading(true);
                router.push("/pages/order");
              }}
            />

            <MenuItem
              label="Messages"
              icon={<MessageSquare className="w-5 h-5" />}
              onClick={() => {
                setIsLoading(true);
                router.push("/pages/messages");
              }}
            />
            <MenuItem
              label="Notification"
              icon={<FaBell className="w-5 h-5 text-gray-700/80" />}
              onClick={() => {
                setIsLoading(true);
                router.push("/pages/notifications");
              }}
            />
            <MenuItem
              label="Favorites"
              icon={<Heart className="w-5 h-5" />}
              onClick={() => {
                setIsLoading(true);
                router.push("/pages/favourites");
              }}
            />
            <MenuItem
              label="Admin"
              icon={<User2 className="w-5 h-5" />}
              onClick={() => {
                setIsLoading(true);
                router.push("/admin");
              }}
            />
            <MenuItem
              label="Account"
              icon={<Settings2 className="w-5 h-5" />}
              onClick={() => {
                setIsLoading(true);
                router.push("/pages/account");
              }}
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
    </>
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
      className="flex text-[15px] items-center gap-3 py-[10px] px-4 text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}
