"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Plus,
  Trash2,
  // PaypalIcon,
  // ApplePay,
  // GooglePay,
  AlertCircle,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "apple_pay" | "google_pay";
  last4?: string;
  expiry?: string;
  brand?: string;
  email?: string;
  isDefault: boolean;
}

const PAYMENT_TYPES = {
  card: {
    icon: <CreditCard className="w-6 h-6" />,
    label: "Credit/Debit Card",
  },
  paypal: {
    icon: <User className="w-6 h-6 text-[#00457C]" />,
    label: "PayPal",
  },
  apple_pay: {
    icon: <User className="w-6 h-6" />,
    label: "Apple Pay",
  },
  google_pay: {
    icon: <GrGoogle className="w-6 h-6" />,
    label: "Google Pay",
  },
};

export default function PaymentSection() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      expiry: "12/24",
      brand: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      email: "user@example.com",
      isDefault: false,
    },
  ]);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("card");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPaymentMethod = async (data: any) => {
    try {
      // Here you would typically:
      // 1. Validate the data
      // 2. Send to your payment processor (Stripe, PayPal, etc.)
      // 3. Save the token/payment method to your backend

      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: selectedType as PaymentMethod["type"],
        isDefault: false,
        ...(selectedType === "card" && {
          last4: data.cardNumber.slice(-4),
          expiry: `${data.expiryMonth}/${data.expiryYear.slice(-2)}`,
          brand: "Visa", // This would come from your payment processor
        }),
        ...(selectedType === "paypal" && {
          email: data.paypalEmail,
        }),
      };

      setPaymentMethods([...paymentMethods, newMethod]);
      setIsAddingMethod(false);
      reset();
      toast.success("Payment method added successfully!");
    } catch (error) {
      toast.error("Failed to add payment method");
      console.error(error);
    }
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods((methods) =>
      methods.filter((method) => method.id !== id)
    );
    toast.success("Payment method removed");
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    toast.success("Default payment method updated");
  };

  const renderPaymentMethodForm = () => {
    switch (selectedType) {
      case "card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input
                {...register("cardNumber", {
                  required: "Card number is required",
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: "Please enter a valid card number",
                  },
                })}
                placeholder="1234 5678 9012 3456"
                maxLength={16}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500">
                  {errors.cardNumber.message as string}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Month</Label>
                <Select
                  onValueChange={(value) => {
                    const event = { target: { value } };
                    register("expiryMonth").onChange(event);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0");
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year</Label>
                <Select
                  onValueChange={(value) => {
                    const event = { target: { value } };
                    register("expiryYear").onChange(event);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString();
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>CVV</Label>
                <Input
                  {...register("cvv", {
                    required: "CVV is required",
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: "Invalid CVV",
                    },
                  })}
                  type="password"
                  maxLength={4}
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        );

      case "paypal":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>PayPal Email</Label>
              <Input
                {...register("paypalEmail", {
                  required: "Email is required",
                  pattern: {
                    // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="your@email.com"
              />
              {errors.paypalEmail && (
                <p className="text-sm text-red-500">
                  {errors.paypalEmail.message as string}
                </p>
              )}
            </div>
          </div>
        );

      // Add more cases for other payment methods

      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {PAYMENT_TYPES[method.type].icon}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {method.type === "card"
                        ? `•••• ${method.last4}`
                        : method.email}
                    </p>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  {method.type === "card" && (
                    <p className="text-sm text-gray-500">
                      Expires {method.expiry}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleRemovePaymentMethod(method.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new payment method to your account
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(handleAddPaymentMethod)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select
                  onValueChange={setSelectedType}
                  defaultValue={selectedType}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PAYMENT_TYPES).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {renderPaymentMethodForm()}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddingMethod(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Payment Method</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
