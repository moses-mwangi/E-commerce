import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import Navbar from "../home-page/navbar/Navbar";
import Sidebar from "./adminComponents/SideBar";
// import Sidebar from "./AdminSideBar";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col rounded-none">
        <div className="w-full py-10 px-4 rounded-none border border-b-gray-200"></div>
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-2xl font-bold">$50,000</p>
          </Card>
          <Card className="p-4">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold">1,250</p>
          </Card>
          <Card className="p-4">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl font-bold">8,900</p>
          </Card>
        </main>
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <BarChart />
          <LineChart /> */}
        </section>
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <Table />
        </section>
      </div>
    </div>
  );
}
