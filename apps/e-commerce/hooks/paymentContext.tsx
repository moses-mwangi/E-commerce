"use client";
import { createContext, useContext, useRef, ReactNode, RefObject } from "react";

type PaymentContextType = {
  handlePaymentSubmit: () => void;
  formRef: React.RefObject<HTMLFormElement | null>;
};

export const PaymentContext = createContext<PaymentContextType | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handlePaymentSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <PaymentContext.Provider value={{ handlePaymentSubmit, formRef }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function useCardContex() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
