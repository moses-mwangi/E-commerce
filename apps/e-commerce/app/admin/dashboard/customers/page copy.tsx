"use client";

import { useEffect, useState } from "react";
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
import { Search, Filter, Mail, Phone, MoreVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";

export default function CustomersPage() {
  const { users, currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getCurrentUser());
  }, [dispatch]);

  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8901",
      orders: 15,
      totalSpent: 2499.99,
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8902",
      orders: 8,
      totalSpent: 1299.99,
      status: "Active",
      joinDate: "2024-02-20",
    },
  ]);

  const getDate = (date: string) => {
    const dates = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = new Date(date).toLocaleTimeString();
    return `${dates}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer base</p>
        </div>
        <Button className="bg-primary">Export Customers</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <span className="text-green-600 text-sm">↑ 12% from last month</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Active Customers
          </h3>
          <p className="text-2xl font-bold mt-2">892</p>
          <span className="text-green-600 text-sm">↑ 8% from last month</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
          <p className="text-2xl font-bold mt-2">156</p>
          <span className="text-green-600 text-sm">↑ 24% from last month</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Churn Rate</h3>
          <p className="text-2xl font-bold mt-2">2.4%</p>
          <span className="text-red-600 text-sm">↑ 0.3% from last month</span>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* {customer.orders} */}
                    hhh
                  </TableCell>
                  <TableCell>
                    $ 65
                    {/* {customer.totalSpent} */}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {/* {customer.status} */}
                      pedd
                    </span>
                  </TableCell>
                  <TableCell>
                    {/* {customer.createdAt?.toDateString()} */}
                    {getDate(customer?.createdAt || "")}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
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
