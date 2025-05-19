import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Mail,
  Phone,
  Store,
  MessageSquare,
  X,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function SupplierAndPaymentsSummary({
  order,
  setIsLoading,
}: {
  order: any;
  setIsLoading: (loading: boolean) => void;
}) {
  const { push } = useRouter();
  const [cancelReason, setCancelReason] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRequestingRefund, setIsRequestingRefund] = useState(false);

  const handleCompletePayment = (id: any) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.set("PaymentsOrderNo", String(id));
    push(`/pages/cart/checkout/orderPayments?${params.toString()}`);
  };

  const handleCancelOrder = async () => {
    if (!cancelReason) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    setIsCancelling(true);
    try {
      // API call to cancel order
      const response = await fetch(`/api/orders/${order.id}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: cancelReason }),
      });

      if (response.ok) {
        toast.success("Order cancelled successfully");
        // Refresh order data or redirect
      } else {
        throw new Error("Failed to cancel order");
      }
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleRequestRefund = async () => {
    if (!refundReason) {
      toast.error("Please provide a refund reason");
      return;
    }

    setIsRequestingRefund(true);
    try {
      // API call to request refund
      const response = await fetch(`/api/orders/${order.id}/refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: refundReason }),
      });

      if (response.ok) {
        toast.success("Refund requested successfully");
        // Refresh order data
      } else {
        throw new Error("Failed to request refund");
      }
    } catch (error) {
      toast.error("Failed to request refund");
    } finally {
      setIsRequestingRefund(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supplier Information Card */}
        <Card className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              Supplier Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">TechGadgets Inc.</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Clock className="h-4 w-4" />
                <span>Member Since: 2020</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Store className="h-4 w-4" />
                Visit Store
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Chat Now
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>supplier@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+86-123456789</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary Card */}
        <Card className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg font-semibold">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Subtotal:</span>
                <span className="font-medium">
                  {`${order.currency} ${order?.totalPrice?.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="text-green-600 font-medium opacity-35">
                  - $34.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium opacity-35">$0.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span>{`${order.currency} ${order?.totalPrice?.toFixed(
                  2
                )}`}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Payment Method</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  PayPal (john.doe@example.com)
                </span>
                <Button
                  className={`${
                    order?.paymentStatus === "paid"
                      ? "bg-green-100 text-green-600 hover:bg-green-200/85"
                      : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100/90"
                  } h-6 `}
                >
                  {order?.paymentStatus === "paid" ? "Completed" : "Pending"}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-4 border-t">
            {order.paymentStatus === "unpaid" ? (
              <Button
                onClick={() => handleCompletePayment(order.id)}
                className="w-full bg-orange-500/85 hover:bg-orange-500"
              >
                Complete Payment
              </Button>
            ) : (
              <div className="flex gap-2 w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Request Refund
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Refund</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for your refund request.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Reason for refund..."
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                      />
                      <div className="text-sm text-gray-500">
                        Refund amount: ${order?.totalPrice?.toFixed(2)}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleRequestRefund}
                        disabled={isRequestingRefund}
                      >
                        {isRequestingRefund
                          ? "Processing..."
                          : "Submit Request"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {order.status === "pending" ||
                  (order.status === "confirmed" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="flex-1">
                          <X className="h-4 w-4 mr-2" />
                          Cancel Order
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Order</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel this order?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Reason for cancellation..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            onClick={handleCancelOrder}
                            disabled={isCancelling}
                          >
                            {isCancelling
                              ? "Cancelling..."
                              : "Confirm Cancellation"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ))}
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
