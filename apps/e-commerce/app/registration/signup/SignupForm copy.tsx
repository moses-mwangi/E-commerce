"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { SiWeb3Dotjs } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { userSchema } from "@/utils/userSchema";
import LoadingState from "@/app/components/loaders/LoadingState";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { status, users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const formData = {
        email: data.email,
        name: data.name,
        password: data.password,
      };
      const uniqueUser = users.find((el) => el?.email === formData.email);

      if (!uniqueUser) {
        dispatch(registerUserAsync(formData));
      } else {
        toast.error("Failed to create:Try again");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Failed to create:Try again");
      throw err;
    }
  };

  const handleLogInWithGoogle = async () => {
    try {
      window.location.href = "http://localhost:8000/api/auth/google";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="fixed top-4 left-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          onClick={() => router.push("/")}
        >
          <ArrowLeft size={18} /> Back to Home
        </Button>
      </div>
      {isLoading && <LoadingState />}

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-300 p-6">
        <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center pb-3 pt-1">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className={`focus-visible:ring-orange-400 pl-10 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  {...register("email")}
                  className={`pl-10 border-gray-300 focus-visible:ring-orange-400 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={`pl-10 pr-10 focus-visible:ring-orange-400 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <div className=" relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  className="pl-10 pr-10 focus-visible:ring-orange-400"
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  {...register("passwordConfirm", {
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirm.message?.toString()}
                </p>
              )}
            </div>

            <Button
              className="w-full bg-orange-500 disabled:cursor-not-allowed my-7 hover:bg-orange-600 text-white"
              disabled={status === "loading"}
            >
              {status === "loading" ? <ButtonLoader /> : "Sign Up"}
            </Button>
          </form>

          <div className="text-center mt-4 text-sm">
            <p className=" text-gray-600">
              Already have an account ?
              <Link
                href="/registration/signin"
                className="text-blue-600 pl-1 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-center text-sm text-gray-600">
            <div className="h-[2px] w-full bg-gray-200" />
            <p>or</p>
            <div className="h-[2px] w-full bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                handleLogInWithGoogle();
              }}
              className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FcGoogle size={20} />
            </button>
            <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaApple size={20} />
            </button>
            <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaFacebook size={20} />
            </button>
            <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
              <SiWeb3Dotjs size={20} />
            </button>
            <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaFingerprint size={20} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
