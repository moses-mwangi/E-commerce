"use client";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser, updateCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfileSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, currentUser } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getCurrentUser);
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormUpdate = async (data: any) => {
    const formData = {
      name: `${data.FirstName} ${data.LastName}`,
      address: data.address,
      city: data.city,
      state: data.state,
      telephone: data.telephone,
      tradeRole: data.tradeRole,
      zipcode: data.zipcode,
      currentUserId: String(currentUser?.id),
    };
    try {
      dispatch(updateCurrentUser(formData));
      // router.push("/");
      // reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user");
      console.error("User update error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormUpdate)}>
        <div className="flex flex-col items-center gap-4">
          <UserProfileImage />
          <Button variant="outline" size="sm">
            Change Photo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              className=" focus:ring-orange-500 focus-visible:ring-orange-500"
              id="firstName"
              defaultValue={currentUser?.name.split(" ")[0]}
              placeholder={currentUser?.name.split(" ")[0]}
              {...register("FirstName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              defaultValue={currentUser?.name.split(" ")[1]}
              placeholder={currentUser?.name.split(" ")[1]}
              {...register("LastName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={`${currentUser?.email}`}
              placeholder={`${currentUser?.email || "Email"}`}
              disabled={true}
              {...register("Email")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={`${currentUser?.telephone}`}
              placeholder={`${currentUser?.telephone || "+1 (555) 000-0000"}`}
              {...register("telephone")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="123 Street Name"
            {...register("address")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Trade Role</Label>
          <Input
            id="role"
            defaultValue={currentUser?.tradeRole}
            placeholder={currentUser?.tradeRole || "Buyer"}
            {...register("tradeRole")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city")}
              defaultValue={currentUser?.city && currentUser.city}
              placeholder={String(currentUser?.city) || "City"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              defaultValue={currentUser?.state && currentUser.state}
              placeholder={String(currentUser?.state) || "State"}
              {...register("state")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              defaultValue={currentUser?.zipcode && currentUser.zipcode}
              placeholder={String(currentUser?.city) || "ZIP Code"}
              {...register("zipcode")}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
