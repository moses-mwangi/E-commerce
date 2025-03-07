"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import React from "react";

const orders = [
  {
    id: "ORD001",
    date: "2024-02-20",
    total: "$299.99",
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD002",
    date: "2024-02-18",
    total: "$149.99",
    status: "In Transit",
    items: 2,
  },
  // Add more orders as needed
];

export default function OrdersSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
