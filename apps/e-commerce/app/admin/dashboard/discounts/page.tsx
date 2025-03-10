"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Calendar } from "lucide-react";

export default function DiscountsPage() {
  const [discounts] = useState([
    {
      id: 1,
      code: "SUMMER2024",
      type: "Percentage",
      value: 20,
      usage: "45/100",
      status: "Active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
    },
    {
      id: 2,
      code: "WELCOME50",
      type: "Fixed Amount",
      value: 50,
      usage: "Unlimited",
      status: "Active",
      startDate: "2024-03-01",
      endDate: "2024-12-31",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Discounts</h1>
          <p className="text-gray-600 mt-1">
            Manage promotional codes and offers
          </p>
        </div>
        <Button className="bg-primary">
          <Plus className="w-4 h-4 mr-2" /> Create Discount
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Active Discounts
          </h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Usage</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Revenue Impact</h3>
          <p className="text-2xl font-bold mt-2">-$5,678</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search discounts..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">{discount.code}</TableCell>
                  <TableCell>{discount.type}</TableCell>
                  <TableCell>
                    {discount.type === "Percentage"
                      ? `${discount.value}%`
                      : `$${discount.value}`}
                  </TableCell>
                  <TableCell>{discount.usage}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {discount.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {discount.startDate} - {discount.endDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
