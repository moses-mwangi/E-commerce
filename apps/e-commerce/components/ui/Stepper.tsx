import { useState } from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
              index <= currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          <p className="text-sm mt-1">{step}</p>
        </div>
      ))}
    </div>
  );
};
