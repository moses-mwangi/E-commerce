import React from "react";

export default function ButtonLoader() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-4 border-gray-100 border-dashed rounded-full animate-spin"></div>
      </div>

      {/* <div
        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
       */}
    </div>
  );
}
