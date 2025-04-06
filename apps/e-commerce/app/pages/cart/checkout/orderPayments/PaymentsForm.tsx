"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Shield, AlertCircle, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";

import { useCheckOutForm } from "../useCheckOutForm";
import PaymentModal from "../../PaymentModal";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import CardPayment from "../orderPayments/paymentMethods/CardPayment";
import MpesaPayment from "../orderPayments/paymentMethods/M_pesaPayment";
import PaypalPayment from "../orderPayments/paymentMethods/PaypalPayment";
import BankTransferPayment from "../orderPayments/paymentMethods/BankTransferPayment";

import PayPal from "../../../../../public/amex.png";
import M_Pesa from "../../../../../public/mpesa.png";
import Card_Payment from "../../../../../public/card.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    id: "paypal",
    title: "PayPal",
    icon: PayPal as unknown as string,
    description: "Pay with your PayPal account",
  },
  {
    id: "bank",
    title: "Bank Transfer",
    icon: <Banknote className="w-5 h-5" />,
    description: "Direct bank transfer",
  },
];

export default function PaymentsForm() {
  const { back, push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [step, setStep] = useState(3);
  const { onSubmit, handleSubmit, watch } = useCheckOutForm();
  const formProgress = (step / 3) * 100;
  const formValues = watch();

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const totalPrice = 6000;

  const handleNext = async () => {
    console.log("moses");
    toast.success("Succefully paid");
  };

  const handleBack = () => {
    back();
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
        className="space-y-4 bg-white "
      >
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            initial={false}
            animate={{
              backgroundColor:
                selectedPayment === method.id ? "rgb(243 244 246)" : "white",
            }}
            className={` flex items-center rounded-lg border bg-white py-8 px-8 transition-all ${
              selectedPayment === method.id
                ? " border-orange-400/70 shadow-sm"
                : "border-gray-200"
            }`}
          >
            <RadioGroupItem value={method.id} id={method.id} className="" />
            <div className=" w-full">
              <Label
                htmlFor={method.id}
                className="flex items-center gap-4 pl-8  cursor-pointer"
              >
                <div
                  className={`${
                    method.title !== "M-Pesa" &&
                    method.title !== "PayPal" &&
                    method.title !== "Credit/Debit Card"
                      ? "p-4"
                      : ""
                  } rounded-full ${
                    selectedPayment === method.id
                      ? "bg-primary/70 text-white"
                      : // "bg-orange-100 text-gray-600"
                        "bg-gray-100 "
                  }`}
                >
                  {method.title !== "M-Pesa" &&
                  method.title !== "PayPal" &&
                  method.title !== "Credit/Debit Card" ? (
                    method.icon
                  ) : (
                    <Image
                      src={method.icon as string}
                      alt="method_payment_logo"
                      width={60}
                      height={60}
                      className="h-11 rounded-full w-11 overflow-hidden"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium">{method.title}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </Label>
              <div className="">
                {selectedPayment === method.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pl-9 space-y-4"
                  >
                    <div>
                      {method.title === "Credit/Debit Card" && <CardPayment />}
                      {method.title === "M-Pesa" && <MpesaPayment />}
                      {method.title === "PayPal" && <PaypalPayment />}
                      {method.title === "Bank Transfer" && (
                        <BankTransferPayment />
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
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
          {step === 3 && renderPaymentStep()}
        </AnimatePresence>

        <Separator className="my-8" />

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>

          <Button
            className={`bg-orange-500/85 hover:bg-orange-600/80 ${
              step === 1 ? "5rrrw-full" : ""
            }`}
            onClick={handleNext}
          >
            Complete Payments
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
    </motion.div>
  );
}
