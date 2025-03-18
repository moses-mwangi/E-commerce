"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Lock,
  Mail,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { loginUser } from "@/redux/slices/userSlice copy";
import ButtonLoader from "../components/loaders/ButtonLoader";

export default function AdminEntryPage() {
  const { users, currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const { push, back } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedRememberMe) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    dispatch(fetchUsers());
    dispatch(getCurrentUser());
  }, [dispatch]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const unique = users.find((el) => el.email === formData.email);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (unique) {
        if (rememberMe) {
          localStorage.setItem("adminEmail", formData.email);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("adminEmail");
          localStorage.removeItem("rememberMe");
        }

        dispatch(loginUser(formData));
        toast.success("Welcome back, Admin!", {
          icon: "👋",
          duration: 4000,
        });
        push("/admin/dashboard");
      } else {
        toast.error("Invalid credentials", {
          icon: "🚫",
        });
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        icon: "❌",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  //// bg-gradient-to-b from-orange-100 to-orange-300
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-200 flex items-center justify-center p-4"
    >
      <div className="fixed top-6 left-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          onClick={() => back()}
        >
          <ArrowLeft size={18} /> Back to Home
        </Button>
      </div>
      <Card className="w-full max-w-md p-8 space-y-8 shadow-lg">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2"
        >
          {/* <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Admin Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div> */}
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to access your admin dashboard
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`pl-10 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
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
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </motion.p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/admin/forgot-password"
              className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-500/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading === true ? (
              <>
                <ButtonLoader />
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Sign in
              </>
            )}
          </Button>
        </form>

        <div className="pt-4 border-t text-center">
          <p className="text-sm text-gray-600">
            Having trouble logging in?
            <a
              href="#"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
            >
              Contact Support
            </a>
          </p>
        </div>

        {/* {process.env.NODE_ENV === "development" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <p className="text-sm text-blue-600 text-center">
              <strong>Demo Credentials:</strong>
              <br />
              Email: admin@example.com
              <br />
              Password: admin123
            </p>
          </motion.div>
        )} */}
      </Card>
    </motion.div>
  );
}
