import React from "react";

export default function LoadingState() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className=" bg-transparent p-4 rounded-lg flex items-center space-x-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        {/* <span className="text-gray-700">Loading...</span> */}
      </div>
    </div>
  );
}
