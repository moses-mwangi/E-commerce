"use client";

import LoadingState from "@/app/components/LoadingState";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        <Image
          src="/images/amazon.png"
          className=""
          alt=""
          width={100}
          height={50}
        />
      </div>
    </>
  );
}
