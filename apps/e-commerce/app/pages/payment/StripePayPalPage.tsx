"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/order", {
        userId: 1,
        products: [{ productId: 1, quantity: 2 }],
        shippingAddress: "123 Street, City, Country",
        paymentMethod,
      });

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // 🔥 Redirect to Stripe/PayPal
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error starting checkout. Please try again.");
    }
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <Button onClick={() => setPaymentMethod("stripe")}>
        Pay with Stripe
      </Button>
      <Button onClick={() => setPaymentMethod("paypal")}>
        Pay with PayPal
      </Button>

      <Button onClick={handleCheckout} disabled={!paymentMethod}>
        Proceed to Pay
      </Button>
    </div>
  );
}
