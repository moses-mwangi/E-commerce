"use client";
import React, { useEffect } from "react";
import LoadingState from "../components/loaders/LoadingState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCurrentUser } from "@/redux/slices/userSlice";

export default function Page() {
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    document.cookie = `tokens=${token}; path=/`;
  }, []);

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    dispatch(getCurrentUser());
    // if (token && token.length > 20) {
    // }
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated, status, dispatch]);

  return (
    <div className="bg-gray-200">
      <LoadingState />
    </div>
  );
}
