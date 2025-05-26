"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  X,
  Loader2,
  Check,
  AlertCircle,
  Box,
  Clock,
} from "lucide-react";
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setArActive(true);
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
    <div className="">
      <h3 className="text-[22px] sm:text-2xl font-bold mb-4 sm:mb-6 mt-7 sm:mt-12">
        3D & AR Product Viewer
      </h3>

      <Card className="p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h2 className="sm:text-2xl text-lg font-bold text-gray-900">
                View {productName} in Your Space
              </h2>
              <p className="text-gray-600">
                Experience this product in augmented reality before purchasing.
                See how it fits and looks in your actual environment.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Coming Soon
            </div>

            <div className="space-y-3 py-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isSupported === null ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  ) : isSupported ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {isSupported === null
                      ? "Checking AR capabilities..."
                      : isSupported
                      ? "Your device supports AR"
                      : "Limited AR support detected"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isSupported
                      ? "Ready for immersive experiences"
                      : "Some features may not be available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Smartphone className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Mobile Experience</p>
                  <p className="text-sm text-gray-500">
                    Requires camera and motion sensors for full functionality
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Button
                onClick={launchAR}
                disabled={true}
                className="w-full gap-2 relative"
                variant="outline"
              >
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Soon
                </div>
                <Box className="h-4 w-4" />
                Preview in AR
              </Button>

              <p className="text-sm text-center text-gray-500">
                We&apos;re working hard to bring this feature to you soon!
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="relative aspect-[1] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/90 rounded-lg shadow-md flex items-center justify-center">
                    <Box className="h-12 w-12 text-gray-400" />
                  </div>

                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-black/10 blur-sm rounded-full"></div>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white/90 border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Feature Preview
                  </h4>
                  <p className="text-sm text-gray-600">
                    Our AR viewer will be available in the next update
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent flex items-center justify-center gap-4 px-6">
                <div className="h-2 w-16 bg-white/80 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
