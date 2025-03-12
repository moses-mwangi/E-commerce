"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function EmailVerifiedPage() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const token = searchParams.get("token");

  const { error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    } else if (error) {
      router.push("/registration/email-verification-failed");
    } else {
      setMessage("Invalid or missing token.");
    }
  }, [dispatch, token, error, router]);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        router.push("/pages/account");
      }, 4000);
    }
  }, [isAuthenticated, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-orange-50 to-orange-100"
    >
      <Card className="text-center space-y-6 px-5 py-7 shadow-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900">
          Email Verified Successfully!
        </h1>
        <p className="text-gray-600  max-w-md mx-auto">
          Your email has been verified. You can now access all features of your
          account.
        </p>

        <Button
          className="bg-orange-500/95   text-white hover:bg-orange-600 w-full"
          asChild
        >
          <Link href="/">Continue to Home page</Link>
        </Button>
      </Card>
    </motion.div>
  );
}
