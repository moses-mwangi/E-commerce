"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import { t } from "i18next";
import LoadingState from "@/app/components/loaders/LoadingState";

export default function SignInBotton() {
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="">
      {isAuthenticated === true ? (
        <div>
          <UserProfileImage />
        </div>
      ) : (
        <>
          {isLoading && <LoadingState />}
          <Button
            // className=" text-sm sm:text-base h-[23px] sm:h-[30px] flex items-center gap-1 sm:gap-2 bg-orange-500 hover:bg-orange-600/90 text-white px-2  sm:px-5 py-[2px] rounded-full font-medium shadow-sm transition duration-200"
            className="text-sm sm:text-base h-[23px] sm:h-9 bg-orange-500 font-semibold hover:bg-orange-600 hover:text-slate-100 transition-all duration-200 px-3 sm:px-7 py-2 rounded-full"
            onClick={() => {
              setIsLoading(true);
              router.push("/registration/signin");
            }}
          >
            {t("sign_up")}
          </Button>
        </>
      )}
    </div>
  );
}
