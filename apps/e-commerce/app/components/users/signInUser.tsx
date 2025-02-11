"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

interface User {
  name: string;
  email: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const [curUser, setCurUser] = useState<User | null>(null);
  const { register, handleSubmit } = useForm<FormData>();

  const API_URL = "http://127.0.0.1:8000";

  const signUser = async (data: FormData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, data);
      const token = response.data.token;

      document.cookie = `token=${token}; path=/`;
      setTimeout(() => window.location.reload(), 1000);

      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const initiateGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const logOut = async () => {
    document.cookie = `token=; path=/; max-age=0`;
    setCurUser(null);
    setTimeout(() => window.location.reload(), 1000);

    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = document.cookie.split("token=")[1];

      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/auth/meJ`, {
            withCredentials: true,
          });
          setCurUser(response.data.user);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [API_URL]);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <Button onClick={() => console.log("Current User:", curUser)}>
          Check User
        </Button>
        <Button onClick={logOut}>Log Out</Button>
      </div>

      <div>
        {curUser ? (
          <div>
            <p>Welcome, {curUser.name}</p>
          </div>
        ) : (
          <p>No user found</p>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Card className="rounded-md w-[30vw] px-6 py-4">
          <form
            onSubmit={handleSubmit(signUser)}
            className="flex flex-col gap-5"
          >
            <Input {...register("name")} placeholder="User Name" />
            <Input {...register("email")} placeholder="User Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <div className="flex items-center gap-2 my-6">
            <Separator className="flex-1" />
            <span>or</span>
            <Separator className="flex-1" />
          </div>
          <div
            onClick={initiateGoogleLogin}
            className="cursor-pointer flex items-center gap-3 bg-slate-100 py-2 justify-center rounded-md"
          >
            <FcGoogle className="w-6 h-6" />
            <p>Sign Up with Google</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
