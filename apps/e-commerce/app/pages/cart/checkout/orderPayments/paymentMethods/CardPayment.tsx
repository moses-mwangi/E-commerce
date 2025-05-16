"use client";
// /* eslint-disable @next/next/no-img-element */

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cardPayment } from "@/redux/slices/PaymentSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { usePayments } from "@/hooks/usePayment";
import { useCardContex } from "@/hooks/paymentContext";
import M_Pesa from "../../../../../../public/paymentImages/mpesa.png";
import anex from "../../../../../../public/paymentImages/amex.png";
import discover from "../../../../../../public/paymentImages/discoverCard.png";
import master from "../../../../../../public/paymentImages/masterCard.png";
import dinner from "../../../../../../public/paymentImages/dinnerCard.png";
import jcb from "../../../../../../public/paymentImages/jcbCard.png";
import unionPay from "../../../../../../public/paymentImages/unionPay.png";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardBrand } from "@stripe/stripe-js";
import Image, { StaticImageData } from "next/image";
import AvailableCard from "@/app/components/AvailableCards";

interface FormValues {
  firstName: string;
  surName: string;
}

const elementOptions = {
  style: {
    base: {
      fontSize: "15px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const cardBrands = [
  {
    name: "Visa",
    icon: M_Pesa,
  },
  {
    name: "Mastercard",
    icon: master,
  },
  {
    name: "American Express",
    icon: anex,
  },
  {
    name: "Discover",
    icon: discover,
  },
  {
    name: "JCB",
    icon: jcb,
  },
  {
    name: "Diners Club",
    icon: dinner,
  },
  {
    name: "UnionPay",
    icon: unionPay,
  },
  {
    name: "Card",
    icon: M_Pesa,
  },
  {
    name: "",
    icon: "",
  },
];

function CardPayment() {
  const stripe = useStripe();
  const dispatch: AppDispatch = useDispatch();
  const { subtotal, currentUser, selectedOrder } = usePayments();
  const { formRef } = useCardContex();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      surName: "",
    },
  });

  const handleCardChange =
    (field: keyof typeof cardComplete) => (event: any) => {
      setCardComplete((prev) => ({ ...prev, [field]: event.complete }));
    };

  const onSubmit = async (data: FormValues) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement)!,
        billing_details: {
          name: `${data.firstName} ${data.surName}`,
          email: "moses@gmail.com",
        },
      });

      if (error) {
        throw error;
      }

      if (paymentMethod) {
        const details = {
          firstName: data.firstName,
          surName: data.surName,
          paymentMethodId: paymentMethod.id,
        };
        const cardDetails = {
          name: `${details.firstName} ${details.surName}`,
          method: "card",
          amount: Math.round(subtotal * 100 * 25),
          customerId: 1,
          currency: "usd",
          paymentMethodId: paymentMethod.id,
          metadata: {
            userId: currentUser?.id || 1,
            orderId: selectedOrder?.id || 2,
            name: `${details.firstName} ${details.surName}`,
          },
        };
        const res = await dispatch(cardPayment(cardDetails));
        const clientSecret = res.payload.clientSecret;

        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });

        if (confirmError) {
          toast.error("Payment confirmation error:");
        } else if (paymentIntent?.status === "succeeded") {
          console.log("Payment successful!", paymentIntent);
          toast.success("Payment successful!");
        }
      }
    } catch (err: any) {
      console.error("Error creating payment method:", err);
    }
  };

  return (
    <div className="mx-auto bg-white rounded-b-lg shadow-md p-6">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Jane"
                  className="bg-gray-50 placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <Controller
              name="surName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Doe's"
                  className="bg-gray-50 border placeholder:text-gray-400 focus-visible:ring-orange-300 focus-visible:ring-1 border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            {errors.surName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.surName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </Label>
          <div className="border border-gray-300 rounded-md p-2  bg-gray-50">
            <CardNumberElement
              options={elementOptions}
              onChange={handleCardChange("cardNumber")}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
              <CardExpiryElement
                options={elementOptions}
                onChange={handleCardChange("cardExpiry")}
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
              <CardCvcElement
                options={elementOptions}
                onChange={handleCardChange("cardCvc")}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardPayment;

// "use client";

// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cardPayment } from "@/redux/slices/PaymentSlice";
// import { AppDispatch } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { usePayments } from "@/hooks/usePayment";
// import { useCardContex } from "@/hooks/paymentContext";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import visa from "../../../../../../public/visa.png";
// import mastercard from "../../../../../../public/masterCard.png";
// import amex from "../../../../../../public/amex.png";
// import discover from "../../../../../../public/discoverCard.png";
// import jcb from "../../../../../../public/jcbCard.png";
// import diners from "../../../../../../public/dinnerCard.png";
// import unionpay from "../../../../../../public/unionPay.png";

// interface FormValues {
//   firstName: string;
//   surName: string;
// }

// const cardBrands = [
//   { name: "Visa", icon: visa },
//   { name: "Mastercard", icon: mastercard },
//   { name: "American Express", icon: amex },
//   { name: "Discover", icon: discover },
//   { name: "JCB", icon: jcb },
//   { name: "Diners Club", icon: diners },
//   { name: "UnionPay", icon: unionpay },
// ];

// const elementOptions = {
//   style: {
//     base: {
//       fontSize: "16px",
//       color: "#2D3748",
//       fontFamily: '"Inter", sans-serif',
//       "::placeholder": {
//         color: "#A0AEC0",
//         opacity: 1,
//       },
//     },
//     invalid: {
//       color: "#E53E3E",
//     },
//   },
// };

// function CardPayment() {
//   const stripe = useStripe();
//   const dispatch: AppDispatch = useDispatch();
//   const { subtotal, currentUser, selectedOrder } = usePayments();
//   const { formRef } = useCardContex();
//   const elements = useElements();
//   const [cardComplete, setCardComplete] = useState({
//     cardNumber: false,
//     cardExpiry: false,
//     cardCvc: false,
//   });
//   const [cardType, setCardType] = useState<string | null>(null);
//   const [isFocused, setIsFocused] = useState({
//     cardNumber: false,
//     cardExpiry: false,
//     cardCvc: false,
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormValues>({
//     defaultValues: {
//       firstName: "",
//       surName: "",
//     },
//     mode: "onChange",
//   });

//   const handleCardChange =
//     (field: keyof typeof cardComplete) => (event: any) => {
//       setCardComplete((prev) => ({ ...prev, [field]: event.complete }));
//       if (field === "cardNumber" && event.brand) {
//         setCardType(event.brand);
//       }
//     };

//   const handleFocus = (field: keyof typeof isFocused) => () => {
//     setIsFocused((prev) => ({ ...prev, [field]: true }));
//   };

//   const handleBlur = (field: keyof typeof isFocused) => () => {
//     setIsFocused((prev) => ({ ...prev, [field]: false }));
//   };

//   const onSubmit = async (data: FormValues) => {
//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: elements.getElement(CardNumberElement)!,
//         billing_details: {
//           name: `${data.firstName} ${data.surName}`,
//           email: currentUser?.email || "user@example.com",
//         },
//       });

//       if (error) {
//         throw error;
//       }

//       if (paymentMethod) {
//         const details = {
//           firstName: data.firstName,
//           surName: data.surName,
//           paymentMethodId: paymentMethod.id,
//         };
//         const cardDetails = {
//           name: `${details.firstName} ${details.surName}`,
//           method: "card",
//           amount: Math.round(subtotal * 100 * 25),
//           customerId: currentUser?.id || 1,
//           currency: "usd",
//           paymentMethodId: paymentMethod.id,
//           metadata: {
//             userId: currentUser?.id || 1,
//             orderId: selectedOrder?.id || 2,
//             name: `${details.firstName} ${details.surName}`,
//           },
//         };
//         const res = await dispatch(cardPayment(cardDetails));
//         const clientSecret = res.payload.clientSecret;

//         const { paymentIntent, error: confirmError } =
//           await stripe.confirmCardPayment(clientSecret, {
//             payment_method: paymentMethod.id,
//           });

//         if (confirmError) {
//           toast.error(confirmError.message || "Payment confirmation error");
//         } else if (paymentIntent?.status === "succeeded") {
//           toast.success("Payment successful!");
//         }
//       }
//     } catch (err: any) {
//       console.error("Payment error:", err);
//       toast.error(err.message || "Payment failed. Please try again.");
//     }
//   };

//   const allFieldsComplete =
//     cardComplete.cardNumber && cardComplete.cardExpiry && cardComplete.cardCvc;

//   return (
//     <div className="max-w-md mx-auto">
//       <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//         <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-white text-xl font-semibold">
//               Secure Payment
//             </CardTitle>
//             <div className="flex space-x-1">
//               {cardBrands.map((brand, idx) => (
//                 <div
//                   key={idx}
//                   className={`transition-opacity duration-200 ${
//                     cardType === brand.name.toLowerCase()
//                       ? "opacity-100"
//                       : "opacity-40"
//                   }`}
//                 >
//                   <Image
//                     src={brand.icon}
//                     alt={brand.name}
//                     width={32}
//                     height={24}
//                     className="h-6 w-auto object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="p-6">
//           <div className="mb-6 text-sm text-gray-600">
//             <p>
//               We use bank-level security to protect your payment information.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <Controller
//                   name="firstName"
//                   control={control}
//                   rules={{ required: "First name is required" }}
//                   render={({ field }) => (
//                     <div>
//                       <Label
//                         htmlFor="firstName"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         First Name
//                       </Label>
//                       <Input
//                         {...field}
//                         id="firstName"
//                         placeholder="John"
//                         className={`bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                           errors.firstName
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } rounded-lg p-3 w-full`}
//                       />
//                       {errors.firstName && (
//                         <p className="mt-1 text-sm text-red-600">
//                           {errors.firstName.message}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 />
//               </div>
//               <div className="flex-1">
//                 <Controller
//                   name="surName"
//                   control={control}
//                   rules={{ required: "Last name is required" }}
//                   render={({ field }) => (
//                     <div>
//                       <Label
//                         htmlFor="surName"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         Last Name
//                       </Label>
//                       <Input
//                         {...field}
//                         id="surName"
//                         placeholder="Doe"
//                         className={`bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                           errors.surName ? "border-red-500" : "border-gray-300"
//                         } rounded-lg p-3 w-full`}
//                       />
//                       {errors.surName && (
//                         <p className="mt-1 text-sm text-red-600">
//                           {errors.surName.message}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label className="block mb-2 text-sm font-medium text-gray-700">
//                 Card Number
//               </Label>
//               <div
//                 className={`relative border ${
//                   isFocused.cardNumber
//                     ? "border-blue-500 ring-2 ring-blue-200"
//                     : "border-gray-300"
//                 } rounded-lg p-3 bg-gray-50 transition-all`}
//               >
//                 <CardNumberElement
//                   options={elementOptions}
//                   onChange={handleCardChange("cardNumber")}
//                   onFocus={handleFocus("cardNumber")}
//                   onBlur={handleBlur("cardNumber")}
//                   className="w-full"
//                 />
//                 {cardType && (
//                   <div className="absolute right-3 top-3">
//                     <Badge
//                       variant="outline"
//                       className="flex items-center gap-1 px-2 py-1"
//                     >
//                       {cardBrands.find((b) => b.name.toLowerCase() === cardType)
//                         ?.name || "Card"}
//                     </Badge>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <Label className="block mb-2 text-sm font-medium text-gray-700">
//                   Expiry Date
//                 </Label>
//                 <div
//                   className={`border ${
//                     isFocused.cardExpiry
//                       ? "border-blue-500 ring-2 ring-blue-200"
//                       : "border-gray-300"
//                   } rounded-lg p-3 bg-gray-50 transition-all`}
//                 >
//                   <CardExpiryElement
//                     options={elementOptions}
//                     onChange={handleCardChange("cardExpiry")}
//                     onFocus={handleFocus("cardExpiry")}
//                     onBlur={handleBlur("cardExpiry")}
//                   />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <Label className="block mb-2 text-sm font-medium text-gray-700">
//                   CVC
//                 </Label>
//                 <div
//                   className={`border ${
//                     isFocused.cardCvc
//                       ? "border-blue-500 ring-2 ring-blue-200"
//                       : "border-gray-300"
//                   } rounded-lg p-3 bg-gray-50 transition-all`}
//                 >
//                   <CardCvcElement
//                     options={elementOptions}
//                     onChange={handleCardChange("cardCvc")}
//                     onFocus={handleFocus("cardCvc")}
//                     onBlur={handleBlur("cardCvc")}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={!stripe || !allFieldsComplete || !isValid}
//                 className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
//                   !stripe || !allFieldsComplete || !isValid
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 } transition-colors shadow-md`}
//               >
//                 Pay ${subtotal.toFixed(2)}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-xs text-gray-500">
//             <p>Your payment is secured with 256-bit SSL encryption</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default CardPayment;
