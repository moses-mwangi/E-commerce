"use client";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailVerifiedPage() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // className="min-h-screen flex items-center justify-center p-4 bg-gray-50"
      className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-8 space-y-8 shadow-lg">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-8">
            {/* <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Admin Logo"
                fill
                className="object-contain"
                priority
              />
               <Logo /> 
            </div> */}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
          <p className="text-gray-600 text-base pt-1">
            We&apos;ve sent you instructions to verify your email
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <p className="text-center text-gray-600">
            Please check your email for instructions to verify your email. If
            you Don&rsquo;t see it, check your spam folder.
          </p>
          <Button
            onClick={() => {
              setLoading(true);
              push("/registration/signup");
            }}
            type="button"
            variant="outline"
            disabled={loading === true}
            className="w-full text-white hover:text-white bg-orange-500/95 hover:bg-orange-600"
          >
            {loading === true ? <ButtonLoader /> : " Use another email"}
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-2 text-blue-600/90">
          <ArrowLeft className="w-4 h-4" />
          <Link href="/" className="text-sm hover:underline ">
            Back to Home page
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
