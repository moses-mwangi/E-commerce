"use client";

import { FaBell, FaBoxOpen, FaQuestionCircle } from "react-icons/fa";
import Logo from "@/app/home-page/navbar/logo/Logo";
import Link from "next/link";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import { useEffect, useState } from "react";
import Footer from "@/app/components/footer/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Settings,
  ArrowRight,
  X,
  Truck,
  CircleAlertIcon,
} from "lucide-react";
import { GiSwapBag } from "react-icons/gi";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/redux/slices/userSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import OrderTracking from "./OrderTracking";
import OrderDetails from "./OrderDetails";
import ProductReviewForm from "./ProductReviewForm";
import Pagination from "./Pagination";

const notificationData = [
  {
    id: 1,
    type: "order",
    title: "Your order has shipped",
    preview: "Order #12345 is on its way and will arrive in 2-3 business days.",
    time: "2 hours ago",
    unread: true,
    priority: "normal",
    productImage: "/placeholder-product.jpg",
    action: "View Order",
    orderId: "ORD-12345",
    products: [
      {
        id: "PROD-001",
        name: "Wireless Headphones",
        image: "/placeholder-product.jpg",
        price: 99.99,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    type: "order",
    title: "Urgent: Delivery delayed",
    preview: "Your order #12346 delivery is delayed due to weather conditions.",
    time: "5 hours ago",
    unread: true,
    priority: "high",
    action: "Track Order",
    orderId: "ORD-12346",
    trackingNumber: "TRK-789456",
    carrier: "FedEx",
  },
  {
    id: 3,
    type: "promo",
    title: "Special offer just for you!",
    preview: "Get 20% off on your next purchase with code WELCOME20.",
    time: "Yesterday",
    unread: false,
    priority: "normal",
    action: "Shop Now",
    promoCode: "WELCOME20",
  },
  {
    id: 4,
    type: "order",
    title: "Your order has been delivered",
    preview: "Order #12344 was delivered. Please leave a review.",
    time: "2 days ago",
    unread: false,
    priority: "normal",
    productImage: "/placeholder-product.jpg",
    action: "Leave Review",
    orderId: "ORD-12344",
    productId: "PROD-002",
    productName: "Smart Watch",
  },
  {
    id: 5,
    type: "stock",
    title: "Back in stock: Wireless Earbuds Pro",
    preview: "The item you wanted is back in stock!",
    time: "3 days ago",
    unread: false,
    priority: "normal",
    productImage: "/placeholder-product.jpg",
    action: "Buy Now",
    productId: "PROD-003",
  },
];

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(notificationData);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<{
    type: string;
    data: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleNotificationAction = (notification: any) => {
    markAsRead(notification.id);

    switch (notification.action) {
      case "View Order":
        setActiveModal({
          type: "viewOrder",
          data: notification,
        });
        break;
      case "Track Order":
        setActiveModal({
          type: "trackOrder",
          data: notification,
        });
        break;
      case "Leave Review":
        setActiveModal({
          type: "leaveReview",
          data: notification,
        });
        break;
      case "Shop Now":
      case "Buy Now":
        // In a real app, you would navigate to the product page
        window.location.href = `/products/${notification.productId}`;
        break;
      default:
        break;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return notification.unread;
    if (activeTab === "orders") return notification.type === "order";
    if (activeTab === "promo")
      return notification.type === "promo" || notification.type === "stock";
    return true;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  function handlePageChange(page: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
          <div className="mx-auto px-4 py-3 flex items-center justify-between">
            <Logo />

            <div className="flex items-center space-x-6">
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 relative"
              >
                <div className="relative">
                  <FaBell className="text-gray-700/65 text-2xl cursor-pointer" />
                  <span className="absolute -top-[6px] -right-[6px] bg-red-500/90 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
                    3
                  </span>
                </div>
              </Link>
              <UserProfileImage />
            </div>
          </div>
        </header>

        <main className="mx-auto px-9 py-8">
          <div className="flex items-center justify-between space-x-3">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Notifications
              </h1>
              <p className="text-gray-600">Manage your notifications</p>
            </div>
            <div>
              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Notification Settings</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Email Notifications</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-updates">Order updates</Label>
                        <Switch id="order-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="promotions">Promotions</Label>
                        <Switch id="promotions" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stock-alerts">Stock alerts</Label>
                        <Switch id="stock-alerts" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Push Notifications</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-orders">Order updates</Label>
                        <Switch id="push-orders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-promotions">Promotions</Label>
                        <Switch id="push-promotions" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-frequency">Email Frequency</Label>
                      <select
                        id="email-frequency"
                        className="w-full p-2 border rounded-md"
                        defaultValue="weekly"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Digest</option>
                      </select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-4 font-medium text-sm flex items-center ${
                  activeTab === "all"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("unread")}
                className={`px-6 py-4 font-medium text-sm flex items-center ${
                  activeTab === "unread"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-6 py-4 font-medium text-sm flex items-center ${
                  activeTab === "orders"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("promo")}
                className={`px-6 py-4 font-medium text-sm flex items-center ${
                  activeTab === "promo"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Promo
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Notification Preferences
                </button>

                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="flex items-center bg-gray-50"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                  Mark all as read
                </Button>
              </div>

              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-bell-slash text-5xl text-gray-300 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-500">
                    You&apos;re all caught up! Check back later for updates.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-center p-4 rounded-lg transition-all hover:bg-blue-50 ${
                        notification.unread
                          ? "bg-gray-50 border-l-4 border-blue-600"
                          : ""
                      } ${
                        notification.priority === "high"
                          ? "border-l-4 border-red-500"
                          : notification.priority === "medium"
                          ? "border-l-4 border-yellow-500"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center h-10 w-10 rounded-full ${
                          notification.type === "order"
                            ? "bg-blue-100 text-blue-600"
                            : notification.type === "promo"
                            ? "bg-purple-100 text-purple-600"
                            : notification.type === "stock"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {notification.type === "order" && <Truck />}
                        {notification.type === "promo" && <GiSwapBag />}
                        {notification.type === "stock" && <FaBoxOpen />}
                        {notification.priority === "high" && (
                          <FaQuestionCircle />
                        )}
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h3
                            className={`text-sm font-medium ${
                              notification.unread
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {notification.unread && (
                            <span className="ml-2 h-2 w-2 rounded-full bg-blue-600"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.preview}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>

                      <div className="ml-4 flex items-center">
                        <button
                          onClick={() => handleNotificationAction(notification)}
                          className={`px-3 py-1.5 text-sm rounded-md flex items-center ${
                            notification.action === "Shop Now" ||
                            notification.action === "Buy Now"
                              ? "bg-orange-500/85 text-white hover:bg-orange-600/90"
                              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {notification.action}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center border-t border-gray-200 pb-6">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                className="mt-6"
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Modals for different actions */}
      {activeModal && (
        <Dialog
          open={!!activeModal}
          onOpenChange={(open) => !open && setActiveModal(null)}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {activeModal.type === "viewOrder" && "Order Details"}
                {activeModal.type === "trackOrder" && "Track Your Order"}
                {activeModal.type === "leaveReview" && "Leave a Review"}
              </DialogTitle>
            </DialogHeader>

            {activeModal.type === "viewOrder" && (
              <OrderDetails order={activeModal.data} />
            )}

            {activeModal.type === "trackOrder" && (
              <OrderTracking
                orderId={activeModal.data.orderId}
                trackingNumber={activeModal.data.trackingNumber}
                carrier={activeModal.data.carrier}
              />
            )}

            {activeModal.type === "leaveReview" && (
              <ProductReviewForm
                productId={activeModal.data.productId}
                productName={activeModal.data.productName}
                productImage={activeModal.data.productImage}
                onSuccess={() => setActiveModal(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NotificationsPage;
