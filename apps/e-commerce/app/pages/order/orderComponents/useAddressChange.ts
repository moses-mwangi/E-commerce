"use client";

import { fetchOrders, updateOrder } from "@/redux/slices/orderSlice";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import z from "zod";

export const formSchema = z.object({
  country: z.string().min(2, "Country is required"),
  email: z.string().email(),
  fullName: z.string().min(3, "Full Name is required"),
  phoneNumber: z.string().min(10, "Phone Number is required"),
  streetAddress: z.string().min(5, "Street Address is required"),
  apartment: z.string().optional(),
  postcode: z.string().min(4, "Postcode is required"),
  city: z.string().min(2, "City is required"),
  county: z.string().min(2, "County is required"),
});

export function useAddress() {
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.order);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [orderId, setOrderId] = useState<string | number | null>(null);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { orders } = useSelector((state: RootState) => state.order);

  const currentUserOrder = useMemo(() => {
    return orders.filter((order) => order.User.email === currentUser?.email);
  }, [orders, currentUser?.email]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      apartment: "",
      postcode: "",
      city: "",
      county: "",
    },
  });

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  async function handleUseCurrentLocation() {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const bbox = "-1.1802414,-1.1796487,36.9948801,36.9952691";
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);

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
      const address = {
        ...data,
        orderId,
      };

      dispatch(updateOrder(address));
    } catch (err) {
      console.error(err);
      toast.error("Failed to create the order");
    }
  }

  return {
    onSubmit,
    handleSubmit,
    setValue,
    watch,
    errors,
    register,
    handleUseCurrentLocation,
    loadingLocation,
    currentUser,
    status,
    reset,
    currentUserOrder,
    orderId,
    setOrderId,
  };
}
