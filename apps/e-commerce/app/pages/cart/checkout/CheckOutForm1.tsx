"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Loader2,
  ChevronRight,
  Shield,
  Truck,
  AlertCircle,
  CreditCard as CreditCardIcon,
  Phone,
  DollarSign,
  Banknote,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckOutForm } from "./formSchema";
import PaymentModal from "../PaymentModal";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";

type PaymentMethod = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  fields: {
    name: string;
    type: string;
    placeholder: string;
    pattern?: string;
    maxLength?: number;
  }[];
};

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

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    title: "Credit/Debit Card",
    icon: <CreditCardIcon className="w-5 h-5" />,
    description: "Pay securely with your card",
    fields: [
      {
        name: "cardNumber",
        type: "text",
        placeholder: "Card Number",
        pattern: "\\d*",
        maxLength: 16,
      },
      {
        name: "expiryDate",
        type: "text",
        placeholder: "MM/YY",
        pattern: "\\d*/\\d*",
        maxLength: 5,
      },
      {
        name: "cvv",
        type: "text",
        placeholder: "CVV",
        pattern: "\\d*",
        maxLength: 3,
      },
    ],
  },
  {
    id: "mpesa",
    title: "M-Pesa",
    icon: <Phone className="w-5 h-5" />,
    description: "Pay with M-Pesa mobile money",
    fields: [
      {
        name: "phoneNumber",
        type: "tel",
        placeholder: "M-Pesa Phone Number",
        pattern: "\\d*",
        maxLength: 12,
      },
    ],
  },
  {
    id: "paypal",
    title: "PayPal",
    icon: <DollarSign className="w-5 h-5" />,
    description: "Pay with your PayPal account",
    fields: [],
  },
  {
    id: "bank",
    title: "Bank Transfer",
    icon: <Banknote className="w-5 h-5" />,
    description: "Direct bank transfer",
    fields: [],
  },
];

export default function CheckoutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [step, setStep] = useState(1);
  const {
    onSubmit,
    handleSubmit,
    setValue,
    errors,
    register,
    watch,
    loadingLocation,
    handleUseCurrentLocation,
    currentUser,
  } = useCheckOutForm();
  const formProgress = (step / 3) * 100;
  const formValues = watch();

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const totalPrice = 6000;

  const handleNext = async () => {
    console.log(formValues);
    if (
      !formValues.email ||
      !formValues.phoneNumber ||
      !formValues.county ||
      !formValues.fullName ||
      !formValues.postcode
    ) {
      toast.success("Fill requred filled to procceds");
      // return;
    }
    if (step === 3) {
      await handleSubmit(onSubmit)();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderPaymentStep = () => (
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
        <Shield className="text-green-500 w-6 h-6" />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
        <AlertCircle className="text-blue-500 w-5 h-5 mt-0.5" />
        <p className="text-sm text-blue-700">
          Your payment information is secure and encrypted
        </p>
      </div>

      <RadioGroup
        value={selectedPayment}
        onValueChange={setSelectedPayment}
        className="space-y-4"
      >
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            initial={false}
            animate={{
              backgroundColor:
                selectedPayment === method.id ? "rgb(243 244 246)" : "white",
            }}
            className={`relative rounded-lg border p-4 transition-all ${
              selectedPayment === method.id
                ? "border-primary shadow-sm"
                : "border-gray-200"
            }`}
          >
            <RadioGroupItem
              value={method.id}
              id={method.id}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <Label
              htmlFor={method.id}
              className="flex items-center gap-4 pl-8 cursor-pointer"
            >
              <div
                className={`p-2 rounded-full ${
                  selectedPayment === method.id
                    ? "bg-primary text-white"
                    : "bg-gray-100"
                }`}
              >
                {method.icon}
              </div>
              <div>
                <p className="font-medium">{method.title}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </Label>

            {selectedPayment === method.id && method.fields.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pl-8 space-y-4"
              >
                {method.fields.map((field) => (
                  <div key={field.name}>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      pattern={field.pattern}
                      maxLength={field.maxLength}
                      className="max-w-sm"
                      onChange={(e) => {
                        if (field.name === "cardNumber") {
                          setCardNumber(e.target.value);
                        } else if (field.name === "phoneNumber") {
                          setMpesaNumber(e.target.value);
                        }
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </RadioGroup>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${totalPrice}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {deliveryMethod === "standard"
              ? "Free"
              : deliveryMethod === "express"
              ? "$9.99"
              : "$14.99"}
          </span>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">
            $
            {totalPrice +
              (deliveryMethod === "standard"
                ? 0
                : deliveryMethod === "express"
                ? 9.99
                : 14.99)}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4"
    >
      <div className="mb-8">
        <Progress value={formProgress} className="h-2 " />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className={step >= 1 ? "text-primary" : ""}>Shipping</span>
          <span className={step >= 2 ? "text-primary" : ""}>Delivery</span>
          <span className={step >= 3 ? "text-primary" : ""}>Payment</span>
        </div>
      </div>

      <Card className="p-6 bg-white shadow-lg rounded-lg">
        <AnimatePresence mode="wait">
          {step === 1 && (
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
                  Your personal information is encrypted and will only be used
                  for delivery purposes.
                </p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div className="col-span-2">
                  <Select onValueChange={(val) => setValue("country", val)}>
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
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div className=" col-span-2">
                  <Input
                    className=" focus-visible:ring-orange-500/60"
                    {...register("email")}
                    placeholder="Email Address"
                    defaultValue={String(currentUser?.email)}
                  />
                  {errors.county && (
                    <p className="text-red-500 text-xs">
                      {errors.county.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Input
                    {...register("fullName")}
                    placeholder="Full Name"
                    className="w-full focus-visible:ring-orange-500/60"
                    defaultValue={String(currentUser?.name)}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("phoneNumber")}
                    placeholder="Phone Number"
                    className="w-full focus-visible:ring-orange-500/60"
                    defaultValue={String(currentUser?.telephone)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For delivery updates only
                  </p>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <div className="flex gap-2">
                    <Input
                      {...register("streetAddress")}
                      placeholder="Street Address"
                      className="w-full focus-visible:ring-orange-500/60"
                      // defaultValue={String(currentUser?.)}
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
                  {errors.streetAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.streetAddress.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("apartment")}
                    placeholder="Apartment, Suite, Unit, Building, Floor (Optional)"
                    className="focus-visible:ring-orange-500/60"
                  />
                </div>

                <div>
                  <Input
                    {...register("postcode")}
                    placeholder="Postcode"
                    className="focus-visible:ring-orange-500/60"
                    defaultValue={String(currentUser?.zipcode)}
                  />
                  {errors.postcode && (
                    <p className="text-red-500 text-xs">
                      {errors.postcode.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("county")}
                    placeholder="State / Province / County"
                    className="focus-visible:ring-orange-500/60"
                    // defaultValue={String(currentUser?.)}
                  />
                  {errors.county && (
                    <p className="text-red-500 text-xs">
                      {errors.county.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("city")}
                    placeholder="City / Town"
                    className="focus-visible:ring-orange-500/60"
                    defaultValue={String(currentUser?.city)}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
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
                        className=""
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
          )}

          {step === 3 && renderPaymentStep()}
        </AnimatePresence>

        <Separator className="my-8" />

        <div className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            className={`bg-orange-500/85 hover:bg-orange-600/80 ${
              step === 1 ? "w-full" : ""
            }`}
            onClick={handleNext}
          >
            {step === 3 ? "Complete Order" : "Continue"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
    </motion.div>
  );
}
