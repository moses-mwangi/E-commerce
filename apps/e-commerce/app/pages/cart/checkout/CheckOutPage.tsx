"use client";

import React from "react";
import CheckOutForm from "./CheckOutForm";
import PaymentProgress from "./orderPayments/PaymentProgress";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useCheckOut } from "@/hooks/useCheckOut";
import Image from "next/image";
import { Product } from "@/app/types/products";

interface OrderSummaryProps {
  products: (Product & { quantity?: number })[];
  orderNumber?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  orderNumber,
}) => {
  const subtotal = products.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const processingFee = subtotal * 0.01;
  const totalAmount = subtotal + processingFee;

  return (
    <Card className="p-6 rounded-xl shadow-lg border border-gray-100 max-w-[376px] w-full max-h-[calc(100vh-95px)] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          {orderNumber && (
            <span className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              {orderNumber}
            </span>
          )}
        </div>

        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
          {products.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="min-w-[80px] relative aspect-square">
                <Image
                  src={
                    item.productImages?.find((img) => img.isMain)?.url ||
                    "/placeholder-product.jpg"
                  }
                  alt={item.name}
                  fill
                  className="rounded-md object-cover border border-gray-200"
                  sizes="80px"
                />
              </div>
              <div className="text-gray-600 text-[13px]">
                <p className="font-medium text-gray-600 hover:underline cursor-pointer">
                  {item.brand} {item.name}
                </p>
                <p>
                  USD {item.price.toFixed(2)} × {item.quantity || 1}
                </p>
                <p className="text-xs text-gray-400">SKU: {"N/A"}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Subtotal ({products.length}{" "}
              {products.length === 1 ? "item" : "items"})
            </span>
            <span className="font-medium">USD ${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Processing Fee</span>
            <span className="font-medium">USD ${processingFee.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-gray-200 flex justify-between">
            <span className="text-gray-600 font-semibold">Total Amount</span>
            <span className="text-[18px] font-bold">
              USD ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center">
          By completing your purchase, you agree to our Terms of Service and
          Privacy Policy.
        </div>
      </div>
    </Card>
  );
};

export default function CheckOutPage() {
  const { id, products, items } = useCheckOut();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const buyProduct = id
    ? products.filter((el) => el.id.toString() === id.toString())
    : [];

  const cartProducts = items.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));

  const selectedProducts = id ? buyProduct : cartProducts;

  return (
    <div className="px-2 sm:px-4 md:px-14">
      <div className="pt-4 md:pt-8">
        <PaymentProgress val={1} />
      </div>
      <div className="flex pb-8 flex-col lg:flex-row gap-5 mx-auto w-full justify-center">
        <div className="max-w-3xl w-full">
          <CheckOutForm />
        </div>
        <div className="w-full lg:w-auto">
          <OrderSummary
            products={selectedProducts}
            orderNumber={orderNumber ? `ORD-${orderNumber}` : undefined}
          />
        </div>
      </div>
    </div>
  );
}
