"use client";
import {
  Package,
  User,
  Heart,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserProfileSection from "./sections/UserProfileSection";
import OrdersSection from "./sections/OrdersSection";
import WishlistSection from "./sections/WishlistSection";
import PaymentSection from "./sections/payment/PaymentSection";
import SettingsSection from "./sections/SettingsSection";
import Footer from "@/app/components/footer/Footer";
import Logo from "@/app/home-page/navbar/logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import { logoutUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: "payment",
    label: "Payment",
    icon: <CreditCard className="w-4 h-4" />,
  },
];

export default function UserAccountPage() {
  const [activeTab, setActiveTab] = useState("settings");
  const { orders } = useSelector((state: RootState) => state.order);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const token = document.cookie.split("=")[1];

  const handleLogout = () => {
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
    <div className="">
      {/* <Navbar /> */}
      <div className="bg-white flex justify-between shadow-md py-4 px-6">
        <div>
          <Logo />
        </div>
        <div>
          <UserProfileImage />
        </div>
      </div>
      <div className=" container rounded-2xl mx-auto px-4 py-8 mt-7 mb-9">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Account</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        <Separator className="mb-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Card className="md:col-span-3 p-4">
              <TabsList className="flex flex-col h-auto w-full space-y-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`w-full flex items-center gap-2 justify-start px-4 py-2 ${
                      tab.id === activeTab
                        ? " bg-orange-50 text-orange-600"
                        : " hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Card>

            <Card className="md:col-span-9 p-6">
              <TabsContent value="profile">
                <UserProfileSection />
              </TabsContent>
              <TabsContent value="orders">
                <OrdersSection />
              </TabsContent>
              <TabsContent value="wishlist">
                <WishlistSection />
              </TabsContent>
              <TabsContent value="payment">
                <PaymentSection />
              </TabsContent>
              <TabsContent value="settings">
                <SettingsSection />
              </TabsContent>
              {/* </Tabs> */}
            </Card>
          </div>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
