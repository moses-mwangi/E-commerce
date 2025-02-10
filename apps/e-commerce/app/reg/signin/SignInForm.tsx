/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { SiWeb3Dotjs } from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";

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

export default function SignInForm() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].value);
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [flag, setFlag] = useState(countries[0].flag);

  const path = useRouter();

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

    console.log(formData.telephone);
    console.log(formData.telephone);

    if (!regex.test(formData.telephone)) {
      alert(
        `Phone number does not match the format for ${selectedCountryData.country}`
      );
      return;
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

  return (
    <div className=" h-svh overflow-y-scroll py-7">
      <h1 className="text-4xl flex items-center justify-center py-6 font-extrabold text-gray-900 tracking-wide">
        <span className="text-orange-500">Welcome to Hyper</span>mat
      </h1>

      <div className="flex w-full flex-col justify-center items-center">
        <Card className=" w-[430px] px-7 py-7">
          <h1 className="flex items-center justify-center text-gray-900 mb-4 text-2xl font-bold">
            Create an AI-Powered Account
          </h1>
          <form
            className=" flex flex-col gap-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <Label>Country / Region</Label>
              <Select
                defaultValue={`${flag} ${selectedCountry}`}
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
                className=" focus-visible:ring-orange-400"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label>password</Label>
              <Input
                type="password"
                className=" focus-visible:ring-orange-400"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label>Confirm password</Label>
              <Input
                type="password"
                className=" focus-visible:ring-orange-400"
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
                className=" focus-visible:ring-orange-400"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name?.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <Label>Telephone Number</Label>

              <div className="flex items-center relative gap-2 rounded-md border border-input bg-transparent pl-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                <div className="text-gray-700 text-sm text-nowrap flex gap-1">{`${flag} +${countryCode}`}</div>
                <Input
                  type="telephone"
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

            <div className="flex flex-col mt-3 gap-1">
              <Label>Trade Role</Label>
              <div className="flex gap-5">
                <span className="flex items-center gap-[5px]">
                  <input
                    type="radio"
                    value="buyer"
                    {...register("tradeRole")}
                  />
                  <p className=" text-sm font-medium text-gray-600">Buyer</p>
                </span>
                <span className="flex items-center gap-[5px]">
                  <input
                    type="radio"
                    value="seller"
                    {...register("tradeRole")}
                  />
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

            <div>
              <Button className=" w-full bg-orange-500 hover:bg-orange-600">
                Signun
              </Button>
            </div>
          </form>
          <div className="mt-6 text-sm text-center text-gray-600">
            Already have an account?
            <button
              className="text-blue-600"
              onClick={() => {
                path.push("/reg/signin");
              }}
            >
              Sign In
            </button>
          </div>
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
    </div>
  );
}
