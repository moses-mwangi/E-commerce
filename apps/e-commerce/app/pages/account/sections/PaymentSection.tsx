"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Plus } from "lucide-react";

const savedCards = [
  {
    id: 1,
    last4: "4242",
    expiry: "12/24",
    type: "Visa",
  },
];

export default function PaymentSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
      <div className="space-y-4">
        {savedCards.map((card) => (
          <Card key={card.id} className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium">•••• {card.last4}</p>
                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </Card>
        ))}
        <Button className="w-full" variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Add New Card
        </Button>
      </div>
    </div>
  );
}
