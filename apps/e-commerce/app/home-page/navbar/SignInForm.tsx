"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { Separator } from "@/components/ui/separator";

interface Pop {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignInForm({ setShow }: Pop) {
  const { register } = useForm();

  return (
    <div>
      <div className=" flex justify-center items-end">
        <Card className=" relative rounded-md w-[30svw] px-6 py-4">
          <RxCross2
            onClick={() => {
              console.log("Moses Mwangi");
              setShow((el: boolean) => !el);
            }}
            className=" hover:bg-slate-200 hover:cursor-pointer p-1 rounded-full transition-all duration-200 h-8 w-8 absolute top-2 right-2"
          />
          <div className="">
            <h1 className=" flex justify-center font-semibold text-2xl py-3">
              Sign In user
            </h1>
          </div>
          <form
            // onSubmit={handleSubmit(signUser)}
            className=" flex flex-col gap-5"
          >
            <div className=" flex flex-row gap-10 items-center">
              <Input {...register("name")} placeholder="User Name" />
            </div>
            <div className=" flex flex-row gap-10 items-center">
              <Input {...register("email")} placeholder="User Email" />
            </div>
            <div className=" flex flex-row gap-10 items-center">
              <Input {...register("password")} placeholder="Password" />
            </div>
            <Button>Submit</Button>
          </form>
          <div className="flex gap-2 items-center w-[40%]">
            <Separator className="my-9" />
            or
            <Separator className="my-9" />
          </div>
          <div
            onClick={() => {}}
            className=" cursor-pointer flex gap-3 bg-slate-100 py-2 items-center justify-center rounded-md"
          >
            <FcGoogle className=" w-8 h-8" /> <p>Sign Up with Google</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
