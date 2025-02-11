"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";

export default function SignInBotton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const token = document.cookie.split("=")[1];

  useEffect(() => {
    dispatch(fetchUsers());

    if (token && token.length > 20 && token !== "undefined") {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div>
      {isAuthenticated === true ? (
        <div>
          <div className="bg-pink-700 cursor-pointer rounded-full text-white font-semibold flex items-center justify-center w-10 h-10">
            {currentUser?.name[0].toUpperCase()}
          </div>
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
