/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import { useRouter } from "next/navigation";
// import SignupForm from "@/app/reg/signup/SignupForm";

export default function SignInBotton() {
  const [show, setShow] = useState(false);
  const path = useRouter();
  return (
    <div>
      <div>
        {show === false && (
          <Button
            className=" bg-orange-500 rounded-full font-semibold hover:bg-orange-600 hover:text-slate-100 transition-all duration-200 px-7 py-2"
            onClick={() => {
              setShow((el) => !el);
              // path.push("/signin");
            }}
          >
            Sign Up
          </Button>
        )}
      </div>
      {show === true && (
        <div>
          <div className="flex justify-center items-center h-svh w-svw z-50 absolute top-0 right-0 bg-black/40 backdrop-blur-[2px]">
            <SignInForm setShow={setShow} />
            {/* <SignupForm /> */}
          </div>
        </div>
      )}
    </div>
  );
}
