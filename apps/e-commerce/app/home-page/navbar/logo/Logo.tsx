"use client";

import LoadingState from "@/app/components/loaders/LoadingState";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import QivamallLogo from "./Qlogo";

export default function Logo() {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  return (
    <>
      {isLoading && <LoadingState />}
      <div
        className=" cursor-pointer"
        onClick={() => {
          setIsLoading(true);
          push("/");
        }}
      >
        <h1
          // style={{ fontFamily: "var(--font-inter)" }}
          className="text-3xl font-extrabold tracking-wide text-slate-800"
        >
          <span className="text-orange-600">Q</span>ivamall
        </h1>

        {/* <QivamallLogo /> */}
        {/* <QivamallLogo withText={true} /> */}
        {/* <Image
          src="/images/amazon.png"
          src="/logo.png"
          className=""
          alt=""
          width={100}
          height={50}
        /> */}
      </div>
    </>
  );
}
