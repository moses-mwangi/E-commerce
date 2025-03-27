"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { KeyRound, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchUsers,
  getCurrentUser,
  setPassword,
} from "@/redux/slices/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function AddingNewPassword() {
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();
  const params = useSearchParams();
  const { currentUser, users } = useSelector((state: RootState) => state.user);
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    setToken(token);

    dispatch(getCurrentUser());
    dispatch(fetchUsers());
    // return () => controller.abort();
  }, [dispatch]);

  const handleSetPassword = async (data: any) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }

      const userId = Number(params.get("userId"));
      if (userId) {
        const foundUser = users.find((el) => Number(el?.id) === userId);

        if (!foundUser) {
          toast.error("Wrong credentials: Try to sign up.");
          reset();
          return;
        }
      }
      const formData = {
        userId: Number(currentUser?.id) || userId,
        newPassword: String(data.newPassword),
        token: token,
      };

      await dispatch(setPassword(formData));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to set password");
      console.error("Set password error:", error);
    }
  };

  return (
    <>
      <div className="fixed top-4 left-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          onClick={() => push("/")}
        >
          <ArrowLeft size={18} /> Back to Home
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-300 p-6"
      >
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex items-center justify-center w-12 h-12 bg-orange-50 rounded-full">
              <KeyRound className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold">Set a Password</h1>
            <p className="text-gray-600">
              Since you signed in with Google, you can now set a password to
              enable email/password login.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSetPassword)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword.new ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="pr-10 focus-visible:ring-orange-500"
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="pr-10 focus-visible:ring-orange-500"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords don't match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Set Password
            </Button>
          </form>
        </Card>
      </motion.div>
    </>
  );
}
