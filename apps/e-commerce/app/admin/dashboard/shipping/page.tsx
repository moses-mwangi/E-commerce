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
import { Search, Filter, MapPin, Package, Settings, Truck } from "lucide-react";

export default function ShippingPage() {
  const [shippingZones] = useState([
    {
      id: 1,
      name: "Domestic Standard",
      regions: "United States",
      methods: ["Standard", "Express"],
      status: "Active",
      rates: "$5.99 - $15.99",
    },
    {
      id: 2,
      name: "International",
      regions: "Worldwide",
      methods: ["Standard", "Priority"],
      status: "Active",
      rates: "$19.99 - $49.99",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Shipping Management
          </h1>
          <p className="text-gray-600 mt-1">
            Configure shipping zones and delivery methods
          </p>
        </div>
        <Button className="bg-primary">
          <Settings className="w-4 h-4 mr-2" /> Configure Shipping
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Pending Orders
              </h3>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">In Transit</h3>
              <p className="text-2xl font-bold mt-1">156</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Delivery Zones
              </h3>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Package className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Average Delivery
              </h3>
              <p className="text-2xl font-bold mt-1">2.4 days</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search shipping zones..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Regions</TableHead>
                <TableHead>Methods</TableHead>
                <TableHead>Rates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingZones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>{zone.regions}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {zone.methods.map((method) => (
                        <span
                          key={method}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{zone.rates}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {zone.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
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
