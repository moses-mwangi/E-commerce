// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";

// // const MobileMoneyPayment = ({ amount = 2000, onSusccess }: any) => {
// const MobileMoneyPayment = ({ amount = 2000 }: any) => {
//   const [phone, setPhone] = useState("");
//   const [provider, setProvider] = useState("mtn");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const providers = [
//     { id: "mtn", name: "MTN Mobile Money" },
//     { id: "airtel", name: "Airtel Money" },
//     { id: "vodafone", name: "Vodafone Cash" },
//     { id: "tigo", name: "Tigo Pesa" },
//   ];

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");

//     try {
//       // Validate phone number
//       if (!phone.match(/^\d{10,15}$/)) {
//         throw new Error("Please enter a valid phone number");
//       }
//     } catch (err) {
//       setError((err as any).message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className=" bg-white rounded-b-md py-5 px-6">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <Label>Mobile Network</Label>
//           <Select
//             value={provider}
//             onValueChange={(e) => setProvider(e)}
//             required
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {providers.map((p) => (
//                   <SelectItem key={p.id} value={p.id}>
//                     {p.name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="form-group">
//           <Label htmlFor="phone">Phone Number</Label>
//           <Input
//             type="tel"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="e.g. 0244123456"
//             required
//           />
//         </div>

//         {error && <div className="error-message">{error}</div>}
//       </form>

//       <div className="payment-instructions">
//         <h4>How to pay:</h4>
//         <ol>
//           <li>Enter your mobile money details above</li>
//           <li>Click &quot;Pay with Mobile Money&quot;</li>
//           <li>Confirm payment on your phone when prompted</li>
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default MobileMoneyPayment;

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePaystackPayment } from "react-paystack";
import { usePayments } from "@/hooks/usePayment";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useCardContex } from "@/hooks/paymentContext";
import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";

const mobileNetworks = [
  { id: "mtn", name: "MTN Mobile Money" },
  { id: "airtel", name: "Airtel Money" },
  { id: "vodafone", name: "Vodafone Cash" },
  { id: "tigo", name: "Tigo Pesa" },
];

type Currency = "KES" | "NGN" | "USD" | "GHS" | "ZAR";
type PaymentChannels = "card" | "bank" | "ussd" | "qr" | "mobile_money";

const NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =
  String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) ||
  "pk_test_dd267338c5e11ee647740c3a98a3f62ab72be4cf";

export default function MobileMoneyPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [network, setNetwork] = useState("mtn");

  const { subtotal, currentUser, selectedOrder } = usePayments();
  const { formRef } = useCardContex();
  const { selectedCurrency } = useLanguage_Currency();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const reference = `order_${selectedOrder?.id || "new"}_${Date.now()}`;
  const config = {
    reference: reference,
    email: currentUser?.email || "customer@example.com",
    amount: subtotal * 100,
    publicKey: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: (selectedCurrency || "KES") as Currency as any,
    channels: ["mobile_money"] as PaymentChannels[],
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

  const onSuccess = (reference?: any) => {
    setIsProcessing(false);
    toast.success("Payment initiated successfully!");
    console.log("Payment reference:", reference);
  };

  const onClose = () => {
    setIsProcessing(false);
    toast.error("Payment was closed");
  };

  const onSubmit = (data: any) => {
    setIsProcessing(true);
    initializePayment(onSuccess, onClose);
  };

  return (
    <Card className="mx-auto bg-white rounded-t-none rounded-b-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-900">
          Mobile Money Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Network
            </Label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {mobileNetworks.map((net) => (
                  <SelectItem key={net.id} value={net.id}>
                    {net.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </Label>
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              type="tel"
              placeholder="08012345678"
              className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-800 mb-2">How to pay:</h4>
            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
              <li>Enter your mobile money details above</li>
              <li>Click &quot;Pay with Mobile Money&quot;</li>
              <li>Confirm payment on your phone when prompted</li>
            </ol>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isProcessing}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {isProcessing
            ? "Processing..."
            : `Pay ₦${(subtotal * 25).toFixed(2)}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
