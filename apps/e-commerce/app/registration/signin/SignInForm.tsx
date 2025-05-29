"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchUsers, loginUserAsync } from "@/redux/slices/userSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiWeb3Dotjs } from "react-icons/si";
import { useSelector } from "react-redux";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { push, refresh } = useRouter();
  const dispatch = useAppDispatch();
  const { status, users } = useSelector((state: RootState) => state.user);

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedRememberMe) {
      setRememberMe(true);
    }

    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFormSubmit = async (data: any) => {
    try {
      const foundUser = users.find((el) => el?.email === data.email);

      if (!foundUser) {
        toast.error("Wrong credentials: Try to sign up.");
        reset();
        return;
      }

      if ((foundUser as any)?.passwordHash === null) {
        const param = new URLSearchParams();
        param.set("userId", foundUser.id);
        push(`/pages/account/add_password?${param.toString()}`);
        toast.error("You signed in with Google. Enable email/password login.");
        return;
      }

      const formData = {
        email: data.email,
        password: data.password,
      };

      if (rememberMe) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("userEmail");
      }

      dispatch(loginUserAsync(formData));
      refresh();
      reset();
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred. Please try again.");
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
      {/* {isLoading && <LoadingState />} */}

      <div className="fixed top-4 left-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          onClick={() => push("/")}
        >
          <ArrowLeft size={18} /> Back to Home
        </Button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-300 p-6">
        <Card className="sm:w-[415px] max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center pt-2 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to access your account</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/registration/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              className="w-full bg-orange-500 my-7 disabled:cursor-not-allowed hover:bg-orange-600 text-white"
              disabled={status === "loading"}
            >
              {status === "loading" ? <ButtonLoader /> : "Sign In"}
            </Button>
          </form>

          <div className="text-center pt-7">
            <p className="text-sm text-gray-600">
              Dont have an account ?
              <Link
                href="/registration/signup"
                className=" text-blue-600 pl-1 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-center text-sm text-gray-600">
            <div className="h-[2px] w-full bg-gray-200" />
            <p>or</p>
            <div className="h-[2px] w-full bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4 py-3">
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
