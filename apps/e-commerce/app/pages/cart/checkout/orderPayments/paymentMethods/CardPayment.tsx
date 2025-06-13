"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { usePaystackPayment } from "react-paystack";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCardContex } from "@/hooks/paymentContext";
import { usePayments } from "@/hooks/usePayment";
import toast from "react-hot-toast";

import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";
import axios from "axios";

interface FormValues {
  firstName: string;
  surName: string;
  email: string;
}

type Currency = "KES" | "NGN" | "USD" | "GHS" | "ZAR";
type PaymentChannels = "card" | "bank" | "ussd" | "qr" | "mobile_money";

const NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =
  String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) ||
  "pk_test_dd267338c5e11ee647740c3a98a3f62ab72be4cf";

function CardPayment() {
  const { subtotal, currentUser, selectedOrder } = usePayments();
  const { formRef } = useCardContex();
  const { selectedCurrency } = useLanguage_Currency();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      surName: "",
      email: currentUser?.email || "",
    },
  });

  const reference = `order_${selectedOrder?.id || "new"}_${Date.now()}`;
  const config = {
    reference: reference,
    email: currentUser?.email || "customer@example.com",
    amount: subtotal * 100,
    publicKey: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: (selectedCurrency || "KES") as Currency as any,
    channels: ["card"] as PaymentChannels[],
    metadata: {
      userId: currentUser?.id || 1,
      orderId: selectedOrder?.id || 2,
      custom_fields: [
        {
          display_name: "Order ID",
          variable_name: "order_id",
          value: selectedOrder?.id?.toString() || "2",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const cardData = {
    email: currentUser?.email,
    reference: reference,
    name: currentUser?.name,
    amount: subtotal,
    orderId: selectedOrder?.id,
    userId: currentUser?.id,
    currency: selectedCurrency || "KES",
    // channels,
    method: "card",
    phone: "0725672675",
    metadata: {
      name: currentUser?.name,
      email: currentUser?.email,
    },
  };

  const initializePayments = async () => {
    await axios.post("http://127.0.0.1:8000/api/payments/initialize", cardData);
  };

  const onSuccess = (reference?: any) => {
    toast.success("Payment successful!");
  };

  const onClose = () => {
    toast.error("Payment was closed");
  };

  const onSubmit = async (data: FormValues) => {
    initializePayment(onSuccess, onClose);
    initializePayments();
  };

  return (
    <Card className="mx-auto bg-white border-t-0 rounded-t-none rounded-b-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-900">
          Card Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </Label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Jane"
                    className="bg-gray-50 placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border border-gray-300 rounded-md p-2 w-full"
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </Label>
              <Controller
                name="surName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Doe"
                    className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
                  />
                )}
              />
              {errors.surName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.surName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="jane.doe@example.com"
                  className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-800 mb-2">
              How card payment works:
            </h4>
            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
              <li>Click &quot;Complete Payment&quot; button</li>
              <li>
                You&apos;ll be redirected to Paystack&apos;s secure payment page
              </li>
              <li>Enter your card details on Paystack&apos;s page</li>
              <li>Complete authentication if required</li>
              <li>You&apos;ll be redirected back after payment</li>
            </ol>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default CardPayment;
