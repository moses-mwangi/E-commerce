"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiWeb3Dotjs } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { userSchema } from "@/utils/userSchema";
import { countries, phoneRegexByCountry } from "@/utils/services";
import { formToJSON } from "axios";
import LoadingState from "@/app/components/LoadingState";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countries[0].value);
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [flag, setFlag] = useState(countries[0].flag);

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
      const selectedCountryData = countries.find(
        (c) => c.value === selectedCountry
      );

      if (!selectedCountryData) {
        alert("Invalid country selection");
        return;
      }
      const tel =
        data.telephone.length === 10 ? data.telephone.slice(1) : data.telephone;

      const formData = {
        email: data.email,
        name: data.name,
        password: data.password,
        telephone: `+${countryCode}${tel}`,
        country: selectedCountry,
        tradeRole: data.tradeRole,
      };

      const regex = phoneRegexByCountry[selectedCountryData.value];
      if (!regex.test(formData.telephone)) {
        alert(
          `Phone number does not match the format for ${selectedCountryData.country}`
        );
        return;
      }

      const uniqueUser = users.find((el) => el?.email === formData.email);

      if (!uniqueUser) {
        dispatch(registerUserAsync(formData));
        reset();
        router.push("/");
        toast.success("Account created succefully");
      } else {
        toast.error("Failed to create:Try again");
      }
    } catch (err) {
      console.error(err);
      throw err;
      toast.error("Failed to create:Try again");
    }
  };

  const handleCountryChange = (value: string) => {
    const country = countries.find((c) => c.value === value);
    if (country) {
      setSelectedCountry(country.value);
      setCountryCode(country.code);
      setFlag(country.flag);
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
    <>
      {isLoading && <LoadingState />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-300 p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Create Your Account
        </h1>
        <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Welcome to Hypermat - AI-Powered Shopping
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <Label>Country / Region</Label>
              <Select
                defaultValue={selectedCountry}
                onValueChange={(value) => handleCountryChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                      {el.flag} {el.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                className=" focus-visible:ring-orange-400"
                type="password"
                {...register("passwordConfirm", {
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirm.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                {...register("name")}
                className="border-gray-300 focus-visible:ring-orange-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <Label>Telephone Number</Label>

              <div className="flex items-center relative gap-2 rounded-md border border-input bg-transparent pl-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                <div className="text-gray-700 text-sm text-nowrap flex gap-1">{`${flag} +${countryCode}`}</div>
                <Input
                  type="text"
                  className="focus-visible:ring-0 focus-visible:ring-ring border-0 shadow-none"
                  {...register("telephone")}
                />
              </div>

              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.telephone?.message?.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-5 gap-1">
              <Label>Trade Role</Label>
              <div className="flex gap-5">
                <span className="flex items-center gap-[5px]">
                  <input
                    className=" cursor-pointer"
                    type="radio"
                    value="buyer"
                    {...register("tradeRole")}
                  />
                  <p className=" text-sm font-medium text-gray-600">Buyer</p>
                </span>
                <span className="flex items-center gap-[5px]">
                  <input
                    className=" cursor-pointer"
                    type="radio"
                    value="seller"
                    {...register("tradeRole")}
                  />
                  <p className=" text-sm font-medium text-gray-600">Seller</p>
                </span>
                <span className="flex items-center gap-[5px]">
                  <input
                    className=" cursor-pointer"
                    type="radio"
                    value="both"
                    {...register("tradeRole")}
                  />
                  <p className=" text-sm font-medium text-gray-600">Both</p>
                </span>
              </div>
              {errors.tradeRole && (
                <p className="text-red-500 text-sm">
                  {errors.tradeRole.message?.toString()}
                </p>
              )}
            </div>
            <Button
              className="w-full bg-orange-500 disabled:cursor-not-allowed my-7 hover:bg-orange-600 text-white"
              disabled={status === "loading"}
            >
              {status === "loading" ? loader : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <button
              className="text-blue-600"
              onClick={() => {
                setIsLoading(true);
                router.push("/reg/signin");
              }}
            >
              Sign In
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
    </>
  );
}
