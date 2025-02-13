"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logo() {
  const { push } = useRouter();
  return (
    <div
      className=" cursor-pointer"
      onClick={() => {
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
  );
}
