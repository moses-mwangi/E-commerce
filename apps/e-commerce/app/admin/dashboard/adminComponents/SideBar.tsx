// "use client";

// import { useEffect, useState } from "react";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SidebarItemProps, sidebarItems } from "./sidebar_Type_Item";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getCurrentUser } from "@/redux/slices/userSlice";
// import { ChevronLeft, ChevronRight, Divide } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ButtonLoader from "@/app/components/loaders/ButtonLoader";

// const Sidebar = () => {
//   const [expanded, setExpanded] = useState(true);
//   const pathname = usePathname();
//   const path = pathname.split("/").reverse()[0];

//   const { currentUser } = useSelector((state: RootState) => state.user);
//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, [dispatch]);

//   return (
//     <div className="hidden sm:block">
//       <div className={cn("h-[80px]", expanded ? "w-[270px]" : "w-20")} />
//       <div className=" fixed top-0 left-0">
//         <div className="relative">
//           <aside
//             className={cn(
//               "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
//               expanded ? "w-[270px]" : "w-20"
//             )}
//           >
//             <div className=" flex flex-col h-full">
//               <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center space-x-4">
//                   {expanded && (
//                     <div className="flex cursor-pointer items-center space-x-2">
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src="/admin-avatar.png" alt="Admin" />
//                         <AvatarFallback className=" bg-pink-100">
//                           {currentUser?.name[0].toLocaleUpperCase()}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex flex-col">
//                         <span className="text-sm font-semibold">
//                           {currentUser?.name}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {currentUser?.email}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <nav className="flex-1 custom-scroll overflow-y-auto p-4 space-y-2">
//                 {sidebarItems.map((item) => (
//                   <SidebarItem
//                     key={item.link}
//                     icon={item.icon}
//                     text={item.text}
//                     link={item.link}
//                     expanded={expanded}
//                     active={path.toLowerCase() === item.text.toLowerCase()}
//                   />
//                 ))}
//               </nav>

//               <button
//                 onClick={() => setExpanded(!expanded)}
//                 className="absolute -right-3 top-5 bg-white border border-gray-200 text-orange-600 hover:text-orange-500 rounded-full p-1.5 hover:bg-gray-100"
//               >
//                 {expanded ? (
//                   <ChevronLeft size={16} />
//                 ) : (
//                   <ChevronRight size={16} />
//                 )}
//               </button>

//               {/* Footer */}
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex items-center space-x-2">
//                   {expanded && (
//                     <div className="text-xs text-gray-500">
//                       v1.0.0 • © 2024 E-Commerce
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   icon,
//   text,
//   link,
//   expanded,
//   active,
// }) => {
//   const { push } = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <>
//       {isLoading === false ? (
//         <Link
//           href={`/admin${link}`}
//           className={cn(
//             "flex items-center cursor-pointer px-3 py-2 space-x-2 rounded-lg transition-colors",
//             active
//               ? "bg-gray-100 text-orange-500"
//               : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           )}
//         >
//           <div className={cn("min-w-[24px]", !expanded && "mx-auto")}>
//             {icon}
//           </div>
//           {expanded && <span className="text-sm font-medium">{text}</span>}
//         </Link>
//       ) : (
//         // </div>
//         <div
//           className={cn(
//             active
//               ? "flex text-center justify-center bg-gray-200 cursor-pointer space-x-2 px-3 py-2 rounded-lg transition-colors"
//               : ""
//           )}
//         >
//           {active && <ButtonLoader />}
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;
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
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const path = pathname.split("/").reverse()[0];
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40",
          expanded ? "w-[270px]" : "w-20",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {expanded && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/admin-avatar.png" alt="Admin" />
                  <AvatarFallback className=" bg-pink-100">
                    {currentUser?.name[0].toUpperCase()}
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
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-600 hover:text-gray-900"
            >
              {expanded ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.link}
                icon={item.icon}
                text={item.text}
                link={item.link}
                expanded={expanded}
                active={path.toLowerCase() === item.text.toLowerCase()}
              />
            ))}
          </nav>

          {/* Footer */}
          {expanded && (
            <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
              v1.0.0 • © 2024 E-Commerce
            </div>
          )}
        </div>
      </div>
    </>
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
    <>
      {isLoading === false ? (
        <Link
          href={`/admin${link}`}
          className={cn(
            "flex items-center cursor-pointer px-3 py-2 space-x-2 rounded-lg transition-colors",
            active
              ? "bg-gray-100 text-orange-500"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <div className={cn("min-w-[24px]", !expanded && "mx-auto")}>
            {icon}
          </div>
          {expanded && <span className="text-sm font-medium">{text}</span>}
        </Link>
      ) : (
        <div
          className={cn(
            active
              ? "flex text-center justify-center bg-gray-200 cursor-pointer space-x-2 px-3 py-2 rounded-lg transition-colors"
              : ""
          )}
        >
          {active && <ButtonLoader />}
        </div>
      )}
    </>
  );
};

export default Sidebar;
