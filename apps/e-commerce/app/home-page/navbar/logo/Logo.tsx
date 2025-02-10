import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className=" bg-blue-600">
      <Image
        // src="/images/hypermark_logo.webp"
        src="/images/hypermark.png"
        className="bg-transparent"
        alt=""
        width={100}
        height={50}
      />
    </div>
  );
}
