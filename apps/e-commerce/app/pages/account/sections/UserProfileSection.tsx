"use client";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { UserProfileImage } from "@/components/users/UserProfileImage";
import React from "react";

export default function UserProfileSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <UserProfileImage />
          <Button variant="outline" size="sm">
            Change Photo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Street Name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input id="zipCode" placeholder="ZIP Code" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
