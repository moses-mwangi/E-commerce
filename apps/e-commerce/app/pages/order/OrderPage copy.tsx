/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrders } from "@/redux/slices/orderSlice";

export default function OrderPage() {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        My Orders
      </h1>
      <div className="space-y-6">
        {orders?.map((order) => (
          <Card
            key={order.id}
            className="p-4 bg-white dark:bg-gray-800 shadow-md"
          >
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Order : {order.trackingNumber}
                </h2>
                <span className="text-gray-600 dark:text-gray-400">
                  {order.createdAt}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Status: {order.status}
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-bold">
                Total: {order.totalPrice}
              </p>
              <div className="mt-4 space-y-4">
                {order?.OrderItems?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.Product.images[2]}
                      alt={item.Product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                        {item.Product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Truck /> Track Order
                </Button>
                <Button className="flex items-center gap-2">
                  <CheckCircle /> Reorder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
