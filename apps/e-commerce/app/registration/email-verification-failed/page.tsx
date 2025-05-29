"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";

export default function EmailVerificationFailedPage() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/resend-verification", {
        email: "",
      });
      toast.success("Verification email sent!");
      push("/registration/email-verified-msg");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gray-50"
    >
      <Card className="text-center space-y-6 px-8 py-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900">
          Email Verification Failed
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          The verification link is invalid or has expired. Please request a new
          verification email.
        </p>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <a href="/registration/signin">Sign In</a>
          </Button>
          <Button
            className="bg-orange-500/90 hover:bg-orange-600"
            onClick={resendVerificationEmail}
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : "Resend Verification"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
