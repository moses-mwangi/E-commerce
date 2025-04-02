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
  MapPin,
  X,
  Check,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchOrders,
  // updateShippingAddress,
  // cancelOrder,
} from "@/redux/slices/orderSlice";
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
import { FcRating } from "react-icons/fc";
import ProductReviewForm from "./orderComponents/ProductReviewForm";
// import { Rating } from "@/components/ui/rating";

function OrdersPage() {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);
  const { push } = useRouter();
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [addressEditMode, setAddressEditMode] = useState<
    Record<string, boolean>
  >({});
  const [editedAddress, setEditedAddress] = useState<Record<string, any>>({});
  const [reviewData, setReviewData] = useState<Record<string, any>>({});
  const [trackingDetails, setTrackingDetails] = useState<Record<string, any>>(
    {}
  );

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

  const handleCancelOrder = (orderId: string) => {
    // dispatch(cancelOrder({ orderId, reason: cancelReason }));
    setCancelReason("");
  };

  const toggleAddressEdit = (orderId: string) => {
    setAddressEditMode((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));

    if (!addressEditMode[orderId]) {
      const order = orders.find((o) => o.id.toString() === orderId.toString());
      if (order) {
        setEditedAddress((prev) => ({
          ...prev,
          [orderId]: {
            street: order.shippingAddress,
            city: "Ruiru",
            state: "Kiambu County",
            postalCode: "4444",
            country: "Kenya",
          },
        }));
      }
    }
  };

  const handleAddressChange = (
    orderId: string,
    field: string,
    value: string
  ) => {
    setEditedAddress((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const saveShippingAddress = (orderId: string) => {
    // dispatch(
    //   updateShippingAddress({
    //     orderId,
    //     address: editedAddress[orderId],
    //   })
    // );
    toggleAddressEdit(orderId);
  };

  const handleReviewChange = (
    orderId: string,
    productId: string,
    field: string,
    value: any
  ) => {
    setReviewData((prev) => ({
      ...prev,
      [`${orderId}-${productId}`]: {
        ...prev[`${orderId}-${productId}`],
        [field]: value,
      },
    }));
  };

  const submitReview = (orderId: string, productId: string) => {
    // Dispatch action to submit review
    console.log("Submitting review:", reviewData[`${orderId}-${productId}`]);
    // Clear the review form
    setReviewData((prev) => {
      const newData = { ...prev };
      delete newData[`${orderId}-${productId}`];
      return newData;
    });
  };

  const fetchTrackingDetails = (orderId: string) => {
    // Simulate API call to fetch tracking details
    setTrackingDetails((prev) => ({
      ...prev,
      [orderId]: {
        status: "In Transit",
        carrier: "DHL Express",
        trackingNumber: `TRK-${Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase()}`,
        estimatedDelivery: "2025-04-15",
        history: [
          {
            date: "2025-04-01",
            status: "Order Processed",
            location: "Shanghai, China",
          },
          {
            date: "2025-04-03",
            status: "Shipped",
            location: "Shanghai, China",
          },
          { date: "2025-04-05", status: "In Transit", location: "Dubai, UAE" },
          {
            date: "2025-04-08",
            status: "Arrived at Destination",
            location: "Nairobi, Kenya",
          },
        ],
      },
    }));
  };

  const orderStatusSteps = [
    { id: "order", label: "Order", description: "Order placed" },
    { id: "payment", label: "Payment", description: "Payment completed" },
    {
      id: "dispatch",
      label: "Dispatch",
      description: "Preparing for shipment",
    },
    { id: "delivery", label: "Delivery", description: "On the way" },
    { id: "review", label: "Review", description: "Order completed" },
  ];

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>

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

          <div className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="border rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Order #{order.id}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            copyToClipboard(
                              order.id.toString(),
                              order.id.toString()
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {copiedOrderId === order.id.toString() && (
                          <span className="text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Ordered on {getDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Supplier</span>
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Order Status</h3>
                      <Badge
                        variant={
                          order.status === "pending"
                            ? ("warning" as "default")
                            : order.status === "shipped"
                            ? ("info" as "destructive")
                            : ("success" as "outline")
                        }
                      >
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        order.status === "pending"
                          ? 20
                          : order.status === "shipped"
                          ? 60
                          : 100
                      }
                      className="h-2"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      {orderStatusSteps.map((step) => (
                        <div key={step.id} className="text-center">
                          <div className="font-medium">{step.label}</div>
                          <div className="text-xs">{step.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Truck className="h-4 w-4 mr-2" />
                          Shipping Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {addressEditMode[order.id] ? (
                          <div className="space-y-2">
                            <Input
                              placeholder="Street Address"
                              value={editedAddress[order.id]?.street || ""}
                              onChange={(e) =>
                                handleAddressChange(
                                  order.id.toString().toString(),
                                  "street",
                                  e.target.value
                                )
                              }
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="City"
                                value={
                                  editedAddress[order.id.toString()]?.city || ""
                                }
                                onChange={(e) =>
                                  handleAddressChange(
                                    order.id.toString(),
                                    "city",
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="State"
                                value={
                                  editedAddress[order.id.toString()]?.state ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleAddressChange(
                                    order.id.toString(),
                                    "state",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Postal Code"
                                value={
                                  editedAddress[order.id.toString()]
                                    ?.postalCode || ""
                                }
                                onChange={(e) =>
                                  handleAddressChange(
                                    order.id.toString(),
                                    "postalCode",
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="Country"
                                value={
                                  editedAddress[order.id.toString()]?.country ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleAddressChange(
                                    order.id.toString(),
                                    "country",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="flex justify-end space-x-2 pt-2">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  toggleAddressEdit(order.id.toString())
                                }
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() =>
                                  saveShippingAddress(order.id.toString())
                                }
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm">{order.shippingAddress}</p>
                            <p className="text-sm text-gray-500">
                              {order.User?.name} ({order.User?.email})
                            </p>
                            <p className="text-sm text-gray-500">
                              {/* Phone: {order.User?.phone || "+254-766666666666"} */}
                              Phone: +254-766666666666
                            </p>
                            {order.status !== "completed" &&
                              order.status !== "cancelled" && (
                                <Button
                                  variant="link"
                                  className="text-orange-600 p-0 h-auto"
                                  onClick={() =>
                                    toggleAddressEdit(order.id.toString())
                                  }
                                >
                                  <MapPin className="h-4 w-4 mr-1 inline" />
                                  Modify shipping address
                                </Button>
                              )}
                          </>
                        )}
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
                              Receive 10% compensation if delivery is delayed
                              beyond estimated date
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
                          Delivery Tracking
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status:</span>
                            <span className="font-medium">
                              {trackingDetails[order.id]?.status ||
                                "Preparing for shipment"}
                            </span>
                          </div>
                          {order.trackingNumber && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Tracking #:</span>
                              <span>
                                TRK-{order.trackingNumber.toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Carrier:</span>
                            <span>
                              {trackingDetails[order.id]?.carrier ||
                                "DHL Express"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span>Estimated Delivery:</span>
                            <span>
                              {trackingDetails[order.id]?.estimatedDelivery ||
                                "Apr 15, 2025"}
                            </span>
                          </div>
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() =>
                                fetchTrackingDetails(order.id.toString())
                              }
                            >
                              {trackingDetails[order.id]
                                ? "Refresh Tracking"
                                : "Track Shipment"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {trackingDetails[order.id] && (
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Tracking Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {trackingDetails[order.id].history.map(
                            (event: any, index: number) => (
                              <div key={index} className="flex">
                                <div className="flex flex-col items-center mr-4">
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      index === 0
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  {index <
                                    trackingDetails[order.id].history.length -
                                      1 && (
                                    <div className="w-px h-8 bg-gray-300"></div>
                                  )}
                                </div>
                                <div className="flex-1 pb-4">
                                  <div className="flex justify-between">
                                    <p className="font-medium">
                                      {event.status}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {event.date}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {event.location}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Product Details</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 grid grid-cols-12 font-medium text-sm">
                        <div className="col-span-5">Product</div>
                        <div className="col-span-2">Specifications</div>
                        <div className="col-span-2 text-right">Unit Price</div>
                        <div className="col-span-1 text-right">Qty</div>
                        <div className="col-span-2 text-right">Total</div>
                      </div>
                      {order.OrderItems.map((item) => (
                        <div key={item.id} className="group">
                          <div className="p-3 border-t grid grid-cols-12 items-center text-sm hover:bg-gray-50">
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
                                  {/* SKU: {item.Product.sku || "N/A"} */}
                                  SKU: N/A
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 text-sm text-gray-500">
                              {/* {item.Product.specifications || "Standard"} */}
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

                          {/* {order.status === "completed" && ( */}
                          <div className="p-3 bg-gray-50 border-t">
                            {/* {!reviewData[`${order.id}-${item.Product.id}`] ? ( */}
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
                          {/* )} */}
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
                          <p className="font-medium">
                            {/* {order.supplier?.name || "Supplier Name"} */}
                            Supplier Name
                          </p>
                          <p className="text-sm text-gray-500">
                            {/* Member Since: {order.supplier?.joinDate || "2020"} */}
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
                          <p className="text-sm font-medium">Contact Info</p>
                          <p className="text-sm text-gray-500">
                            {/* Contact: {order.supplier?.contactName || "John Doe"} */}
                            Contact: John Doe
                          </p>
                          <p className="text-sm text-gray-500">
                            {/* Phone: {order.supplier?.phone || "+86-123456789"} */}
                            Phone: +86-123456789
                          </p>
                          <p className="text-sm text-gray-500">
                            Email:
                            {/* {order.supplier?.email || "supplier@example.com"} */}
                            supplier@example.com
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Order Summary</CardTitle>
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
                              <div className="flex space-x-2">
                                {order.status !== "cancelled" &&
                                  order.status !== "completed" && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="flex-1"
                                        >
                                          Cancel Order
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>
                                            Cancel Order #{order.id}
                                          </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <p>
                                            Are you sure you want to cancel this
                                            order?
                                          </p>
                                          <Select
                                            onValueChange={setCancelReason}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select cancellation reason" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="changed-mind">
                                                Changed my mind
                                              </SelectItem>
                                              <SelectItem value="found-cheaper">
                                                Found cheaper elsewhere
                                              </SelectItem>
                                              <SelectItem value="wrong-item">
                                                Ordered wrong item
                                              </SelectItem>
                                              <SelectItem value="delivery-time">
                                                Delivery time too long
                                              </SelectItem>
                                              <SelectItem value="other">
                                                Other reason
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                          {cancelReason === "other" && (
                                            <Textarea placeholder="Please specify your reason" />
                                          )}
                                        </div>
                                        <DialogFooter>
                                          <Button variant="outline">
                                            Back
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            onClick={() =>
                                              handleCancelOrder(
                                                order.id.toString()
                                              )
                                            }
                                          >
                                            Confirm Cancellation
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                                  Request Refund
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Tabs>
      )}
    </div>
  );
}

export default OrdersPage;
