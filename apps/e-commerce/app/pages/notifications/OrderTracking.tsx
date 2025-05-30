export default function OrderTracking({
  orderId,
  trackingNumber,
  carrier,
}: {
  orderId: string;
  trackingNumber: string;
  carrier: string;
}) {
  const statuses = [
    { id: 1, name: "Order Placed", status: "complete", date: "Nov 15, 2023" },
    { id: 2, name: "Processing", status: "complete", date: "Nov 16, 2023" },
    { id: 3, name: "Shipped", status: "complete", date: "Nov 18, 2023" },
    {
      id: 4,
      name: "In Transit",
      status: "current",
      date: "Expected Nov 22, 2023",
    },
    { id: 5, name: "Delivered", status: "upcoming", date: "" },
  ];

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">Tracking Information</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-medium">{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tracking Number</p>
            <p className="font-medium">{trackingNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Carrier</p>
            <p className="font-medium">{carrier}</p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Delivery Status</h3>
        <div className="space-y-8">
          {statuses.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step.status === "complete"
                    ? "bg-green-100 text-green-600"
                    : step.status === "current"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "complete" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="ml-4">
                <p
                  className={`text-sm font-medium ${
                    step.status === "current"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-sm text-gray-500">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
