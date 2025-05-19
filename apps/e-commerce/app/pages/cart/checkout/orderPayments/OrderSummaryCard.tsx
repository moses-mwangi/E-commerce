"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { mpesaPayment } from "@/redux/slices/PaymentSlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { usePayments } from "@/hooks/usePayment";
import { useCardContex } from "@/hooks/paymentContext";

export default function OrderSummaryCard({ details }: any) {
  const { selectedOrder, subtotal, totalAmount, processingFee } = usePayments();
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.payment);

  const { handlePaymentSubmit } = useCardContex();

  const paymentHandler = async () => {
    try {
      if (details.method === "card") {
        handlePaymentSubmit();
      } else if (details.method === "mpesa") {
        dispatch(mpesaPayment(details));
      } else if (details.method === "paypal") {
        console.log(details);
      } else if (details.method === "bank") {
        console.log(details);
      }
    } catch (err: any) {
      toast.error("Error:", err);
    }
  };

  if (!selectedOrder) return <div>Loading order details...</div>;
  return (
    <>
      <Card className="p-6 rounded-xl shadow-lg border border-gray-100 max-w-[376px] w-full max-h-[calc(100vh-95px)]   overflow-y-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            <span className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              ORD-#{selectedOrder.OrderItems[0]?.orderId}
            </span>
          </div>

          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
            {selectedOrder.OrderItems.map((item) => (
              <div key={item.id} className="flex gap-3  items-center">
                <div className="min-w-[80px]">
                  <Image
                    src={
                      item.Product?.productImages?.find((img) => img.isMain)
                        ?.url || "/placeholder-product.jpg"
                    }
                    alt={item.Product.name}
                    width={90}
                    height={90}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="text-gray-600 text-[13px]">
                  <p className="font-medium text-gray-600 hover:underline cursor-pointer">
                    {item.Product.brand} {item.Product.name}
                  </p>
                  <p>
                    {`${selectedOrder.currency} ${item.price} × ${item.quantity}`}
                  </p>
                  <p className="text-xs text-gray-400">
                    Order No: ORD-{new Date(item.createdAt).getFullYear()}-
                    {String(item.id || item.orderId).padStart(6, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({selectedOrder.OrderItems.length} items)
              </span>
              <span className="font-medium">
                {`${selectedOrder.currency} ${subtotal
                  .toFixed(2)
                  .toLocaleString()}`}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Processing Fee</span>
              <span className="font-medium">
                {`${selectedOrder.currency} ${processingFee
                  .toFixed(2)
                  .toLocaleString()}`}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="text-gray-600 font-semibold">Total Amount</span>
              <span className="text-[18px] font-bold">
                {/* USD ${totalAmount.toLocaleString()}.00 */}
                {`${selectedOrder.currency} ${totalAmount
                  .toFixed(2)
                  .toLocaleString()}`}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-orange-500/90 hover:bg-orange-600/85 text-white py-3 px-4 rounded-lg font-semibold shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
            onClick={() => paymentHandler()}
            disabled={status === "loading"}
          >
            {status === "loading" ? <ButtonLoader /> : "Complete Payment"}
          </Button>

          <div className="text-xs text-gray-400 text-center">
            By completing your purchase, you agree to our Terms of Service and
            Privacy Policy.
          </div>
        </div>
      </Card>
    </>
  );
}
