"use client";
import { usePaystackPayment } from "react-paystack";
import { usePayments } from "@/hooks/usePayment";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLanguage_Currency from "../home-page/navbar/language_currency_change/useLanguage_Currency";

const NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =
  String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) ||
  "pk_test_dd267338c5e11ee647740c3a98a3f62ab72be4cf";

type Currency = "KES" | "NGN" | "USD" | "GHS" | "ZAR";
type PaymentChannels = "card" | "bank" | "ussd" | "qr" | "mobile_money";

function BankTransferPayment() {
  const { subtotal, currentUser, selectedOrder } = usePayments();
  const { selectedCurrency } = useLanguage_Currency();

  const reference = `order_${selectedOrder?.id || "new"}_${Date.now()}`;
  const config = {
    reference: reference,
    email: currentUser?.email || "customer@example.com",
    amount: 26544 * 100,
    // amount: subtotal * 100,
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

  const onSuccess = (ref?: any) => {
    toast.success("Bank transfer successful");
    console.log("Bank transfer ref:", ref);
    // You can now verify payment on your backend
  };

  const onClose = () => {
    toast.error("Bank transfer popup closed");
  };

  const handlePay = () => {
    initializePayment(onSuccess, onClose);
  };

  return (
    <Card className="mx-auto bg-white rounded-md shadow-md mt-6">
      <CardHeader>
        <CardTitle>Bank Transfer Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 text-sm">
          Click the button below to pay using a bank transfer. You&apos;ll get a
          test account number from Paystack.
        </p>
        <button
          onClick={handlePay}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Pay via Bank Transfer
        </button>
      </CardContent>
    </Card>
  );
}

export default BankTransferPayment;
