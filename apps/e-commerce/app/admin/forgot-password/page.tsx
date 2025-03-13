// "use client";

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { motion } from "framer-motion";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Here you would typically make an API call to send reset email
//       // const response = await axios.post('/api/admin/forgot-password', { email });

//       setEmailSent(true);
//       toast.success("Reset instructions sent to your email", {
//         icon: "📧",
//         duration: 5000,
//       });
//     } catch (error) {
//       toast.error("Failed to send reset email. Please try again.", {
//         icon: "❌",
//       });
//       console.error("Forgot password error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4"
//     >
//       <Card className="w-full max-w-md p-8 space-y-8 shadow-lg">
//         <div className="text-center space-y-2">
//           <div className="flex justify-center mb-8">
//             <div className="relative w-20 h-20">
//               <Image
//                 src="/logo.png"
//                 alt="Admin Logo"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {emailSent ? "Check Your Email" : "Reset Password"}
//           </h1>
//           <p className="text-gray-600">
//             {emailSent
//               ? "We've sent you instructions to reset your password"
//               : "Enter your email to receive reset instructions"}
//           </p>
//         </div>

//         {!emailSent ? (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   className={`pl-10 ${error ? "border-red-500" : ""}`}
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     setError("");
//                   }}
//                   disabled={isLoading}
//                   autoComplete="email"
//                 />
//               </div>
//               {error && (
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-sm text-red-500"
//                 >
//                   {error}
//                 </motion.p>
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-primary hover:bg-primary/90 transition-colors"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Sending...
//                 </>
//               ) : (
//                 "Send Reset Instructions"
//               )}
//             </Button>
//           </form>
//         ) : (
//           <div className="space-y-6">
//             <div className="flex justify-center">
//               <CheckCircle className="w-16 h-16 text-green-500" />
//             </div>
//             <p className="text-center text-gray-600">
//               Please check your email for instructions to reset your password.
//               If you Don&rsquo;t see it, check your spam folder.
//             </p>
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full"
//               onClick={() => setEmailSent(false)}
//             >
//               Try another email
//             </Button>
//           </div>
//         )}

//         <div className="flex items-center justify-center space-x-2">
//           <ArrowLeft className="w-4 h-4 text-gray-600" />
//           <Link
//             href="/admin"
//             className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
//           >
//             Back to Login
//           </Link>
//         </div>
//       </Card>
//     </motion.div>
//   );
// }
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Logo from "@/app/home-page/navbar/logo/logo1";
import { requestPasswordReset } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Email", email);

      await dispatch(requestPasswordReset(email)).unwrap();
      toast.success("Reset instructions sent to your email");

      setEmailSent(true);
      toast.success("Reset instructions sent to your email", {
        icon: "📧",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to send reset email. Try again.", {
        icon: "❌",
      });
      // console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4"
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
          <h1 className="text-2xl font-bold text-gray-900">
            {emailSent ? "Check Your Email" : "Reset Password"}
          </h1>
          <p className="text-gray-600">
            {emailSent
              ? "We've sent you instructions to reset your password"
              : "Enter your email to receive reset instructions"}
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className={`pl-10 ${error ? "border-red-500" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500/85 hover:bg-orange-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-center text-gray-600">
              Please check your email for instructions to reset your password.
              If you Don&rsquo;t see it, check your spam folder.
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Try another email
            </Button>
          </div>
        )}

        <div className="flex text-blue-600 items-center justify-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <Link
            href="/registration/signin"
            className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
          >
            Back to Login
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
