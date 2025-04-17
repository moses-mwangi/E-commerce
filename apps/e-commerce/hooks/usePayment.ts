import { fetchOrderById } from "@/redux/slices/orderSlice";
import { getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type PaymentDetails = {
  method: string;
  card?: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
    orderId: number;
  };
  mpesa?: {
    phone: string;
    firstName: string;
    surname: string;
  };
  paypal?: {
    orderId: number;
    email: "";
    firstName: "";
    lastName: "";
  };
  bank?: {
    orderId: number;
    accountNumber: string;
    accountName: string;
    bankName: string;
    swiftCode?: string;
    iban?: string;
  };
};

interface P {
  setDetails: any | undefined;
}

export function usePayments({ details }: { details?: any } = {}) {
  const dispatch: AppDispatch = useDispatch();
  const { selectedOrder } = useSelector((state: RootState) => state.order);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("PaymentsOrderNo"));
  const cardPaymentRef = useRef<any>(null);

  const [step, setStep] = useState(3);
  const formProgress = (step / 3) * 100;
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: "card",
  });

  useEffect(() => {
    dispatch(fetchOrderById(id));
    dispatch(getCurrentUser());
    setSelectedPayment(paymentDetails.method);
  }, [dispatch, id, setSelectedPayment, paymentDetails]);

  const subtotal =
    selectedOrder?.OrderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  const processingFee = 13;
  const totalAmount = subtotal + processingFee;

  const handleCardDetailsChange = (details: any) => {
    const cardDetails = {
      name: `${details.firstName} ${details.surName}`,
      method: "card",
      amount: Math.round(subtotal * 100 * 25),
      customerId: currentUser?.id || 1,
      paymentMethodId: details?.paymentMethodId,
      currency: "usd",
      metadata: {
        userId: 1 || currentUser?.id,
        orderId: selectedOrder?.id || undefined,
        name: `${details.firstName} ${details.surName}`,
      },
    };
    setPaymentDetails(cardDetails);
  };

  const handleMpesaDetailsChange = (details: {
    phone: string;
    firstName: string;
    surname: string;
  }) => {
    const mpesaDetails = {
      name: `${details.firstName} ${details.surname}`,
      phone: `254${
        details.phone.length === 10 ? details.phone.slice(1) : details.phone
      }`,
      method: "mpesa",
      orderId: selectedOrder?.id || undefined,
      amount: subtotal,
    };
    setPaymentDetails(mpesaDetails);
  };

  const handlePaypalDetailsChange = (details: any) => {
    setPaymentDetails({
      method: "paypal",
      paypal: details,
    });
  };

  const handleBankDetailsChange = (details: any) => {
    setPaymentDetails({
      method: "bank",
      bank: details,
    });
  };

  return {
    selectedOrder,
    subtotal,
    totalAmount,
    processingFee,
    id,
    selectedPayment,
    formProgress,
    paymentDetails,
    setSelectedPayment,
    step,
    setPaymentDetails,
    handleMpesaDetailsChange,
    handleBankDetailsChange,
    handleCardDetailsChange,
    handlePaypalDetailsChange,
    details,
    cardPaymentRef,
    currentUser,
  };
}
