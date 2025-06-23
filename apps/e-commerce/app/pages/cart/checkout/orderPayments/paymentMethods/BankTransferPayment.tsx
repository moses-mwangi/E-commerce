// "use client";
// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { usePaystackPayment } from "react-paystack";
// import { usePayments } from "@/hooks/usePayment";
// import toast from "react-hot-toast";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import axios from "axios";
// import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";
// import { Button } from "@/components/ui/button";

// interface FormValues {
//   fullName: string;
//   email: string;
//   bankCode: string;
//   phone: number | string;
// }

// type Currency = "KES" | "NGN" | "USD" | "GHS" | "ZAR";
// type PaymentChannels = "card" | "bank" | "ussd" | "qr" | "mobile_money";

// const NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =
//   String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) ||
//   "pk_test_dd267338c5e11ee647740c3a98a3f62ab72be4cf";

// // Sample bank codes - you should fetch these from Paystack's API in a real implementation
// const bankCodes = {
//   NGN: [
//     { code: "057", name: "Zenith Bank" },
//     { code: "058", name: "GTBank" },
//     { code: "063", name: "Access Bank" },
//   ],
//   KES: [
//     { code: "011", name: "KCB Bank" },
//     { code: "031", name: "Cooperative Bank" },
//   ],
//   GHS: [
//     { code: "030", name: "GCB Bank" },
//     { code: "130", name: "CalBank" },
//   ],
//   ZAR: [
//     { code: "051", name: "Standard Bank" },
//     { code: "001", name: "Absa Bank" },
//   ],
// };

// function BankTransferPayment() {
//   const { subtotal, currentUser, selectedOrder } = usePayments();
//   const { selectedCurrency } = useLanguage_Currency();
//   const [isLoading, setIsLoading] = useState(false);
//   const [bankTransferDetails, setBankTransferDetails] = useState<any>(null);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>({
//     defaultValues: {
//       fullName: currentUser?.name || "",
//       email: currentUser?.email || "",
//       bankCode: "",
//       phone: "07**********",
//     },
//   });

//   const reference = `order_${selectedOrder?.id || "new"}_${Date.now()}`;

// const config = {
//   reference: reference,
//   email: currentUser?.email || "customer@example.com",
//   amount: subtotal * 100,
//   publicKey: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//   currency: (selectedCurrency || "KES") as Currency as any,
//   channels: ["bank"] as PaymentChannels[],
//   metadata: {
//     userId: currentUser?.id || 1,
//     orderId: selectedOrder?.id || 2,
//     custom_fields: [
//       {
//         display_name: "Order ID",
//         variable_name: "order_id",
//         value: selectedOrder?.id?.toString() || "2",
//       },
//     ],
//   },
// };

//   const initializePayment = usePaystackPayment(config);

// const onSuccess = (reference?: any) => {
//   setIsLoading(false);
//   toast.success("Payment initiated successfully!");
// };

// const onClose = () => {
//   setIsLoading(false);
//   toast.error("Payment was closed");
// };

//   const onSubmit = async (data: FormValues) => {
//     setIsLoading(true);
//     try {
//       initializePayment(onSuccess, onClose);

//       const paymentData = {
//         phone: data.phone,
//         bankCode: data.bankCode,
//         email: data.email || currentUser?.email,
//         reference: reference,
//         name: data.fullName,
//         amount: subtotal,
//         orderId: selectedOrder?.id,
//         userId: currentUser?.id,
//         currency: selectedCurrency || "KES",
//         method: "bank",
//         metadata: {
//           name: data.fullName,
//           email: data.email,
//         },
//       };

//       await axios.post(
//         "https://kivamall.up.railway.app/api/payments/initialize",
//         paymentData
//       );
//     } catch (error) {
//       toast.error("Failed to initiate bank transfer");
//       console.error("Bank transfer error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const currentBanks =
//     bankCodes[selectedCurrency as keyof typeof bankCodes] || [];

//   return (
//     <Card className="mx-auto bg-white border-t-0 rounded-t-none rounded-b-lg shadow-md">
//       <CardHeader>
//         <CardTitle className="text-lg font-medium text-gray-900">
//           Bank Transfer Payment
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {bankTransferDetails ? (
//           <div className="space-y-6">
//             <div className="bg-green-50 p-4 rounded-md">
//               <h4 className="font-medium text-green-800 mb-2">
//                 Bank Transfer Instructions
//               </h4>
//               <p className="text-sm text-green-700 mb-4">
//                 Please transfer the exact amount to the account details below:
//               </p>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Bank Name</p>
//                   <p className="text-sm">{bankTransferDetails.bank.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">
//                     Account Number
//                   </p>
//                   <p className="text-sm">
//                     {bankTransferDetails.bank.account_number}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Amount</p>
//                   <p className="text-sm">
//                     {subtotal} {selectedCurrency}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Reference</p>
//                   <p className="text-sm font-mono">{reference}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-md">
//               <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
//               <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
//                 <li>Complete the transfer within 24 hours</li>
//                 <li>Paystack will automatically verify your payment</li>
//                 <li>You&apos;ll receive a confirmation email</li>
//                 <li>Your order will be processed automatically</li>
//               </ol>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </Label>
//               <Controller
//                 name="fullName"
//                 control={control}
//                 rules={{ required: "Full name is required" }}
//                 render={({ field }) => (
//                   <Input
//                     {...field}
//                     placeholder="Jane Doe"
//                     className="bg-gray-50 placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border border-gray-300 rounded-md p-2 w-full"
//                   />
//                 )}
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </Label>
//               <Controller
//                 name="email"
//                 control={control}
//                 rules={{
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <Input
//                     {...field}
//                     type="email"
//                     placeholder="jane.doe@example.com"
//                     className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
//                   />
//                 )}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number
//               </Label>
//               <Controller
//                 name="phone"
//                 control={control}
//                 rules={{
//                   required: "Email is required",
//                 }}
//                 render={({ field }) => (
//                   <Input
//                     {...field}
//                     type="number"
//                     placeholder="+254 725******"
//                     className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
//                   />
//                 )}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-1">
//                 Select Your Bank
//               </Label>
//               <Controller
//                 name="bankCode"
//                 control={control}
//                 rules={{ required: "Bank selection is required" }}
//                 render={({ field }) => (
//                   <select
//                     {...field}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   >
//                     <option value="">Select your bank</option>
//                     {currentBanks.map((bank) => (
//                       <option key={bank.code} value={bank.code}>
//                         {bank.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               />
//               {errors.bankCode && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.bankCode.message}
//                 </p>
//               )}
//             </div>

//             <div className="bg-blue-50 p-4 rounded-md">
//               <h4 className="font-medium text-blue-800 mb-2">
//                 How Paystack Bank Transfer Works:
//               </h4>
//               <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
//                 <li>
//                   Select your bank and click &apos;Initiate Transfer&apos;
//                 </li>
//                 <li>
//                   You&apos;ll see Paystack&apos;s generated account details
//                 </li>
//                 <li>Transfer the exact amount to the provided account</li>
//                 <li>Paystack automatically verifies your payment</li>
//                 <li>Your order is processed upon verification</li>
//               </ol>
//             </div>
//           </form>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-end">
//         <Button
//           onClick={handleSubmit(onSubmit)}
//           disabled={isLoading}
//           className="w-full bg-orange-500 hover:bg-orange-600"
//         >
//           {isLoading ? "Processing..." : "Initiate Bank Transfer"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export default BankTransferPayment;

"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePaystackPayment } from "react-paystack";
import { usePayments } from "@/hooks/usePayment";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";
import { Button } from "@/components/ui/button";

interface FormValues {
  fullName: string;
  email: string;
  bankCode: string;
  phone: string;
}

type Currency = "KES" | "NGN" | "USD" | "GHS" | "ZAR";

const NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY =
  String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) ||
  "pk_test_dd267338c5e11ee647740c3a98a3f62ab72be4cf";

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
  } = useForm<FormValues>({
    defaultValues: {
      fullName: currentUser?.name || "",
      email: currentUser?.email || "",
      bankCode: "",
      phone: currentUser?.phone || "",
    },
  });

  const reference = `order_${selectedOrder?.id || "new"}_${Date.now()}`;

  const configs = {
    reference: reference,
    email: currentUser?.email || "customer@example.com",
    amount: subtotal * 100, // Paystack expects amount in kobo
    publicKey: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: (selectedCurrency || "NGN") as Currency,
    channels: ["bank_transfer"] as any, // Only bank transfers allowed
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

  const config = {
    reference: reference,
    email: currentUser?.email || "customer@example.com",
    amount: subtotal * 100,
    publicKey: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: (selectedCurrency || "KES") as Currency as any,
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
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (response?: any) => {
    setBankTransferDetails(response);
    toast.success("Bank transfer initiated successfully!");
    setIsLoading(false);
  };

  const onClose = () => {
    toast.error("Bank transfer window was closed");
    setIsLoading(false);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      initializePayment(onSuccess, onClose);

      const paymentData = {
        email: data.email,
        phone: data.phone,
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
          phone: data.phone,
        },
      };

      await axios.post(
        "https://kivamall.up.railway.app/api/payments/bank-transfer",
        paymentData
      );
    } catch (error) {
      toast.error("Failed to initiate bank transfer");
      console.error("Bank transfer error:", error);
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
                  <p className="text-sm">
                    {bankTransferDetails.data.bank.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Account Number
                  </p>
                  <p className="text-sm">
                    {bankTransferDetails.data.bank.account_number}
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

            <h1 className=" mt-4 py-5 text-[14px] font-semibold">
              The Bank Transfer Service Cooming soon
            </h1>

            {/* <div>
              <Label className="block  text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </Label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="tel"
                    placeholder="0712345678"
                    className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
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
            </div> */}

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">
                How Bank Transfer Works:
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                <li>
                  Select your bank and click &apos;Initiate Transfer&apos;
                </li>
                <li>You&apos;ll see our generated account details</li>
                <li>Transfer the exact amount to the provided account</li>
                <li>We&apos;ll automatically verify your payment</li>
                <li>Your order will be processed upon verification</li>
              </ol>
            </div>
          </form>
        )}
      </CardContent>
      {/* <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {isLoading ? "Processing..." : "Initiate Bank Transfer"}
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default BankTransferPayment;
