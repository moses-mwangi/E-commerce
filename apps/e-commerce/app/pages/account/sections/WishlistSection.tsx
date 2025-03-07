"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const wishlistItems = [
  {
    id: 1,
    name: "Product Name",
    price: "$99.99",
    image: "/placeholder.jpg",
  },
  // Add more items as needed
];

export default function WishlistSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-base">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative bg-gray-100 rounded-md" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="font-semibold">{item.price}</span>
              <Button variant="outline" size="sm">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
