// app/help/product-questions/page.tsx
import { ArrowLeft, Package, Ruler, Leaf, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function ProductQuestionsHelp() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link
        href="/help"
        className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Help Center
      </Link>

      <div className="flex items-start gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-xl">
          <Package className="text-primary" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Product Information</h1>
          <p className="text-gray-500">
            Guides, specifications, and care instructions
          </p>
        </div>
      </div>

      {/* Interactive Tabs */}
      <Tabs defaultValue="sizing" className="w-full">
        <TabsList className="grid w-full md:grid-cols-4 h-auto">
          <TabsTrigger value="sizing" className="py-3 flex-col h-auto">
            <Ruler className="mb-1" size={18} />
            <span>Sizing Guide</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="py-3 flex-col h-auto">
            <Leaf className="mb-1" size={18} />
            <span>Materials</span>
          </TabsTrigger>
          <TabsTrigger value="care" className="py-3 flex-col h-auto">
            <Shield className="mb-1" size={18} />
            <span>Care Instructions</span>
          </TabsTrigger>
          <TabsTrigger value="authenticity" className="py-3 flex-col h-auto">
            <Package className="mb-1" size={18} />
            <span>Authenticity</span>
          </TabsTrigger>
        </TabsList>

        {/* Sizing Guide */}
        <TabsContent value="sizing" className="mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">How to Measure</h2>
              <div className="prose prose-sm">
                <p>For accurate sizing, follow these steps:</p>
                <ol>
                  <li>Use a soft measuring tape</li>
                  <li>Measure against bare skin, not over clothing</li>
                  <li>Keep the tape snug but not tight</li>
                  <li>Refer to our size conversion charts below</li>
                </ol>
              </div>
              <div className="mt-6">
                <Button variant="outline">Download Size Chart (PDF)</Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-medium mb-3">
                International Size Conversion
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">US</th>
                      <th className="text-left py-2">UK</th>
                      <th className="text-left py-2">EU</th>
                      <th className="text-left py-2">Bust (in)</th>
                      <th className="text-left py-2">Waist (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <tr key={size} className="border-b hover:bg-gray-100">
                        <td className="py-2">{size}</td>
                        <td className="py-2">
                          {size === "XS"
                            ? "4"
                            : size === "S"
                            ? "6"
                            : size === "M"
                            ? "8"
                            : size === "L"
                            ? "10"
                            : "12"}
                        </td>
                        <td className="py-2">
                          {size === "XS"
                            ? "32"
                            : size === "S"
                            ? "34"
                            : size === "M"
                            ? "36"
                            : size === "L"
                            ? "38"
                            : "40"}
                        </td>
                        <td className="py-2">
                          {size === "XS"
                            ? "32-33"
                            : size === "S"
                            ? "34-35"
                            : size === "M"
                            ? "36-37"
                            : size === "L"
                            ? "38-40"
                            : "41-43"}
                        </td>
                        <td className="py-2">
                          {size === "XS"
                            ? "24-25"
                            : size === "S"
                            ? "26-27"
                            : size === "M"
                            ? "28-29"
                            : size === "L"
                            ? "30-32"
                            : "33-35"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Materials */}
        <TabsContent value="materials" className="mt-6">
          <div className="space-y-6">
            <div className="p-5 bg-green-50 rounded-xl border border-green-100">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Leaf className="text-green-600" /> Sustainable Materials
              </h2>
              <p className="text-gray-700">
                We use 100% organic cotton, recycled polyester, and Tencel™ in
                our products. All materials are OEKO-TEX® certified free from
                harmful substances.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "Organic Cotton",
                  desc: "Soft, breathable, and pesticide-free",
                },
                {
                  name: "Recycled Polyester",
                  desc: "Made from post-consumer plastic bottles",
                },
                {
                  name: "Tencel™ Lyocell",
                  desc: "Eco-friendly, moisture-wicking fibers",
                },
              ].map((material) => (
                <div
                  key={material.name}
                  className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <h3 className="font-medium">{material.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{material.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Other tabs would go here... */}
      </Tabs>

      {/* AI Product Assistant */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-xl p-6 border border-primary/10">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Package className="text-primary" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Ask our Product Assistant</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get instant answers about materials, sizing, or compatibility.
              </p>
              <div className="flex gap-3">
                <Input
                  placeholder="Ask a question about our products..."
                  className="flex-1"
                />
                <Button>Ask</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
