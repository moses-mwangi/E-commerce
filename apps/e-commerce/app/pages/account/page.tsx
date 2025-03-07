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
import PaymentSection from "./sections/PaymentSection";
import SettingsSection from "./sections/SettingsSection";
import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import Logo from "@/app/home-page/navbar/logo/Logo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserProfileImage from "@/app/components/users/UserProfileImage";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-4 h-4" />,
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
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-4 h-4" />,
  },
];

export default function UserAccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { orders } = useSelector((state: RootState) => state.order);

  const handleLogout = () => {
    console.log("Logging out...");
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Card className="md:col-span-3 p-4">
              <TabsList className="flex flex-col w-full space-y-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`w-full flex items-center gap-2 justify-start px-4 py-2 ${
                      activeTab === tab.id
                        ? "bg-orange-50 text-orange-600"
                        : "hover:bg-gray-50"
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
            </Card>
          </div>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
