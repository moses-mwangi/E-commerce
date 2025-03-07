"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Mail, Shield, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsSection() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log("Changing password...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch id="notifications" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <Label htmlFor="emails">Email Updates</Label>
              </div>
              <Switch id="emails" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <Label htmlFor="2fa">Two-Factor Authentication</Label>
              </div>
              <Switch id="2fa" />
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-5 h-5" />
          <h3 className="text-lg font-medium">Change Password</h3>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Update Password
          </Button>
        </form>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
        <Button variant="destructive" className="w-full">
          Delete Account
        </Button>
      </div>
    </div>
  );
}

