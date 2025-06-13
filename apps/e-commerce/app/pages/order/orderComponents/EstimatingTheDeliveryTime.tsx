"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import OrderTracking from "./OrderTracking";
import { Order } from "@/app/types/order";
import { addBusinessDays, differenceInBusinessDays, format } from "date-fns";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { PaymentData } from "@/redux/slices/PaymentSlice";
import axios from "axios";

const API_URL = process.env.API_URL || "https://kivamall.up.railway.app/api";

export default function EstimatingTheDeliveryTime({ order }: { order: Order }) {
  const dispatch: AppDispatch = useDispatch();
  const [payments, setPayments] = useState<PaymentData[] | [] | null>(null);

  const paymentOrder = payments?.find(
    (el) => el.orderId?.toString() === order.id?.toString()
  );

  useEffect(() => {
    async function getPayments() {
      const res = await axios.get(`${API_URL}/payment`);
      setPayments(res.data.payment);
    }
    getPayments();
  }, [dispatch]);

  return (
    <div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-black/90 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Estimated Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Processing Time */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Processing:</span>
              <span>
                {order.status === "pending"
                  ? "1-3 business days"
                  : order.status === "confirmed"
                  ? "Preparing your order"
                  : "Completed"}
              </span>
            </div>

            {/* Shipping Time */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping:</span>
              <span>
                {["shipped", "in_transit", "delivered"].includes(order.status)
                  ? `${calculateShippingDays(order)} business days`
                  : "Estimated 5-10 business days"}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Status:</span>
              <span
                className={
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-orange-600"
                }
              >
                {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                {order.paymentStatus === "paid" && paymentOrder && (
                  <span className="ml-1 text-xs text-gray-500">
                    {format(paymentOrder?.updatedAt, "MMM d, yyyy")}
                  </span>
                )}
              </span>
            </div>

            {/* Estimated Delivery Date */}
            <div className="flex justify-between text-sm font-medium pb-4">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span>{calculateEstimatedDelivery(order)}</span>
            </div>

            {/* Tracking Component */}
            <OrderTracking
              order={order}
              // carrier={order?.carrier || "Standard Shipping"}
              carrier={"Standard Shipping"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Calculate estimated delivery date
export function calculateEstimatedDelivery(order: Order) {
  if (order.status === "delivered") {
    return `Delivered on ${format(
      order.statusHistory.delivered,
      "MMM d, yyyy"
    )}`;
  }

  const processingDays = order.status === "confirmed" ? 3 : 0;
  const shippingDays = 7; // Average shipping time
  const estimatedDate = addBusinessDays(
    order.statusHistory.confirmed || new Date(),
    processingDays + shippingDays
  );

  return format(estimatedDate, "MMM d, yyyy HH:mm");
  // return format(order.statusHistory.shipped, "MMM d, yyyy");
}

// Calculate actual shipping days if shipped
export function calculateShippingDays(order: Order) {
  if (!order.statusHistory.shipped) return "5-10";

  const deliveredDate = order.statusHistory.delivered
    ? order.statusHistory.delivered
    : new Date();

  const days = differenceInBusinessDays(
    deliveredDate,
    order.statusHistory.shipped
  );

  return days > 0 ? days : "1-3";
}
