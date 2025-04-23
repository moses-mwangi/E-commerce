"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, X, Loader2, Check, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ARProductViewer({
  productName,
}: {
  productName: string;
}) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [arActive, setArActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for WebXR/AR support
  useEffect(() => {
    const checkSupport = async () => {
      try {
        // Basic feature detection
        const supported =
          "xr" in navigator &&
          (await (navigator as any).xr?.isSessionSupported("immersive-ar"));
        setIsSupported(!!supported);
      } catch (err) {
        console.error("AR support check failed:", err);
        setIsSupported(false);
        setError("Failed to check AR capabilities");
      }
    };

    checkSupport();
  }, []);

  const launchAR = async () => {
    setIsLoading(true);
    setError(null);

    // Simulate AR loading (replace with actual AR implementation)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setArActive(true);
      // In a real implementation, you would initialize your AR viewer here
      toast.success("succes");
    } catch (err) {
      setError("Failed to launch AR viewer");
      console.error(err);
      toast.error("Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const exitAR = () => {
    setArActive(false);
    // In a real implementation, you would clean up AR resources here
  };

  if (arActive) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-black/50 text-white">
          <h2 className="text-xl font-bold">Viewing {productName} in AR</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={exitAR}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* AR Viewport Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Mock AR content - replace with actual AR renderer */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md text-center">
                <Smartphone className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  AR Experience
                </h3>
                <p className="text-white/80 mb-6">
                  Point your camera at a flat surface to place the product
                </p>
                <div className="animate-pulse bg-white/20 h-48 rounded-lg flex items-center justify-center">
                  <p className="text-white/60">3D Product Model</p>
                </div>
                <div className="mt-6 flex gap-3 justify-center">
                  <Button variant="secondary" className="gap-2">
                    <Check className="h-4 w-4" /> Place Product
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30"
                  >
                    Change Color
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">
            View {productName} in your space
          </h2>
          <p className="text-gray-600 mb-4">
            See how this product looks in your room before you buy. Works on
            most modern smartphones.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              {isSupported === null ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSupported ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span className="text-sm">
                {isSupported === null
                  ? "Checking AR support..."
                  : isSupported
                  ? "Your device supports AR"
                  : "AR may not be supported on your device"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Requires motion sensor/camera</span>
            </div>
          </div>

          <Button
            onClick={launchAR}
            disabled={isSupported === false || isLoading}
            className="w-full md:w-auto gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Launching AR...
              </>
            ) : (
              <>
                <Smartphone className="h-4 w-4" />
                View in AR
              </>
            )}
          </Button>

          {error && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> {error}
            </p>
          )}
        </div>

        <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="relative w-full h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <Smartphone className="h-12 w-12 text-gray-400" />
              <div className="absolute bottom-4 left-4 right-4 h-16 bg-white/80 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
