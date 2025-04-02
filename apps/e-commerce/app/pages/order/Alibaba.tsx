"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ShoppingBag,
  Copy,
  Download,
  MessageSquare,
  Truck,
  Clock,
  Shield,
  Star,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductReviewForm from "./orderComponents/ProductReviewForm";

function OrdersPage() {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);
  const { push } = useRouter();
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getDate = (date: string) => {
    const dates = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = new Date(date).toLocaleTimeString();
    return `${dates}, ${time}`;
  };

  const copyToClipboard = (text: string, orderId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOrderId(orderId);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const handleCancelOrder = () => {
    console.log("Cancellation reason:", cancelReason);
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6 space-y-6">
      {orders.length === 0 ? (
        <Card className="p-4">
          <div className="bg-gray-100 mx-40 rounded-xl text-center py-10 min-h-[40svh]">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your order is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t ordered anything yet.
            </p>
            <Button
              className="bg-orange-500/90 hover:bg-orange-600"
              onClick={() => push("/pages/cart")}
            >
              Start Ordering now
            </Button>
          </div>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <Card className="bg-gray-100 p-2">
            <Accordion type="multiple" className="space-y-4">
              {orders.map((order) => (
                <AccordionItem key={order.id} value={`order-${order.id}`}>
                  <AccordionTrigger className="hover:no-underline flex justify-between items-center p-4 border rounded-lg shadow-md bg-white">
                    <div className="">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          Order Number #{order.id}
                        </span>
                        <div
                          className="h-6 w-6 flex text-gray-500 items-center justify-center"
                          onClick={() =>
                            copyToClipboard(String(order.id), String(order.id))
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </div>
                        {copiedOrderId === String(order.id) && (
                          <span className="text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Tracking Number : TRK-
                        {order?.trackingNumber?.toUpperCase()}
                      </p>

                      <p className="text-gray-600 text-sm">
                        Ordered on : {getDate(order.createdAt)}
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
                        {order?.status?.toUpperCase()}
                      </Badge>
                      <Badge
                        variant={
                          order.paymentStatus === "unpaid"
                            ? "destructive"
                            : ("success" as "outline")
                        }
                      >
                        {order?.paymentStatus?.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="gap-1 bg-gray-50 flex items-center justify-center rounded-md px-3 py-[6px] border border-gray-200 text-xs">
                        <Download size={15} className="" />
                        <span>Download</span>
                      </div>
                      <div className="gap-1 bg-gray-50 flex items-center justify-center rounded-md px-3 py-[6px] border border-gray-200 text-xs">
                        <MessageSquare size={15} className="" />
                        <span>Contact Supplier</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <Card className="">
                    <AccordionContent className="px-4 py-7">
                      <div className="mb-6">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Order Status</h3>
                          <Badge
                            variant={
                              order.status === "pending"
                                ? ("warning" as "destructive")
                                : ("success" as "outline")
                            }
                          >
                            {order.status.toUpperCase()}
                          </Badge>
                        </div>
                        <Progress
                          value={order.status === "pending" ? 20 : 100}
                          className="h-2"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <div className="text-center">
                            <div className="font-medium">Order</div>
                            <div className="text-xs">Order placed</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Payment</div>
                            <div className="text-xs">Payment completed</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Dispatch</div>
                            <div className="text-xs">
                              Preparing for shipment
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Delivery</div>
                            <div className="text-xs">On the way</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Review</div>
                            <div className="text-xs">Order completed</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <Truck className="h-4 w-4 mr-2" />
                              Shipping Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{order.shippingAddress}</p>
                            <p className="text-sm text-gray-500">
                              {order.User?.name} ({order.User?.email})
                            </p>
                            <p className="text-sm text-gray-500">
                              Phone: {order.User.telephone || "N/A"}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <Shield className="h-4 w-4 mr-2" />
                              Order Protections
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 text-green-600">
                                <Shield className="h-4 w-4 mt-0.5" />
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium">
                                  Delivery Guarantee
                                </p>
                                <p className="text-xs text-gray-500">
                                  Receive 10% compensation if delivery is
                                  delayed
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-shrink-0 text-green-600">
                                <Shield className="h-4 w-4 mt-0.5" />
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium">
                                  Quality Assurance
                                </p>
                                <p className="text-xs text-gray-500">
                                  Full refund if products don&apos;t meet
                                  specifications
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-shrink-0 text-green-600">
                                <Shield className="h-4 w-4 mt-0.5" />
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium">
                                  Secure Payment
                                </p>
                                <p className="text-xs text-gray-500">
                                  SSL encrypted transactions
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              Estimated Timeline
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                  Processing:
                                </span>
                                <span>1-3 business days</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping:</span>
                                <span>5-10 business days</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                <span>Estimated Delivery:</span>
                                <span>Mar 10, 2025</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="mb-6 bg-white">
                        <h3 className="font-medium mb-2">Product Details</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-3 grid grid-cols-12 font-medium text-sm">
                            <div className="col-span-5">Product</div>
                            <div className="col-span-2">Specifications</div>
                            <div className="col-span-2 text-right">
                              Unit Price
                            </div>
                            <div className="col-span-1 text-right">Qty</div>
                            <div className="col-span-2 text-right">Total</div>
                          </div>
                          {order.OrderItems.map((item) => (
                            <div key={item.id} className="">
                              <div className="p-3 border-t grid grid-cols-12 items-center text-sm">
                                <div className="col-span-5 flex items-center">
                                  <Image
                                    src={
                                      item.Product.productImages
                                        ? String(
                                            item.Product.productImages.find(
                                              (el: any) => el.isMain === true
                                            )?.url
                                          )
                                        : ""
                                    }
                                    alt={item.Product.name}
                                    width={60}
                                    height={60}
                                    className="rounded-md object-cover h-12 w-12 mr-3"
                                  />
                                  <div>
                                    <p className="font-medium">
                                      {item.Product.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      SKU: N/A
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 text-sm text-gray-500">
                                  Standard
                                </div>
                                <div className="col-span-2 text-right">
                                  ${item.price.toFixed(2)}
                                </div>
                                <div className="col-span-1 text-right">
                                  {item.quantity}
                                </div>
                                <div className="col-span-2 text-right font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                              {order.status === "completed" && (
                                <div className="p-3 bg-gray-50 border-t">
                                  {/* {!reviewData[
                                  `${order.id}-${item.Product.id}`
                                ] ? ( */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1"
                                      >
                                        <Star className="h-4 w-4" />
                                        Write a Review
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                      <ProductReviewForm
                                        productId="2"
                                        productName="Trying"
                                        productImage="/"
                                        onSuccess={() => {}}
                                      />
                                    </DialogContent>
                                  </Dialog>
                                  {/* ) : (
                                  <div className="flex items-center text-green-600">
                                    <Check className="h-4 w-4 mr-1" />
                                    <span>Thank you for your review!</span>
                                  </div>
                                )} */}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Supplier Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="font-medium">Supplier Name</p>
                              <p className="text-sm text-gray-500">
                                Member Since: 2020
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Visit Store
                              </Button>
                              <Button variant="outline" size="sm">
                                Chat Now
                              </Button>
                            </div>
                            <div className="pt-2 border-t">
                              <p className="text-sm font-medium">
                                Contact Info
                              </p>
                              <p className="text-sm text-gray-500">
                                Contact: John Doe
                              </p>
                              <p className="text-sm text-gray-500">
                                Phone: +86-123456789
                              </p>
                              <p className="text-sm text-gray-500">
                                Email: supplier@example.com
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Order Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Item Subtotal:</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span>- $34.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shipping Fee:</span>
                                <span>Free</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>$0.00</span>
                              </div>
                              <div className="border-t pt-2 flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
                              </div>
                              <div className="pt-2">
                                <p className="text-sm font-medium">
                                  Payment Method
                                </p>
                                <p className="text-sm text-gray-500">
                                  PayPal (john.doe@example.com)
                                </p>
                                <p className="text-sm text-gray-500">
                                  Status:{" "}
                                  {order.paymentStatus === "unpaid"
                                    ? "Pending"
                                    : "Completed"}
                                </p>
                              </div>
                              <div className="pt-2">
                                {order.paymentStatus === "unpaid" ? (
                                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                    Complete Payment
                                  </Button>
                                ) : (
                                  <Button variant="outline" className="w-full">
                                    Request Refund
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Tabs>
      )}
    </div>
  );
}

export default OrdersPage;
