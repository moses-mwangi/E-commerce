"use client";

import { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { date } from "zod";

function OrdersPage() {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getDate = (date: string | number | Date) => {
    const orderDate = new Date(date).toLocaleString();

    return orderDate;
  };

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <Card className=" container p-4">
        <Accordion type="multiple" className="space-y-4">
          {orders.map((order) => (
            <AccordionItem key={order.id} value={`order-${order.id}`}>
              <AccordionTrigger className="hover:no-underline flex justify-between items-center p-4 border rounded-lg shadow-md bg-white">
                <div>
                  <h2 className="font-semibold">Order #{order.id}</h2>
                  <p className="text-gray-600 text-sm">
                    Tracking: {order.trackingNumber}
                  </p>

                  <p className="text-gray-600 text-sm">
                    Date : {getDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      order.status === "pending"
                        ? ("warning" as "destructive")
                        : ("success" as "outline")
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                  <Badge
                    variant={
                      order.paymentStatus === "unpaid"
                        ? "destructive"
                        : ("success" as "outline")
                    }
                  >
                    {order.paymentStatus.toUpperCase()}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border rounded-b-lg rounded-t-lg bg-gray-50">
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{order.shippingAddress}</p>
                    <p className="text-gray-500">
                      {order.User.name} ({order.User.email})
                    </p>
                    <p className="text-gray-500">
                      streat adress/P.O Box : off thika Road
                    </p>
                    <p className="text-gray-500">
                      Apartmen,unit,suite,building,floor : Karuguro Plaza
                    </p>
                    {/* <p className="text-gray-500">city : Ruiru</p>
                    <p className="text-gray-500">
                      state/province : Kiambu county
                    </p> */}
                  </CardContent>
                </Card>

                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.OrderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border rounded-lg bg-white"
                      >
                        <Image
                          src={item.Product.images[0]}
                          alt={item.Product.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover h-20 w-24"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.Product.name}</h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {order ? (
                      <>
                        <div className="space-y-2 text-sm font-semibold">
                          <div className="flex justify-between">
                            <span className=" text-gray-700">Subtotal:</span>
                            {/* <span>${order.subtotal.toFixed(2)}</span> */}
                            <span>${order.totalPrice}</span>
                          </div>
                          {/* {order.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>- ${order.discount.toFixed(2)}</span>
                          </div>
                        )} */}

                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>- $34</span>
                          </div>

                          <div className="flex justify-between">
                            <span className=" text-gray-700">Shipping:</span>
                            <span>
                              {/* {order.shippingFee > 0
                              ? `$${order.shippingFee.toFixed(2)}`
                              : "Free"} */}
                              Free
                            </span>
                          </div>
                          <div className="border-t pt-2 flex justify-between text-[16px]">
                            <span>Total Price:</span>
                            <span>${order.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="mt-4 text-gray-700 text-sm">
                          <p>
                            <strong className="">Payment Method : </strong>
                            Paypal
                            {/* {order.paymentMethod} */}
                          </p>
                          <p>
                            <strong>Estimated Delivery : </strong>
                            {/* {order.estimatedDeliveryDate} */}
                            {getDate(new Date())}
                          </p>
                        </div>

                        {order.paymentStatus === "unpaid" ? (
                          <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700">
                            Complete Payment
                          </Button>
                        ) : (
                          <Button className="mt-4 w-full bg-red-600 hover:bg-red-700">
                            Request Refund
                          </Button>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500 text-center">
                        No order data available.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}

export default OrdersPage;
