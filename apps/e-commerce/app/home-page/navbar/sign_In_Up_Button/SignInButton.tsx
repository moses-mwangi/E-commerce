"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import UserProfileImage from "@/app/components/users/UserProfileImage";

export default function SignInBotton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    dispatch(fetchUsers());

    if (token && token.length > 20 && token !== "undefined") {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div>
      {isAuthenticated === true ? (
        <div>
          <UserProfileImage />
        </div>
      ) : (
        <Button
          className=" bg-orange-500 font-semibold hover:bg-orange-600 hover:text-slate-100 transition-all duration-200 px-7 py-2 rounded-full"
          onClick={() => {
            router.push("/reg/signin");
          }}
        >
          Sign Up
        </Button>
      )}
    </div>
  );
}
