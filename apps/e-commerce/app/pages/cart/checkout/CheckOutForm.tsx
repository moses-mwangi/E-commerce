"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckOutForm } from "./formSchema";

export default function CheckoutPage() {
  const {
    onSubmit,
    handleSubmit,
    setValue,
    errors,
    register,
    loadingLocation,
    handleUseCurrentLocation,
  } = useCheckOutForm();

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Shipping Address
      </h1>

      <p className="text-sm text-gray-600 mb-4">
        Your personal information is encrypted and will only be used for
        delivery purposes.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-3 gap-y-7"
      >
        <div>
          <Select onValueChange={(val) => setValue("country", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Country / Region" />
              <SelectContent>
                <SelectItem value="Kenya">Kenya</SelectItem>
                <SelectItem value="Tanzania">Tanzania</SelectItem>
                <SelectItem value="Uganda">Uganda</SelectItem>
                <SelectItem value="Somalia">Somalia</SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
          {errors.country && (
            <p className="text-red-500 text-xs">{errors.country.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("fullName")}
            placeholder="First Name and Last Name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Input {...register("phoneNumber")} placeholder="Phone Number" />
          <p className="text-xs text-gray-500 mt-1">
            Only used for delivery updates.
          </p>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <div className="flex gap-2">
            <Input
              {...register("streetAddress")}
              placeholder="Street Address or P.O. Box"
            />
            <Button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={loadingLocation}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              {loadingLocation ? (
                <Loader2 className="animate-spin" />
              ) : (
                <MapPin />
              )}
              Use my location
            </Button>
          </div>
          {errors.streetAddress && (
            <p className="text-red-500 text-xs">
              {errors.streetAddress.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("apartment")}
            placeholder="Apartment, Suite, Unit, Building, Floor (Optional)"
          />
        </div>

        <div>
          <Input {...register("postcode")} placeholder="Postcode" />
          {errors.postcode && (
            <p className="text-red-500 text-xs">{errors.postcode.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("county")}
            placeholder="State / Province / County"
          />
          {errors.county && (
            <p className="text-red-500 text-xs">{errors.county.message}</p>
          )}
        </div>

        <div>
          <Input {...register("city")} placeholder="City / Town" />
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>

        <Separator className="my-8 col-span-2" />

        <Button
          className="w-full bg-orange-600 hover:bg-orange-700 col-span-2"
          type="submit"
        >
          Proceed to Payment
        </Button>
      </form>
    </Card>
  );
}
