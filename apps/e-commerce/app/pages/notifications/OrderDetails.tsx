import { Button } from "@/components/ui/button";
import { Image } from "@radix-ui/react-avatar";

export default function OrderDetails({ order }: { order: any }) {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="space-y-3">
          {order.products?.map((product: any) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Shipping Address</h3>
          <p className="text-sm">123 Main St</p>
          <p className="text-sm">New York, NY 10001</p>
          <p className="text-sm">United States</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Payment Method</h3>
          <p className="text-sm">Visa ending in 4242</p>
          <p className="text-sm">
            Total: $
            {order.products
              ?.reduce((sum: number, p: any) => sum + p.price, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Need Help?</Button>
      </div>
    </div>
  );
}
