"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Mail,
  Shield,
  KeyRound,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  deleteUser,
  getCurrentUser,
  logoutUser,
  updatePassword,
} from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

interface SettingCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  id: string;
}

const SettingCard = ({ icon, label, description, id }: SettingCardProps) => (
  <Card className="p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-orange-50">{icon}</div>
        <div>
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch id={id} />
    </div>
  </Card>
);

const passwordFieldInfo = [
  {
    id: "currentPassword",
    label: "Current Password",
    key: "current",
  },
  { id: "newPassword", label: "New Password", key: "new" },
  {
    id: "confirmPassword",
    label: "Confirm New Password",
    key: "confirm",
  },
];

export default function SettingsSection() {
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePasswordChange = async (data: any) => {
    const formData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("New passwords don't match!");
        return;
      }
      dispatch(updatePassword(formData));
      router.push("/");
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password");
      console.error("Password update error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (emailToDelete !== currentUser?.email) {
      toast.error("Please enter the correct email to confirm deletion.");
      setEmailToDelete("");
      return;
    }

    try {
      const response = await dispatch(
        deleteUser(String(currentUser?.id))
      ).unwrap();

      if (response) {
        dispatch(logoutUser());
        toast.success("Account deleted successfully");
        document.cookie = `token=; path=/`;
        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Error deleting account:", error);
      setEmailToDelete("");

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete account. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
        <div className="space-y-4">
          <SettingCard
            icon={<Bell className="w-5 h-5 text-orange-600" />}
            label="Push Notifications"
            description="Get notified about order updates and promotions"
            id="notifications"
          />
          <SettingCard
            icon={<Mail className="w-5 h-5 text-orange-600" />}
            label="Email Updates"
            description="Receive our newsletter and special offers"
            id="emails"
          />
          <SettingCard
            icon={<Shield className="w-5 h-5 text-orange-600" />}
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            id="2fa"
          />
        </div>
      </div>

      <Separator className="my-8" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-orange-50">
            <KeyRound className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold">Change Password</h3>
        </div>
        <Card className="p-6">
          <form
            onSubmit={handleSubmit(handlePasswordChange)}
            className="space-y-4"
          >
            {passwordFieldInfo?.map(({ id, label, key }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <div className="relative">
                  <Input
                    id={id}
                    type={
                      showPasswords[key as keyof typeof showPasswords]
                        ? "text"
                        : "password"
                    }
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="pr-10"
                    {...register(`${id}`)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(
                        key as keyof typeof showPasswords
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords[key as keyof typeof showPasswords] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Update Password
            </Button>
          </form>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h3>
        <Card className="border-red-200 bg-red-50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Separator />
              <div className="flex flex-col gap-2 my-3">
                <Label className="text-gray-600 cursor-text">
                  Enter the account email
                  <span className="font-semibold text-[15px] text-gray-800 px-[6px]">
                    [ {currentUser?.email} ]
                  </span>
                  to continue:
                </Label>
                <Input
                  value={emailToDelete || ""}
                  onChange={(e) => setEmailToDelete(e.target.value)}
                  placeholder="Paste your account email"
                  className="py-1 text-sm h-9 bg-gray-50"
                />
              </div>
              <Separator />
              <AlertDialogFooter className="">
                <AlertDialogCancel className="border-gray-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </motion.div>
    </motion.div>
  );
}
