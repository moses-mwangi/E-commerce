"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function PageLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({
      showSpinner: true,
      trickleSpeed: 100,
      minimum: 0.3,
      easing: "ease",
      speed: 500,
    });
  }, []);

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 700);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="loading-spinner-overlay" />
    </div>
  );
}
