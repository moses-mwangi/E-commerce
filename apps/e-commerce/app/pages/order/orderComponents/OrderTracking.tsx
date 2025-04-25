// import { Order } from "@/app/types/order";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { format } from "date-fns";

// type StatusStep = {
//   id: number;
//   name: string;
//   status: "complete" | "current" | "upcoming";
//   date: string;
// };

// export default function OrderTracking({
//   carrier,
//   order,
// }: {
//   carrier: string;
//   order: Order;
// }) {
//   const allStatuses = [
//     "pending",
//     "confirmed",
//     "processing",
//     "shipped",
//     "in_transit",
//     "delivered",
//     "cancelled",
//   ];

//   const currentStatusIndex = allStatuses.indexOf(order.status);

//   const statusSteps: StatusStep[] = [
//     {
//       id: 1,
//       name: "Order Placed",
//       status: currentStatusIndex >= 0 ? "complete" : "upcoming",
//       date: format(new Date(order.createdAt), "MMM d, yyyy"),
//     },
//     {
//       id: 2,
//       name: "Confirmed",
//       status:
//         currentStatusIndex >= 1
//           ? "complete"
//           : currentStatusIndex === 0
//           ? "current"
//           : "upcoming",
//       date:
//         currentStatusIndex >= 1
//           ? format(new Date(order.updatedAt), "MMM d, yyyy")
//           : "",
//     },
//     {
//       id: 3,
//       name: "Processing",
//       status:
//         currentStatusIndex >= 2
//           ? "complete"
//           : currentStatusIndex === 1
//           ? "current"
//           : "upcoming",
//       date:
//         currentStatusIndex >= 2
//           ? format(new Date(order.updatedAt), "MMM d, yyyy")
//           : "",
//     },
//     {
//       id: 4,
//       name: "Shipped",
//       status:
//         currentStatusIndex >= 3
//           ? "complete"
//           : currentStatusIndex === 2
//           ? "current"
//           : "upcoming",
//       date:
//         currentStatusIndex >= 3
//           ? format(new Date(order.updatedAt), "MMM d, yyyy")
//           : "",
//     },
//     {
//       id: 5,
//       name: "In Transit",
//       status:
//         currentStatusIndex >= 4
//           ? "complete"
//           : currentStatusIndex === 3
//           ? "current"
//           : "upcoming",
//       date:
//         currentStatusIndex >= 4
//           ? format(new Date(order.updatedAt), "MMM d, yyyy")
//           : currentStatusIndex === 3
//           ? "Expected soon"
//           : "",
//     },
//     {
//       id: 6,
//       name: "Delivered",
//       status:
//         currentStatusIndex >= 5
//           ? "complete"
//           : currentStatusIndex === 4
//           ? "current"
//           : "upcoming",
//       date:
//         currentStatusIndex >= 5
//           ? format(new Date(order.updatedAt), "MMM d, yyyy")
//           : "",
//     },
//   ];

//   // If order is cancelled, modify the status steps
//   if (order.status === "cancelled") {
//     statusSteps.forEach((step) => {
//       if (step.id > 1) step.status = "upcoming";
//     });
//     statusSteps.push({
//       id: 7,
//       name: "Cancelled",
//       status: "current",
//       date: format(new Date(order.updatedAt), "MMM d, yyyy"),
//     });
//   }

//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger className="w-full">
//           <div className="py-[5px] text-[13px] hover:bg-gray-50/70 px-3 shadow-md border border-gray-100 rounded-md w-full">
//             Track Shipment
//           </div>
//         </DialogTrigger>
//         <DialogContent className="max-w-2xl max-h-[90svh] overflow-y-scroll p-6 rounded-lg shadow-lg">
//           <div className="space-y-6">
//             <div className="border rounded-lg p-4 bg-gray-50">
//               <DialogTitle className="font-semibold text-lg">
//                 Tracking Information
//               </DialogTitle>
//               <DialogDescription className="text-gray-600 text-sm">
//                 Stay updated on your order&apos;s delivery progress.
//               </DialogDescription>
//               <div className="grid grid-cols-3 gap-4 mt-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Order Number</p>
//                   <p className="font-medium">ORD-#{order?.id}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Tracking Number</p>
//                   <p className="font-medium">
//                     {order?.trackingNumber || "Not available yet"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Carrier</p>
//                   <p className="font-medium">{carrier || "Not assigned yet"}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Delivery Status */}
//             <div className="border rounded-lg p-4 bg-white">
//               <h3 className="font-semibold mb-4 text-lg">Delivery Status</h3>
//               <div className="space-y-6">
//                 {statusSteps.map((step) => (
//                   <div key={step.id} className="flex items-center gap-4">
//                     {/* Step Indicator */}
//                     <div
//                       className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold
//                       ${
//                         step.status === "complete"
//                           ? "bg-green-100 text-green-600"
//                           : step.status === "current"
//                           ? "bg-blue-100 text-blue-600 animate-pulse"
//                           : "bg-gray-200 text-gray-500"
//                       }`}
//                     >
//                       {step.status === "complete" ? "✓" : step.id}
//                     </div>

//                     {/* Step Description */}
//                     <div className="flex-1">
//                       <p
//                         className={`text-sm font-medium ${
//                           step.status === "current"
//                             ? "text-blue-600"
//                             : step.status === "complete"
//                             ? "text-green-600"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         {step.name}
//                       </p>
//                       <p className="text-xs text-gray-500">{step.date}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
import { Order } from "@/app/types/order";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

type StatusStep = {
  id: number;
  name: string;
  status: "complete" | "current" | "upcoming";
  date: string;
  // Add status field to track the actual status name
  statusField: string;
};

type StatusTimestamps = {
  [key: string]: Date | null;
};

export default function OrderTracking({
  carrier,
  order,
}: {
  carrier: string;
  order: Order & { statusHistory?: StatusTimestamps };
}) {
  const statusSequence = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "in_transit",
    "delivered",
    "cancelled",
  ];

  // Get current status index
  const currentStatusIndex = statusSequence.indexOf(order.status);

  // Create a status history object with timestamps
  // This should come from your backend/database
  const statusHistory = order.statusHistory || {
    pending: new Date(order.createdAt),
    confirmed: null,
    processing: null,
    shipped: null,
    in_transit: null,
    delivered: null,
    cancelled: null,
    // Initialize with createdAt for pending status
    ...(order.status === "pending" && { pending: new Date(order.createdAt) }),
    // Add other status timestamps if they exist
    ...(order.status !== "pending" && { confirmed: new Date(order.updatedAt) }),
    // Add more as needed based on your actual data structure
  };

  // Create status steps with proper state and dates
  const statusSteps: StatusStep[] = [
    {
      id: 1,
      name: "Order Placed",
      status: "complete", // Always complete if order exists
      date: statusHistory.pending
        ? format(statusHistory.pending, "MMM d, yyyy HH:mm")
        : "",
      statusField: "pending",
    },
    {
      id: 2,
      name: "Confirmed",
      status:
        currentStatusIndex >= 1
          ? "complete"
          : currentStatusIndex === 0
          ? "current"
          : "upcoming",
      date: statusHistory.confirmed
        ? format(statusHistory.confirmed, "MMM d, yyyy HH:mm")
        : "",
      statusField: "confirmed",
    },
    {
      id: 3,
      name: "Processing",
      status:
        currentStatusIndex >= 2
          ? "complete"
          : currentStatusIndex === 1
          ? "current"
          : "upcoming",
      date: statusHistory.processing
        ? format(statusHistory.processing, "MMM d, yyyy HH:mm")
        : "",
      statusField: "processing",
    },
    {
      id: 4,
      name: "Shipped",
      status:
        currentStatusIndex >= 3
          ? "complete"
          : currentStatusIndex === 2
          ? "current"
          : "upcoming",
      date: statusHistory.shipped
        ? format(statusHistory.shipped, "MMM d, yyyy HH:mm")
        : "",
      statusField: "shipped",
    },
    {
      id: 5,
      name: "In Transit",
      status:
        currentStatusIndex >= 4
          ? "complete"
          : currentStatusIndex === 3
          ? "current"
          : "upcoming",
      date: statusHistory.in_transit
        ? format(statusHistory.in_transit, "MMM d, yyyy HH:mm")
        : currentStatusIndex === 3
        ? "Expected soon"
        : "",
      statusField: "in_transit",
    },
    {
      id: 6,
      name: "Delivered",
      status:
        currentStatusIndex >= 5
          ? "complete"
          : currentStatusIndex === 4
          ? "current"
          : "upcoming",
      date: statusHistory.delivered
        ? format(statusHistory.delivered, "MMM d, yyyy HH:mm")
        : "",
      statusField: "delivered",
    },
  ];

  // If order is cancelled, modify the status steps
  if (order.status === "cancelled") {
    statusSteps.forEach((step) => {
      if (step.id > 1) step.status = "upcoming";
    });
    statusSteps.push({
      id: 7,
      name: "Cancelled",
      status: "current",
      date: statusHistory.cancelled
        ? format(statusHistory.cancelled, "MMM d, yyyy HH:mm")
        : "",
      statusField: "cancelled",
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="py-[5px] text-[13px] hover:bg-gray-50/70 px-3 shadow-md border border-gray-100 rounded-md w-full">
            Track Shipment
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90svh] overflow-y-scroll p-6 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <DialogTitle className="font-semibold text-lg">
                Tracking Information
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm">
                Stay updated on your order&apos;s delivery progress.
              </DialogDescription>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-medium">ORD-#{order?.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">
                    {order?.trackingNumber || "Not available yet"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carrier</p>
                  <p className="font-medium">{carrier || "Not assigned yet"}</p>
                </div>
              </div>
            </div>

            {/* Delivery Status */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-4 text-lg">Delivery Status</h3>
              <div className="space-y-6">
                {statusSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4">
                    {/* Step Indicator */}
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold 
                      ${
                        step.status === "complete"
                          ? "bg-green-100 text-green-600"
                          : step.status === "current"
                          ? "bg-blue-100 text-blue-600 animate-pulse"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.status === "complete" ? "✓" : step.id}
                    </div>

                    {/* Step Description */}
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          step.status === "current"
                            ? "text-blue-600"
                            : step.status === "complete"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </p>
                      {step.date && (
                        <p className="text-xs text-gray-500">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
