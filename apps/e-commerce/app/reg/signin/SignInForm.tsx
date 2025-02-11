"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";

import { FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { SiWeb3Dotjs } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { loginUserAsync } from "@/redux/slices/userSlice";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status } = useSelector((state: RootState) => state.user);

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const formData = {
        email: data.email,
        password: data.password,
      };

      dispatch(loginUserAsync(formData));
    } catch (err) {
      console.error(err);
    }
  };

  const loader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-300 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Sign In into Your Account
      </h1>
      <Card className="w-[415px] max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Welcome to Hypermat - AI-Powered Shopping
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email")}
              className="border-gray-300 focus-visible:ring-orange-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Label>Password</Label>
            <Input
              className=" focus-visible:ring-orange-400"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password?.message?.toString()}
              </p>
            )}

            <div className=" py-1">
              <p
                className="text-blue-600 hover:text-blue-500 cursor-pointer text-sm px-0 bg-none hover:bg-none"
                onClick={() => {
                  router.push("/reg/forgotPassword");
                }}
              >
                Forgot password?
              </p>
            </div>
          </div>

          <Button
            className="w-full bg-orange-500 my-7 disabled:cursor-not-allowed hover:bg-orange-600 text-white"
            disabled={status === "loading"}
          >
            {status === "loading" ? loader : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account?
          <button
            className="text-blue-600"
            onClick={() => router.push("/reg/signup")}
          >
            Sign Up
          </button>
        </p>
        <div className="mt-6 flex items-center gap-2 text-center text-sm text-gray-600">
          <div className="h-[2px] w-full bg-gray-200" />
          <p>or</p>
          <div className="h-[2px] w-full bg-gray-200" />
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
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
  );
}
