"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignInUpFormSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-300 p-6">
      <Skeleton className="h-10 w-80 mb-6" />
      <Card className="w-[415px] max-w-md px-6 py-10 bg-white rounded-lg shadow-md">
        <Skeleton className="h-6 w-60 mx-auto mb-4" />
        <form className="space-y-4">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-40 mt-2" />
          </div>

          <Skeleton className="h-12 w-full my-7" />
        </form>
        <Skeleton className="h-4 w-60 mx-auto mt-4" />
        <div className="mt-6 flex items-center gap-2">
          <Skeleton className="h-[2px] w-full" />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-[2px] w-full" />
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}
