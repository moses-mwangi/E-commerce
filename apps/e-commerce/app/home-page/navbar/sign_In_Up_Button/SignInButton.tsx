"use client";

import LoadingState from "@/app/components/loaders/LoadingState";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import { Button } from "@/components/ui/button";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function SignInBotton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    dispatch(fetchUsers());

    if (token && token.length > 20 && token !== "undefined") {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className="">
      {isAuthenticated === true && currentUser && currentUser.name ? (
        <div>
          <UserProfileImage />
        </div>
      ) : (
        <>
          {isLoading && <LoadingState />}
          <button
            className=" sm:hidden bg-gray-50 rounded-full p-[5px] text-gray-600"
            onClick={() => {
              setIsLoading(true);
              router.push("/registration/signin");
            }}
          >
            <User2 className=" h-6 w-6" />
          </button>
          <Button
            className=" hidden sm:flex text-sm sm:text-[15px] h-[21px] sm:h-9 bg-orange-500 font-semibold hover:bg-orange-600 hover:text-slate-100 transition-all duration-200 px-3 sm:px-7 py-2 rounded-full"
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
