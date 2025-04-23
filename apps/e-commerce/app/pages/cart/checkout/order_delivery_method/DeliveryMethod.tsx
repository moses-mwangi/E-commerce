"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Truck } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrderById } from "@/redux/slices/orderSlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";

const deliveryOptions = [
  {
    id: "standard",
    title: "Standard Delivery",
    description: "3-5 business days",
    price: "Free",
  },
  {
    id: "express",
    title: "Express Delivery",
    description: "1-2 business days",
    price: "$9.99",
  },
  {
    id: "same-day",
    title: "Same Day Delivery",
    description: "Delivered today",
    price: "$14.99",
  },
];

export default function DeliveryMethod() {
  const { back, push } = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [isLoading, setIsLoading] = useState(false);
  const orderId = localStorage.getItem("orderId");

  const dispatch: AppDispatch = useDispatch();
  const { selectedOrder } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(Number(orderId)));
  }, [dispatch, orderId]);

  const handleNext = async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.set("PaymentsOrderNo", String(selectedOrder?.id));
    push(`/pages/cart/checkout/orderPayments?${params.toString()}`);
  };

  const handleBack = () => {
    back();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="p-6 bg-white shadow-lg rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key="delivery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Delivery Method
              </h2>
              <Truck className="text-primary w-6 h-6" />
            </div>

            <RadioGroup
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
              className="space-y-4"
            >
              {deliveryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    deliveryMethod === option.id
                      ? "border-orange-500/70 bg-primary/5"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      className={`${
                        deliveryMethod === option.id ? "border-none" : ""
                      }`}
                      value={option.id}
                      id={option.id}
                    />
                    <div>
                      <Label htmlFor={option.id} className="font-medium">
                        {option.title}
                      </Label>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">{option.price}</span>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>

        <Separator className="my-8" />

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>

          <Button
            className={`bg-orange-500/85 hover:bg-orange-600/80 w-44`}
            onClick={handleNext}
            disabled={isLoading === true}
          >
            {isLoading === true ? <ButtonLoader /> : "Continue to payments"}
            {isLoading === true && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
