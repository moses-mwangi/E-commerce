"use client";

// import axios from "axios";
import React from "react";

export default function EcomercePage() {
  async function first() {
    // const data = await axios.get("https://api.publicapis.org/entries");
    // console.log(data);

    return "The ecomerce page";
  }
  return (
    <div>
      <div>E-commerce page</div>
      <div
        onClick={() => {
          console.log(first());
        }}
      >
        <button>CLICK ME</button>
      </div>
    </div>
  );
}
