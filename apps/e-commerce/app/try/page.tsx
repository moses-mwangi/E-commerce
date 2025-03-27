"use client";
import React, { useEffect } from "react";
import LoadingState from "../components/loaders/LoadingState";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const name = "         Moses Mwangi";

  const token = document.cookie.split("=")[1];
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);
  }, []);

  return (
    <Card>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        dolores molestias aspernatur ad est quae repudiandae nulla, ipsam
        mollitia porro sapiente quam ipsa corporis, laboriosam saepe esse earum
        minus eius!
      </p>
      <Button
        onClick={() => {
          console.log(token);
        }}
      >
        CLICK
      </Button>
    </Card>
  );
}
