"use client";

import React, { useEffect, useState } from "react";
import ModernEcommerceSearch from "./ModernEcommerceSearch";
import ModernEcommerceSearch2 from "./ModernEcommerceSearch2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchBar from "../home-page/navbar/search/SearchBar";

export default function TestPage() {
  return (
    <div className=" py-4 px-10">
      {/* <SearchBar /> */}
      {/* <ModernEcommerceSearch /> */}
      <ModernEcommerceSearch2 />
    </div>
  );
}
