"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ShoppingBag,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  type: "order" | "user" | "system" | "alert";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const { push, back } = useRouter();
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      description: "Order #12345 needs processing",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "user",
      title: "New User Registration",
      description: "John Doe has created an account",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "system",
      title: "System Update",
      description: "System maintenance scheduled for tonight",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "alert",
      title: "Low Stock Alert",
      description: "Product 'Wireless Headphones' is running low",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case "user":
        return <User className="w-5 h-5 text-green-600" />;
      case "system":
        return <Settings className="w-5 h-5 text-purple-600" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">Manage your notifications</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex items-center text-gray-50 hover:text-white bg-orange-500/85 hover:bg-orange-600/85"
          >
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-100" />
            Mark all as read
          </Button>
          <Button
            onClick={() => {
              push("/admin/dashboard/notifications/composer");
            }}
            variant="outline"
            className="flex items-center text-gray-50 hover:text-white bg-orange-500/85 hover:bg-orange-600/85"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Notifications
              </h3>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Alerts</h3>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Read</h3>
              <p className="text-2xl font-bold mt-1">16</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 flex items-start space-x-4 ${
              !notification.read ? "bg-blue-50" : ""
            }`}
          >
            <div className={`p-2 rounded-full bg-white`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-gray-600">{notification.description}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {notification.time}
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  Mark as read
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
