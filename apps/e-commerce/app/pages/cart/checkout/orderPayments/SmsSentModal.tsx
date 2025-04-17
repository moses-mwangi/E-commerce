"use client";

import { Separator } from "@/components/ui/separator";
import { resetPaymentState } from "@/redux/slices/PaymentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { FcSms } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { MdPhoneIphone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function SmsSentModal({ details }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { status, MerchantRequestID, paymentMethod } = useSelector(
    (state: RootState) => state.payment
  );

  useEffect(() => {
    if (
      status === "succeeded" &&
      MerchantRequestID !== null &&
      paymentMethod === "mpesa"
    ) {
      document.body.style.overflow = "hidden";
      setIsOpen(true);
    } else {
      document.body.style.overflow = "";
      setIsOpen(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [status, isOpen, MerchantRequestID, paymentMethod]);

  return (
    <>
      {status === "succeeded" && isOpen === true && (
        <div className="fixed inset-0 z-50 backdrop-blur-[2px]  bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white w-[470px] rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-center text-green-600 text-sm">
                <FcSms size={20} />
                <p>Send you a SMS</p>
              </div>
              <div className="flex flex-col items-center text-gray-500 text-sm">
                <MdPhoneIphone size={20} />
                <p>Pay with your cellphone</p>
              </div>
              <div className="flex flex-col items-center text-gray-500 text-sm">
                <GiConfirmed size={20} />
                <p>Confirm the result</p>
              </div>
            </div>
            <Separator className="my-4" />

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              SMS send successfully
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Please follow the payment instructions in the text message you
              received. And then come back to confirm your payment result.
            </p>

            <button
              onClick={() => {
                dispatch(resetPaymentState());
                setIsOpen(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 transition text-white text-sm font-semibold px-4 py-2 rounded-md w-full"
            >
              Check payment status
            </button>
          </div>
        </div>
      )}
    </>
  );
}
