/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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

const phoneRegexByCountry: { [key: string]: RegExp } = {
  kenya: /^(?:\+254|0)(7\d{8}|1\d{8})$/,
  ghana: /^(?:\+233|0)[235][0-9]{8}$/,
  nigeria: /^(?:\+234|0)[789][01]\d{8}$/,
  tanzania: /^(?:\+255|0)7\d{8}$/,
  uganda: /^(?:\+256|0)7\d{8}$/,
  dubai: /^(?:\+971|0)5\d{8}$/,
};

const schema = z
  .object({
    email: z.string().email("Invalid email format"),
    name: z.string().min(1, "Full name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string().min(6, "Confirm password is required"),
    telephone: z
      .string()
      .min(1, "Telephone number is required")
      .regex(/^\d+$/, "Only numbers are allowed"),
    tradeRole: z.enum(["buyer", "seller", "both"], {
      errorMap: () => ({ message: "Trade role is required" }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

const countries = [
  { country: "Kenya", value: "kenya", code: "254", flag: "🇰🇪" },
  { country: "Ghana", value: "ghana", code: "233", flag: "🇬🇭" },
  { country: "Nigeria", value: "nigeria", code: "234", flag: "🇳🇬" },
  { country: "Tanzania", value: "tanzania", code: "255", flag: "🇹🇿" },
  { country: "Uganda", value: "uganda", code: "256", flag: "🇺🇬" },
  { country: "Dubai", value: "dubai", code: "971", flag: "🇦🇪" },
];

export default function SignupForm() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countries[0].value);
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [flag, setFlag] = useState(countries[0].flag);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: any) => {
    console.log("Form Errors:", errors);

    const selectedCountryData = countries.find(
      (c) => c.value === selectedCountry
    );

    if (!selectedCountryData) {
      alert("Invalid country selection");
      return;
    }
    const tel =
      data.telephone.length === 10 ? data.telephone.slice(1) : data.telephone;

    console.log(tel);

    const formData = {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
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

    console.log(formData);
  };

  const handleCountryChange = (value: string) => {
    const country = countries.find((c) => c.value === value);
    if (country) {
      setSelectedCountry(country.value);
      setCountryCode(country.code);
      setFlag(country.flag);
    }
  };

  return (
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
                <input type="radio" value="buyer" {...register("tradeRole")} />
                <p className=" text-sm font-medium text-gray-600">Buyer</p>
              </span>
              <span className="flex items-center gap-[5px]">
                <input type="radio" value="seller" {...register("tradeRole")} />
                <p className=" text-sm font-medium text-gray-600">Seller</p>
              </span>
              <span className="flex items-center gap-[5px]">
                <input type="radio" value="both" {...register("tradeRole")} />
                <p className=" text-sm font-medium text-gray-600">Both</p>
              </span>
            </div>
            {errors.tradeRole && (
              <p className="text-red-500 text-sm">
                {errors.tradeRole.message?.toString()}
              </p>
            )}
          </div>
          <Button className="w-full bg-orange-500 my-7 hover:bg-orange-600 text-white">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <button
            className="text-blue-600"
            onClick={() => router.push("/login")}
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
  );
}
