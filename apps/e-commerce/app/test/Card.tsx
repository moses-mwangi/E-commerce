"use client";
import { createContext, useContext, useRef, ReactNode, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { useCardContex } from "@/hooks/paymentContext";

export function CardPaymentForm() {
  const { formRef } = useCardContex();

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle payment logic here
    console.log("Payment submitted!");
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="payment-form">
      {/* Your card payment fields */}
      <input type="text" placeholder="Card number" />
      <input type="text" placeholder="Expiry date" />
      <input type="text" placeholder="CVV" />
    </form>
  );
}

export function ExternalPaymentButton() {
  const { handlePaymentSubmit } = useCardContex();

  return (
    <Button onClick={handlePaymentSubmit} className="pay-button">
      Complete Payment
    </Button>
  );
}
