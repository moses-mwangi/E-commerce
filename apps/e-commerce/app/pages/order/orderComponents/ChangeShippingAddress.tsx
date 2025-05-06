"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Loader2,
  ChevronRight,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { useAddress } from "./useAddressChange";

export default function ChangeShippingAddress({
  orderId,
  setToggleAddressEdit,
}: any) {
  const {
    onSubmit,
    loadingLocation,
    handleUseCurrentLocation,
    status,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    currentUserOrder,
    setOrderId,
  } = useAddress();

  const formValues = watch();

  const order = currentUserOrder.find(
    (el) => el.id.toString() === String(orderId)
  );

  useEffect(() => {
    if (currentUserOrder.length > 0) {
      const order = currentUserOrder.find(
        (el) => el.id.toString() === String(orderId)
      );
      if (orderId) {
        setOrderId(orderId);
      }
      reset({
        country: order?.country || "",
        email: order?.email || "",
        fullName: order?.fullName || "",
        phoneNumber: order?.phoneNumber || "",
        streetAddress: order?.streetAddress || "",
        apartment: order?.apartment || "",
        postcode: order?.postcode || "",
        county: order?.county || "",
        city: order?.city || "",
      });
    }
  }, [currentUserOrder, orderId, setOrderId, reset]);

  const handleNext = async () => {
    if (
      !formValues.email ||
      !formValues.phoneNumber ||
      !formValues.county ||
      !formValues.fullName ||
      !formValues.postcode
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await handleSubmit(onSubmit)();
    } catch (err) {
      toast.error("Error occurred while creating order");
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // className="max-w-4xl py mx-auto sm:p-4"
      className=" mx-auto ffffsm:p-4"
    >
      <Card className="sm:p-6 p-4 bg-white shadow-lg rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key="shipping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Shipping Address
              </h1>
              <Shield className="text-green-500 w-6 h-6" />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
              <AlertCircle className="text-blue-500 w-5 h-5 mt-0.5" />
              <p className="text-sm text-blue-700">
                Your personal information is encrypted and will only be used for
                delivery purposes.
              </p>
            </div>
            <form>
              {currentUserOrder.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="col-span-2">
                    <Select
                      defaultValue={order?.country}
                      onValueChange={(val) => setValue("country", val)}
                    >
                      <SelectTrigger className="w-full focus:ring-orange-500/60">
                        <SelectValue placeholder="Select Country / Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="Somalia">Somalia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <Input
                      className="focus-visible:ring-orange-500/60"
                      {...register("email")}
                      placeholder="Email Address"
                      defaultValue={currentUserOrder[0].email}
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <Input
                      {...register("fullName")}
                      placeholder="Full Name"
                      className="w-full focus-visible:ring-orange-500/60"
                      defaultValue={currentUserOrder[0].fullName}
                    />
                  </div>

                  <div>
                    <Input
                      {...register("phoneNumber")}
                      placeholder="Phone Number"
                      className="w-full focus-visible:ring-orange-500/60"
                      defaultValue={currentUserOrder[0].phoneNumber}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For delivery updates only
                    </p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex gap-2">
                      <Input
                        {...register("streetAddress")}
                        placeholder="Street Address"
                        className="w-full focus-visible:ring-orange-500/60"
                        defaultValue={currentUserOrder[0].streetAddress}
                      />
                      <Button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        disabled={loadingLocation}
                        variant="outline"
                        className="flex items-center gap-2 whitespace-nowrap"
                      >
                        {loadingLocation ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        Use My Location
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Input
                      {...register("apartment")}
                      placeholder="Apartment, Suite, Unit, Building, Floor (Optional)"
                      className="focus-visible:ring-orange-500/60"
                      defaultValue={currentUserOrder[0].apartment}
                    />
                  </div>

                  <div>
                    <Input
                      {...register("postcode")}
                      placeholder="Postcode"
                      className="focus-visible:ring-orange-500/60"
                      defaultValue={currentUserOrder[0].postcode}
                    />
                  </div>

                  <div>
                    <Input
                      {...register("county")}
                      placeholder="State / Province / County"
                      className="focus-visible:ring-orange-500/60"
                      defaultValue={currentUserOrder[0].county}
                    />
                  </div>

                  <div>
                    <Input
                      {...register("city")}
                      placeholder="City / Town"
                      className="focus-visible:ring-orange-500/60"
                      defaultValue={currentUserOrder[0].city}
                    />
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
        <Separator className="my-8" />

        <div className="flex justify-between">
          <Button
            className={`bg-orange-500/85 hover:bg-orange-600/80 w-full`}
            onClick={handleNext}
            disabled={status === "loading"}
          >
            {status !== "loading" ? "Continue" : <ButtonLoader />}
            {status !== "loading" && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
