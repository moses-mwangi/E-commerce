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
  ShoppingBag,
  Copy,
  Download,
  MessageSquare,
  Truck,
  Clock,
  Shield,
  Star,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import ProductReviewForm from "./orderComponents/ProductReviewForm";
import { Order } from "@/app/types/order";
import Modal from "./orderComponents/ModalChangeShippingAddress";
import { fetchReviews } from "@/redux/slices/ReviewsRatingSlice";
import EditReviewForm from "./orderComponents/EditReview";
import PaymentProgress from "../cart/checkout/orderPayments/PaymentProgress";
import LoadingState from "@/app/components/loaders/LoadingState";
import EstimatingTheDeliveryTime from "./orderComponents/EstimatingTheDeliveryTime";
import SupplierAndPaymentsSummary from "./orderComponents/SupplierAndPaymentsSummary";

const tabsValues = [
  {
    value: "all",
    option: "All Orders",
  },
  {
    value: "unpaid",
    option: "Unpaid",
  },
  {
    value: "processing",
    option: "Processing",
  },
  {
    value: "shipped",
    option: "Shipped",
  },
  {
    value: "completed",
    option: "Completed",
  },
  {
    value: "cancelled",
    option: "Cancelled",
  },
];

function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);
  const { push } = useRouter();
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | number | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [toggleAddressEdit, setToggleAddressEdit] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { reviews } = useSelector((state: RootState) => state.review);
  const currentUserOrder = orders.filter(
    (order) => order?.User?.email === currentUser?.email
  );

  const filteredOrders = currentUserOrder.filter((order) => {
    switch (currentTab) {
      case "unpaid":
        return order.paymentStatus === "unpaid";
      case "processing":
        return order.status === "processing";
      case "shipped":
        return order.status === "shipped";
      case "completed":
        return order.status === "completed";
      case "cancelled":
        return order.status === "cancelled";
      default:
        return true;
    }
  });

  const getTabCount = (tabValue: string) => {
    return currentUserOrder.filter((order) => {
      switch (tabValue) {
        case "unpaid":
          return order.paymentStatus.toLowerCase() === "unpaid";
        case "processing":
          return order.status.toLowerCase() === "processing";
        case "shipped":
          return order.status.toLowerCase() === "shipped";
        case "completed":
          return (
            order.status.toLowerCase() === "completed" ||
            order.status.toLowerCase() === "delivered"
          );
        case "cancelled":
          return (
            order.status.toLowerCase() === "cancelled" ||
            order.status.toLowerCase() === "refunded"
          );
        default:
          return true;
      }
    }).length;
  };

  const hasUserReviewedProduct = (
    productId: number,
    orderId: number,
    userId: any
  ) => {
    return reviews?.some(
      (review) =>
        review?.userId.toString() === userId.toString() &&
        review?.orderId.toString() === orderId.toString() &&
        review?.productId.toString() === productId.toString()
    );
  };

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchReviews());
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
    <div>
      {isLoading === true && <LoadingState />}
      <Modal
        toggleAddressEdit={toggleAddressEdit}
        setToggleAddressEdit={setToggleAddressEdit}
        orderId={orderId}
      />

      <div className="max-w-6xl min-h-screen mx-auto sm:p-6 space-y-6">
        {currentUserOrder?.length === 0 ? (
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
          <Tabs
            onValueChange={(value) => setCurrentTab(value)}
            defaultValue="all"
            className="space-y-6"
          >
            <TabsList>
              {tabsValues.map((el) => {
                const count = getTabCount(el.value);
                return (
                  <div key={el.option}>
                    <TabsTrigger value={el.value}>
                      <span>{el.option}</span>
                      {count > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-2 bg-gray-200 text-gray-800"
                        >
                          {count}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </div>
                );
              })}
            </TabsList>
            <Card className="bg-gray-100 p-2">
              {filteredOrders.length > 0 ? (
                <Accordion type="multiple" className="space-y-4">
                  {filteredOrders?.map((order: Order) => (
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
                                copyToClipboard(
                                  String(order.id),
                                  String(order.id)
                                )
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
                            Ordered on : {getDate(order?.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              order.status === "pending"
                                ? ("warning" as "destructive")
                                : ("success" as "secondary")
                            }
                          >
                            {order?.status?.toUpperCase()}
                          </Badge>
                          <Badge
                            className={`${
                              order.paymentStatus === "unpaid"
                                ? "bg-red-500/90"
                                : " text-green-500 bg-gray-50"
                            }`}
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

                            <PaymentProgress val={4} />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card className="">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold text-black/90 flex items-center">
                                  <Truck className="h-5 w-5 mr-2" />
                                  Shipping Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm flex pb-1 gap-1 text-gray-500">
                                  <span className="text-gray-800">Address</span>{" "}
                                  :{order.shippingAddress}
                                </p>
                                <p className="text-sm flex items-center gap-1 text-gray-500">
                                  <span className="text-gray-800">Name</span> :
                                  {order.User?.name}
                                </p>
                                <p className="text-sm flex items-center gap-1 text-gray-500">
                                  <span className="text-gray-800">Email</span>:{" "}
                                  {order.User?.email}
                                </p>
                                <p className="text-sm flex items-center gap-1 text-gray-500">
                                  <span className="text-gray-800">Country</span>
                                  : {order.country || "N/A"}
                                </p>
                                <p className="text-sm flex items-center gap-1 text-gray-500">
                                  <span className="text-gray-800">
                                    County/State
                                  </span>
                                  : {order.county || "N/A"}
                                </p>
                                <div className="pt-5">
                                  {order.status !== "completed" &&
                                    order.status !== "cancelled" && (
                                      <Button
                                        variant="link"
                                        className="text-orange-600  p-0 h-auto"
                                        onClick={() => {
                                          setToggleAddressEdit(true);
                                          setOrderId(order.id);
                                        }}
                                      >
                                        <MapPin className="h-4 w-4 mr-1 inline" />
                                        Modify shipping address
                                      </Button>
                                    )}
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold text-black/90 flex items-center">
                                  <Shield className="h-5 w-5 mr-2" />
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

                            <EstimatingTheDeliveryTime order={order} />
                          </div>

                          <div className="mb-6 bg-white">
                            <h3 className="font-medium mb-2">
                              Product Details
                            </h3>
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-3 grid grid-cols-12 font-medium text-sm">
                                <div className="col-span-5">Product</div>
                                <div className="col-span-2">Specifications</div>
                                <div className="col-span-2 text-right">
                                  Unit Price
                                </div>
                                <div className="col-span-1 text-right">Qty</div>
                                <div className="col-span-2 text-right">
                                  Total
                                </div>
                              </div>

                              {order?.OrderItems?.map((item) => {
                                const hasReviewed = hasUserReviewedProduct(
                                  item.productId,
                                  order.id,
                                  currentUserOrder[0].userId
                                );

                                return (
                                  <div key={item.id} className="group">
                                    <div className="p-3 border-t grid grid-cols-12 items-center text-sm hover:bg-gray-50">
                                      <div className="col-span-5 flex items-center">
                                        <Image
                                          src={
                                            item?.Product?.productImages
                                              ? String(
                                                  item?.Product?.productImages?.find(
                                                    (el: any) =>
                                                      el.isMain === true
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
                                        $
                                        {(item.price * item.quantity)?.toFixed(
                                          2
                                        )}
                                      </div>
                                    </div>

                                    <div className="p-3 bg-gray-50 border-t ">
                                      {!hasReviewed ? (
                                        <Dialog key={item.id}>
                                          <DialogTrigger
                                            asChild
                                            className=" disabled:cursor-not-allowed"
                                            disabled={
                                              order.paymentStatus !== "paid" &&
                                              order.status !== "delivered"
                                            }
                                          >
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="gap-1"
                                            >
                                              <Star className="h-4 text-orange-500 w-4" />
                                              Write a Review
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent className="max-w-3xl overflow-y-scroll">
                                            <DialogTitle>
                                              Write a Review
                                            </DialogTitle>
                                            <DialogDescription>
                                              Share your feedback about this
                                              product.
                                            </DialogDescription>

                                            <ProductReviewForm
                                              productId={Number(item.productId)}
                                              userId={Number(
                                                currentUserOrder[0].userId
                                              )}
                                              // paymentStatus={Number(order.)}
                                              orderId={Number(order.id)}
                                              productName={item.Product.name}
                                              productCategory={
                                                currentUserOrder[0].OrderItems?.find(
                                                  (el) =>
                                                    el.productId ===
                                                    item.productId
                                                )?.Product?.category
                                              }
                                              productImage={
                                                item.Product.productImages.find(
                                                  (image) =>
                                                    image.isMain === true
                                                )?.url as string
                                              }
                                              defaultRating={4}
                                              defaultReview="Good sound quality"
                                            />
                                          </DialogContent>
                                        </Dialog>
                                      ) : (
                                        <EditReviewForm
                                          productId={Number(item.productId)}
                                          userId={Number(
                                            currentUserOrder[0].userId
                                          )}
                                          orderId={Number(order.id)}
                                          productName={item.Product.name}
                                          productCategory={
                                            currentUserOrder[0]?.OrderItems?.find(
                                              (el) =>
                                                el.productId === item.productId
                                            )?.Product?.category
                                          }
                                          productImage={
                                            item.Product.productImages.find(
                                              (image) => image.isMain === true
                                            )?.url as string
                                          }
                                          // defaultRating={4}
                                          // defaultReview="Good sound quality"
                                        />
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <SupplierAndPaymentsSummary
                            order={order}
                            setIsLoading={setIsLoading}
                          />
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Card className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">
                    No
                    {tabsValues
                      .find((t) => t.value === currentTab)
                      ?.option.toLowerCase() ?? ""}
                    orders found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {currentTab === "all"
                      ? "You don't have any orders yet"
                      : `You don't have any ${currentTab} orders`}
                  </p>
                  {currentTab !== "all" && (
                    <Button
                      variant="ghost"
                      className="mt-4 text-orange-600"
                      onClick={() => setCurrentTab("all")}
                    >
                      View all orders
                    </Button>
                  )}
                </Card>
              )}
            </Card>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
