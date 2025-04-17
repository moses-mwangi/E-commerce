"use client";
import React from "react";
import { Card } from "@/components/ui/card";

export default function ARProductViewer() {
  return (
    <Card className="p-6 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-2">View in AR</h2>
      <p className="text-gray-500">AR viewer coming soon...</p>
      {/* Future: Integrate WebXR, Model Viewer, or AR.js */}
      {/* <model-viewer
        src="/path-to-your-3d-model.glb"
        alt="3D Product Model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        className="w-full h-80 mx-auto"
        onARStatusChange={(event) => setArSupported(event.detail.supported)}
      ></model-viewer> */}
      {/* <Scene /> */}
    </Card>
  );
}
