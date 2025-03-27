"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useToast } from "@/hooks/use-toast";

type SettingsSection = {
  title: string;
  icon: React.ReactNode;
  description: string;
  id: string;
  component: React.ReactNode;
};

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    account: {
      name: "",
      email: "",
      phone: "",
    },
    store: {
      name: "",
      description: "",
      address: "",
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      promotions: true,
    },
    security: {
      twoFactorAuth: false,
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    payments: {
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
    email: {
      senderName: "",
      senderEmail: "",
      smtpHost: "",
      smtpPort: "",
      smtpUsername: "",
      smtpPassword: "",
    },
    regional: {
      language: "en",
      timezone: "UTC",
      currency: "USD",
    },
    appearance: {
      theme: "light",
      primaryColor: "#3b82f6",
    },
  });

  const handleInputChange = (
    section: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved",
    });
    // In a real app, you would send this to your API
    console.log("Saved data:", formData);
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      toast({
        title: "Account deleted",
        description: "Your account has been scheduled for deletion",
        variant: "destructive",
      });
      // In a real app, you would call your API here
    }
  };

  const settingsSections: SettingsSection[] = [
    {
      title: "Account Settings",
      icon: <User className="w-5 h-5" />,
      description: "Manage your account information and preferences",
      id: "account",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={formData.account.name}
              onChange={(e) =>
                handleInputChange("account", "name", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.account.email}
              onChange={(e) =>
                handleInputChange("account", "email", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={formData.account.phone}
              onChange={(e) =>
                handleInputChange("account", "phone", e.target.value)
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Store Settings",
      icon: <Store className="w-5 h-5" />,
      description: "Configure your store details and policies",
      id: "store",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Store Name</Label>
            <Input
              value={formData.store.name}
              onChange={(e) =>
                handleInputChange("store", "name", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.store.description}
              onChange={(e) =>
                handleInputChange("store", "description", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              value={formData.store.address}
              onChange={(e) =>
                handleInputChange("store", "address", e.target.value)
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Notification Preferences",
      icon: <Bell className="w-5 h-5" />,
      description: "Control your notification settings",
      id: "notifications",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Notification Channels</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifications", "email", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifications", "push", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch
                  id="sms-notifications"
                  checked={formData.notifications.sms}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifications", "sms", checked)
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Notification Types</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="order-updates">Order Updates</Label>
                <Switch
                  id="order-updates"
                  checked={formData.notifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifications", "orderUpdates", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions">Promotions & Offers</Label>
                <Switch
                  id="promotions"
                  checked={formData.notifications.promotions}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifications", "promotions", checked)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Security",
      icon: <Shield className="w-5 h-5" />,
      description: "Manage your security settings and passwords",
      id: "security",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <Switch
              id="two-factor"
              checked={formData.security.twoFactorAuth}
              onCheckedChange={(checked) =>
                handleInputChange("security", "twoFactorAuth", checked)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={formData.security.password}
              onChange={(e) =>
                handleInputChange("security", "password", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={formData.security.newPassword}
              onChange={(e) =>
                handleInputChange("security", "newPassword", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={formData.security.confirmPassword}
              onChange={(e) =>
                handleInputChange("security", "confirmPassword", e.target.value)
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Payment Methods",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Set up and manage payment methods",
      id: "payments",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={formData.payments.cardNumber}
              onChange={(e) =>
                handleInputChange("payments", "cardNumber", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input
                placeholder="MM/YY"
                value={formData.payments.expiry}
                onChange={(e) =>
                  handleInputChange("payments", "expiry", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>CVC</Label>
              <Input
                placeholder="123"
                value={formData.payments.cvc}
                onChange={(e) =>
                  handleInputChange("payments", "cvc", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Email Settings",
      icon: <Mail className="w-5 h-5" />,
      description: "Configure email notifications and templates",
      id: "email",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Sender Name</Label>
            <Input
              value={formData.email.senderName}
              onChange={(e) =>
                handleInputChange("email", "senderName", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Sender Email</Label>
            <Input
              type="email"
              value={formData.email.senderEmail}
              onChange={(e) =>
                handleInputChange("email", "senderEmail", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SMTP Host</Label>
              <Input
                value={formData.email.smtpHost}
                onChange={(e) =>
                  handleInputChange("email", "smtpHost", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>SMTP Port</Label>
              <Input
                type="number"
                value={formData.email.smtpPort}
                onChange={(e) =>
                  handleInputChange("email", "smtpPort", e.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>SMTP Username</Label>
            <Input
              value={formData.email.smtpUsername}
              onChange={(e) =>
                handleInputChange("email", "smtpUsername", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>SMTP Password</Label>
            <Input
              type="password"
              value={formData.email.smtpPassword}
              onChange={(e) =>
                handleInputChange("email", "smtpPassword", e.target.value)
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Regional Settings",
      icon: <Globe className="w-5 h-5" />,
      description: "Manage language and regional preferences",
      id: "regional",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              value={formData.regional.language}
              onValueChange={(value) =>
                handleInputChange("regional", "language", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select
              value={formData.regional.timezone}
              onValueChange={(value) =>
                handleInputChange("regional", "timezone", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                <SelectItem value="CET">Central European Time (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={formData.regional.currency}
              onValueChange={(value) =>
                handleInputChange("regional", "currency", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Appearance",
      icon: <Palette className="w-5 h-5" />,
      description: "Customize the look and feel of your dashboard",
      id: "appearance",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={formData.appearance.theme}
              onValueChange={(value) =>
                handleInputChange("appearance", "theme", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.appearance.primaryColor}
                onChange={(e) =>
                  handleInputChange(
                    "appearance",
                    "primaryColor",
                    e.target.value
                  )
                }
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span>{formData.appearance.primaryColor}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your store configuration</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-orange-500/85 hover:bg-orange-600/85"
        >
          <Settings className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {activeSection ? (
        <div>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setActiveSection(null)}
          >
            <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" />
            Back to all settings
          </Button>

          <Card className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                {settingsSections.find((s) => s.id === activeSection)?.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {settingsSections.find((s) => s.id === activeSection)?.title}
                </h2>
                <p className="text-gray-600">
                  {
                    settingsSections.find((s) => s.id === activeSection)
                      ?.description
                  }
                </p>
              </div>
            </div>

            {settingsSections.find((s) => s.id === activeSection)?.component}
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section) => (
            <Card
              key={section.id}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveSection(section.id)}
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
      )}

      {!activeSection && (
        <Card className="p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Danger Zone</h3>
              <p className="text-gray-600 mt-1">
                Permanent actions that cannot be undone
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
