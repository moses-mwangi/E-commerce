"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Store,
  Palette,
} from "lucide-react";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Account Settings",
      icon: <User className="w-5 h-5" />,
      description: "Manage your account information and preferences",
      link: "#account",
    },
    {
      title: "Store Settings",
      icon: <Store className="w-5 h-5" />,
      description: "Configure your store details and policies",
      link: "#store",
    },
    {
      title: "Notification Preferences",
      icon: <Bell className="w-5 h-5" />,
      description: "Control your notification settings",
      link: "#notifications",
    },
    {
      title: "Security",
      icon: <Shield className="w-5 h-5" />,
      description: "Manage your security settings and passwords",
      link: "#security",
    },
    {
      title: "Payment Methods",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Set up and manage payment methods",
      link: "#payments",
    },
    {
      title: "Email Settings",
      icon: <Mail className="w-5 h-5" />,
      description: "Configure email notifications and templates",
      link: "#email",
    },
    {
      title: "Regional Settings",
      icon: <Globe className="w-5 h-5" />,
      description: "Manage language and regional preferences",
      link: "#regional",
    },
    {
      title: "Appearance",
      icon: <Palette className="w-5 h-5" />,
      description: "Customize the look and feel of your dashboard",
      link: "#appearance",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your store settings</p>
        </div>
        <Button className="bg-primary">
          <Settings className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <Card
            key={section.title}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-100 rounded-lg">{section.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {section.title}
                </h3>
                <p className="text-gray-600 mt-1">{section.description}</p>
                <Button
                  variant="ghost"
                  className="mt-4 text-primary hover:text-primary/80"
                >
                  Configure
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Danger Zone</h3>
            <p className="text-gray-600 mt-1">
              Permanent actions that cannot be undone
            </p>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </Card>
    </div>
  );
}
