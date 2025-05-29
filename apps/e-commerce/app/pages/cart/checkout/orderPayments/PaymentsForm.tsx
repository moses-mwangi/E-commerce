"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Shield } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import bank from "../../../../../public/paymentImages/bank.png";
import Card_Payment from "../../../../../public/paymentImages/card.png";
import M_Pesa from "../../../../../public/paymentImages/mpesa.png";
import BankTransferPayment from "../orderPayments/paymentMethods/BankTransferPayment";
import CardPayment from "../orderPayments/paymentMethods/CardPayment";
import MpesaPayment from "../orderPayments/paymentMethods/M_pesaPayment";
import MobileMoney from "./paymentMethods/MobileMoney";

import AvailableCard from "@/app/components/AvailableCards";
import { usePayments } from "@/hooks/usePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type PaymentMethod = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    title: "Credit/Debit Card",
    icon: Card_Payment as unknown as string,
    description: "Pay securely with your card",
  },
  {
    id: "mpesa",
    title: "M-Pesa",
    icon: M_Pesa as unknown as string,
    description: "Pay with M-Pesa mobile money",
  },
  {
    id: "mobile money",
    title: "Mobile Money",
    icon: M_Pesa as unknown as string,
    description: "Pay with MTN,Airtel, or other mobile wallets",
  },

  {
    id: "bank",
    title: "Bank Transfer",
    icon: bank as unknown as string,
    description: "Direct transfer from your bank account",
  },
];

export default function PaymentsForm({ setDetails }: any) {
  const {
    selectedPayment,
    paymentDetails,
    setPaymentDetails,
    setSelectedPayment,
    handleMpesaDetailsChange,
    handleBankDetailsChange,
    handleCardDetailsChange,
    handlePaypalDetailsChange,
  } = usePayments();

  useEffect(() => {
    setDetails(paymentDetails);
  }, [setDetails, paymentDetails]);

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
        onValueChange={(value) => {
          setSelectedPayment(value);
          setPaymentDetails({ method: value });
        }}
        className="space-y-4 bg-white "
      >
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            initial={false}
            animate={{
              backgroundColor:
                selectedPayment === method.id
                  ? "rgb(243 244 246)"
                  : "rgb(245,245,245)",
              //   "#f97316" // <- orange-500 in hex
              // : "#fff7ed", // <- orange-50 in hex
            }}
            className={` flex flex-col rounded-lg border bg-white  transition-all ${
              selectedPayment === method.id
                ? " border-orange-400 shadow-lg"
                : "border-gray-200"
            }`}
          >
            <div
              className={`${
                selectedPayment === method.id
                  ? " bg-orange-50 rounded-b-none"
                  : "bg-gray-50"
              } flex items-center rounded-lg gap-6 p-6`}
            >
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className={`${
                  selectedPayment === method.id ? " border-none" : ""
                }`}
              />
              <Label
                htmlFor={method.id}
                className="flex items-center gap-4  cursor-pointer"
              >
                <div>
                  <Image
                    src={method.icon as string}
                    alt="method_payment_logo"
                    width={60}
                    height={60}
                    className="h-11 rounded-full w-11 overflow-hidden"
                  />
                </div>
                {method.title === "Credit/Debit sCard" ? (
                  <div>
                    <AvailableCard />
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">{method.title}</p>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                )}
              </Label>
            </div>
            <div className=" w-full">
              <div className="">
                {selectedPayment === method.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      {method.title === "Credit/Debit Card" && (
                        <>
                          <Elements stripe={stripePromise}>
                            <CardPayment />
                          </Elements>
                        </>
                      )}
                      {method.title === "M-Pesa" && (
                        <MpesaPayment
                          onDetailsChange={handleMpesaDetailsChange}
                        />
                      )}
                      {method.title === "Mobile Money" && (
                        <MobileMoney
                        // onDetailsChange={handleMobileDetailsChange}
                        />
                      )}
                      {method.title === "Bank Transfer" && (
                        <BankTransferPayment
                        // onDetailsChange={handleBankDetailsChange}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" max-w-5xl w-full p-4"
    >
      <Card className="p-6 bg-white shadow-lg rounded-lg">
        <AnimatePresence mode="wait">{renderPaymentStep()}</AnimatePresence>
        <Separator className="my-8" />
      </Card>
    </motion.div>
  );
}
