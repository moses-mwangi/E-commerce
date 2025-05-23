// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { usePayments } from "@/hooks/usePayment";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   CheckIcon,
//   CopyIcon,
//   DownloadIcon,
//   ReceiptIcon,
//   RefreshCwIcon,
// } from "lucide-react";
// import toast from "react-hot-toast";
// // import { usePaystackTransfer } from "@/hooks/usePaystackTransfer";

// export default function BankTransferPayment() {
//   const { subtotal, currentUser, selectedOrder } = usePayments();
//   const [copiedField, setCopiedField] = useState<string | null>(null);
//   const [isTransferConfirmed, setIsTransferConfirmed] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verificationStatus, setVerificationStatus] = useState<
//     "pending" | "verified" | "failed"
//   >("pending");
//   // const { initiateTransfer, verifyTransfer } = usePaystackTransfer();

//   // Generate a consistent reference based on order ID
//   const reference = `ORDER-${
//     selectedOrder?.id || Math.floor(Math.random() * 1000000)
//   }`;

//   const bankDetails = {
//     bankName: "Example Bank",
//     accountName: "Your Store Name",
//     accountNumber: "1234567890",
//     reference: reference,
//     amount: subtotal * 25, // Convert to Naira
//   };

//   const copyToClipboard = (text: string, fieldName: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedField(fieldName);
//     toast.success(`${fieldName} copied!`);
//     setTimeout(() => setCopiedField(null), 2000);
//   };

//   const handleConfirmTransfer = async () => {
//     setIsTransferConfirmed(true);
//     toast.success("Thank you! We'll verify your payment shortly.");

//     // In a real implementation, you might:
//     // 1. Send a notification to your backend
//     // 2. Initiate automatic verification
//     startVerificationProcess();
//   };

//   const startVerificationProcess = async () => {
//     setIsVerifying(true);
//     try {
//       // Simulate verification delay
//       await new Promise((resolve) => setTimeout(resolve, 3000));

//       // In a real app, you would call your backend to verify with Paystack
//       // const isVerified = await verifyTransfer(reference);

//       // if (isVerified) {
//       //   setVerificationStatus("verified");
//       //   toast.success("Payment verified successfully!");
//       // } else {
//       //   setVerificationStatus("failed");
//       //   toast.error("Payment verification failed. Please contact support.");
//       // }
//     } catch (error) {
//       setVerificationStatus("failed");
//       toast.error("Error verifying payment");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const downloadBankDetails = () => {
//     const content = `
//       Bank Transfer Instructions
//       -------------------------
//       Bank Name: ${bankDetails.bankName}
//       Account Name: ${bankDetails.accountName}
//       Account Number: ${bankDetails.accountNumber}
//       Reference: ${bankDetails.reference}
//       Amount: ₦${bankDetails.amount.toFixed(2)}

//       Important Notes:
//       - Use the exact reference number
//       - Transfer the exact amount
//       - Payments may take 24 hours to verify
//     `;

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Bank_Details_${reference}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);

//     toast.success("Bank details downloaded");
//   };

//   return (
//     <Card className="mx-auto bg-white rounded-t-none rounded-b-lg shadow-md">
//       <CardHeader>
//         <CardTitle className="text-lg font-medium text-gray-900">
//           Bank Transfer
//         </CardTitle>
//         {verificationStatus === "verified" && (
//           <div className="flex items-center text-green-600 text-sm">
//             <CheckIcon className="h-4 w-4 mr-1" />
//             Payment Verified
//           </div>
//         )}
//         {verificationStatus === "failed" && (
//           <div className="flex items-center text-red-600 text-sm">
//             <span className="h-4 w-4 mr-1">!</span>
//             Verification Failed
//           </div>
//         )}
//       </CardHeader>

//       <CardContent>
//         <div className="space-y-4">
//           {isTransferConfirmed ? (
//             <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
//               <div className="flex items-center">
//                 {isVerifying ? (
//                   <>
//                     <RefreshCwIcon className="h-5 w-5 text-blue-600 animate-spin mr-2" />
//                     <span className="text-blue-800">
//                       Verifying your payment...
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
//                     <span className="text-green-800">
//                       {verificationStatus === "verified"
//                         ? "Payment verified successfully!"
//                         : "Transfer confirmed! We're verifying your payment."}
//                     </span>
//                   </>
//                 )}
//               </div>

//               {verificationStatus === "failed" && (
//                 <div className="mt-2 text-sm text-red-600">
//                   <p>We couldn&apos;t verify your payment automatically.</p>
//                   <p>Please send your receipt to payments@yourstore.com</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Please transfer{" "}
//                   <strong>₦{bankDetails.amount.toFixed(2)}</strong> to:
//                 </p>

//                 <div className="space-y-3">
//                   {Object.entries({
//                     "Bank Name": bankDetails.bankName,
//                     "Account Name": bankDetails.accountName,
//                     "Account Number": bankDetails.accountNumber,
//                     "Payment Reference": bankDetails.reference,
//                   }).map(([label, value]) => (
//                     <div
//                       key={label}
//                       className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
//                     >
//                       <div>
//                         <p className="text-xs text-gray-500">{label}</p>
//                         <p className="font-medium">{value}</p>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => copyToClipboard(value, label)}
//                       >
//                         {copiedField === label ? (
//                           <CheckIcon size={16} />
//                         ) : (
//                           <CopyIcon size={16} />
//                         )}
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
//                 <h4 className="font-medium text-yellow-800 mb-2">Important:</h4>
//                 <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
//                   <li>Use the exact reference number above</li>
//                   <li>Transfer the exact amount</li>
//                   <li>
//                     Payments may take up to 24 hours to verify automatically
//                   </li>
//                   <li>
//                     For faster processing, send receipt to
//                     payments@yourstore.com
//                   </li>
//                 </ul>
//               </div>
//             </>
//           )}
//         </div>
//       </CardContent>

//       <CardFooter className="flex justify-between gap-2">
//         {!isTransferConfirmed ? (
//           <>
//             <Button
//               variant="outline"
//               className="text-orange-500 border-orange-500 flex-1"
//               onClick={handleConfirmTransfer}
//             >
//               <CheckIcon className="h-4 w-4 mr-2" />
//               I&apos;ve Made the Transfer
//             </Button>
//             <Button
//               className="bg-orange-500 hover:bg-orange-600 flex-1"
//               onClick={downloadBankDetails}
//             >
//               <DownloadIcon className="h-4 w-4 mr-2" />
//               Download Details
//             </Button>
//           </>
//         ) : verificationStatus === "failed" ? (
//           <Button
//             className="bg-orange-500 hover:bg-orange-600 w-full"
//             onClick={() =>
//               (window.location.href = `mailto:payments@yourstore.com?subject=Payment Receipt for ${reference}&body=Please find attached my payment receipt for order ${reference}`)
//             }
//           >
//             <ReceiptIcon className="h-4 w-4 mr-2" />
//             Email Receipt to Support
//           </Button>
//         ) : null}
//       </CardFooter>
//     </Card>
//   );
// }

"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePaystackPayment } from "react-paystack";
import { usePayments } from "@/hooks/usePayment";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";

interface FormValues {
  fullName: string;
  email: string;
  bankCode: string;
}

type Currency = "KES" | "NGN" | "USD" | "GHS" | "ZAR";

const NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =
  String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) ||
  "pk_test_dd267338c5e11ee647740c3a98a3f62ab72be4cf";

// Sample bank codes - you should fetch these from Paystack's API in a real implementation
const bankCodes = {
  NGN: [
    { code: "057", name: "Zenith Bank" },
    { code: "058", name: "GTBank" },
    { code: "063", name: "Access Bank" },
  ],
  KES: [
    { code: "011", name: "KCB Bank" },
    { code: "031", name: "Cooperative Bank" },
  ],
  GHS: [
    { code: "030", name: "GCB Bank" },
    { code: "130", name: "CalBank" },
  ],
  ZAR: [
    { code: "051", name: "Standard Bank" },
    { code: "001", name: "Absa Bank" },
  ],
};

function BankTransferPayment() {
  const { subtotal, currentUser, selectedOrder } = usePayments();
  const { selectedCurrency } = useLanguage_Currency();
  const [isLoading, setIsLoading] = useState(false);
  const [bankTransferDetails, setBankTransferDetails] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: currentUser?.name || "",
      email: currentUser?.email || "",
      bankCode: "",
    },
  });

  const reference = `order_${selectedOrder?.id || "new"}_${Date.now()}`;

  const config = {
    reference: reference,
    email: currentUser?.email || "customer@example.com",
    amount: subtotal * 100, // Paystack expects amount in kobo
    publicKey: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: (selectedCurrency || "NGN") as Currency as any,
    channels: ["bank_transfer"] as any,
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
    onSuccess: (response: any) => {
      // This will be called after the bank transfer is initiated
      setBankTransferDetails(response);
      toast.success("Bank transfer initiated successfully!");
    },
    onClose: () => {
      toast.error("Bank transfer window was closed");
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Initialize Paystack payment with bank transfer option
      initializePayment();

      // Optionally send the details to your backend
      const paymentData = {
        email: data.email,
        reference: reference,
        name: data.fullName,
        amount: subtotal,
        orderId: selectedOrder?.id,
        userId: currentUser?.id,
        currency: selectedCurrency || "NGN",
        method: "bank_transfer",
        bankCode: data.bankCode,
        metadata: {
          name: data.fullName,
          email: data.email,
        },
      };

      await axios.post(
        "http://127.0.0.1:8000/api/payments/bank-transfer",
        paymentData
      );
    } catch (error) {
      toast.error("Failed to initiate bank transfer");
      console.error("Bank transfer error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentBanks =
    bankCodes[selectedCurrency as keyof typeof bankCodes] || [];

  return (
    <Card className="mx-auto bg-white border-t-0 rounded-t-none rounded-b-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-900">
          Bank Transfer Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bankTransferDetails ? (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium text-green-800 mb-2">
                Bank Transfer Instructions
              </h4>
              <p className="text-sm text-green-700 mb-4">
                Please transfer the exact amount to the account details below:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Bank Name</p>
                  <p className="text-sm">{bankTransferDetails.bank.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Account Number
                  </p>
                  <p className="text-sm">
                    {bankTransferDetails.bank.account_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Amount</p>
                  <p className="text-sm">
                    {subtotal} {selectedCurrency}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Reference</p>
                  <p className="text-sm font-mono">{reference}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
                <li>Complete the transfer within 24 hours</li>
                <li>Paystack will automatically verify your payment</li>
                <li>You&apos;ll receive a confirmation email</li>
                <li>Your order will be processed automatically</li>
              </ol>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </Label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Jane Doe"
                    className="bg-gray-50 placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border border-gray-300 rounded-md p-2 w-full"
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
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

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Bank
              </Label>
              <Controller
                name="bankCode"
                control={control}
                rules={{ required: "Bank selection is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Select your bank</option>
                    {currentBanks.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.bankCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bankCode.message}
                </p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">
                How Paystack Bank Transfer Works:
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                <li>
                  Select your bank and click &apos;Initiate Transfer&apos;
                </li>
                <li>
                  You&apos;ll see Paystack&apos;s generated account details
                </li>
                <li>Transfer the exact amount to the provided account</li>
                <li>Paystack automatically verifies your payment</li>
                <li>Your order is processed upon verification</li>
              </ol>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Initiate Bank Transfer"}
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default BankTransferPayment;
