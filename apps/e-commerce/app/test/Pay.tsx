// Page.jsx

"use client";

import { PaymentProvider } from "@/hooks/paymentContext";
import { CardPaymentForm, ExternalPaymentButton } from "./Card";

export default function CheckoutPage() {
  return (
    <PaymentProvider>
      <div className="checkout-container">
        <div className="payment-section">
          <CardPaymentForm />
        </div>

        <div className="actions-section">
          <ExternalPaymentButton />
        </div>
      </div>
    </PaymentProvider>
  );
}
