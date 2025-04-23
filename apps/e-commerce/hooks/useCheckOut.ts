"use client";

import { clearCart, setCart } from "@/redux/slices/cartSlice";
import { createOrder } from "@/redux/slices/orderSlice";
import { getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

export function useCheckOut() {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);
  const { status } = useSelector((state: RootState) => state.order);
  const { products } = useSelector((state: RootState) => state.product);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("Buy");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  async function getFeaturesInBoundingBox() {
    const bbox = "-1.1802414,-1.1796487,36.9948801,36.9952691";
    // const url = `https://nominatim.openstreetmap.org/search?format=json&bounded=1&viewbox=${bbox}`;

    const min_lat = -1.1802414;
    const max_lat = -1.1796487;
    const min_lon = 36.9948801;
    const max_lon = 36.9952691;

    const url = `https://nominatim.openstreetmap.org/search?format=json&bounded=1&viewbox=${min_lon},${min_lat},${max_lon},${max_lat}`;

    try {
      const response = await fetch(url);
      const features = await response.json();
      console.log("Features in bounding box:", features);
      return features;
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  }

  // getFeaturesInBoundingBox();

  function onSubmit(data: any) {
    console.log(data);
    try {
      if (!id) {
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
          orderItems: orderItem,
          ...data,
        };

        console.log("orders", orderItems);
        console.log(data);
        dispatch(createOrder(orderItems));
        dispatch(clearCart());
      } else {
        const buyProduct = products.find(
          (el) => el.id.toString() === id.toString()
        );

        const productQuantity = localStorage.getItem("buyProductQuantity");

        const order = {
          productId: Number(buyProduct?.id),
          quantity: Number(productQuantity),
          price: Number(buyProduct?.price),
        };
        console.log(buyProduct, productQuantity, order);

        const orderItems = {
          userId: currentUser?.id,
          totalPrice: totalPrice,
          status: "pending",
          paymentStatus: "unpaid",
          shippingAddress: data.streetAddress,
          orderItems: [order],
          ...data,
        };

        dispatch(createOrder(orderItems));
      }
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
  };
}
