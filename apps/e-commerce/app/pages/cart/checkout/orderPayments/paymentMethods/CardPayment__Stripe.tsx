"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardContex } from "@/hooks/paymentContext";
import { usePayments } from "@/hooks/usePayment";
import { cardPayment } from "@/redux/slices/PaymentSlice";
import { AppDispatch } from "@/redux/store";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import anex from "../../../../../../public/paymentImages/amex.png";
import dinner from "../../../../../../public/paymentImages/dinnerCard.png";
import discover from "../../../../../../public/paymentImages/discoverCard.png";
import jcb from "../../../../../../public/paymentImages/jcbCard.png";
import master from "../../../../../../public/paymentImages/masterCard.png";
import M_Pesa from "../../../../../../public/paymentImages/mpesa.png";
import unionPay from "../../../../../../public/paymentImages/unionPay.png";

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
