"use client";

import { clearCart, setCart } from "@/redux/slices/cartSlice";
import { createOrder } from "@/redux/slices/orderSlice";
import { getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import z from "zod";

export const formSchema = z.object({
  country: z.string().min(2, "Country is required"),
  fullName: z.string().min(3, "Full Name is required"),
  phoneNumber: z.string().min(10, "Phone Number is required"),
  streetAddress: z.string().min(5, "Street Address is required"),
  apartment: z.string().optional(),
  postcode: z.string().min(4, "Postcode is required"),
  city: z.string().min(2, "City is required"),
  county: z.string().min(2, "County is required"),
});

export function useCheckOutForm() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);
  const { orders } = useSelector((state: RootState) => state.order);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      fullName: "",
      phoneNumber: "",
      streetAddress: "",
      apartment: "",
      postcode: "",
      city: "",
      county: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  async function handleUseCurrentLocation() {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data?.address) {
            setValue(
              "streetAddress",
              data.address.road || data.display_name || ""
            );
            setValue(
              "city",
              data.address.county ||
                data.address.town ||
                data.address.village ||
                ""
            );
            setValue("county", data.address.state || "");
            setValue("country", data.address.country || "");
            setValue("postcode", data.address.postcode || "");
          } else {
            alert("Could not retrieve address. Please enter manually.");
          }
        } catch (error) {
          alert("Error fetching location. Try again.");
        }

        setLoadingLocation(false);
      },
      () => {
        alert("Failed to get location. Please enable GPS and try again.");
        setLoadingLocation(false);
      }
    );
  }

  function onSubmit(data: any) {
    try {
      const orderItem = items.map((el) => {
        const order = {
          productId: el.productId,
          quantity: el.quantity,
          price: el.product.price,
        };
        return order;
      });

      const orderItems = {
        userId: currentUser?.id,
        totalPrice: totalPrice,
        status: "pending",
        paymentStatus: "unpaid",
        shippingAddress: data.streetAddress,
        trackingNumber: "WDACK52UGH76DF",
        orderItems: orderItem,
      };

      console.log(orderItems);
      dispatch(createOrder(orderItems));
      dispatch(clearCart());

      toast.success("Order sent succefully");
    } catch (err) {
      console.error(err);
    }
  }

  return {
    onSubmit,
    handleSubmit,
    setValue,
    errors,
    register,
    handleUseCurrentLocation,
    loadingLocation,
  };
}
