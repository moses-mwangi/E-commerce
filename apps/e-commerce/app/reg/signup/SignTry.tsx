"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaApple, FaFacebook, FaFingerprint } from "react-icons/fa";
import { SiWeb3Dotjs } from "react-icons/si";

export default function SignTry() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <section className="flex mt-6 overflow-y-scroll items-center justify-center p-6">
      <motion.div
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {isSignup
            ? "Create an AI-Powered Account"
            : "Sign In to Your Account"}
        </h2>

        <form className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full p-3 border rounded-lg"
              />
              <select className="w-full p-3 border rounded-lg">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            required
          />
          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg"
              required
            />
          )}

          <div className="flex items-center justify-between">
            {!isSignup && (
              <Link href="#" className="text-blue-600">
                Forgot Password?
              </Link>
            )}
          </div>

          <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 shadow-lg">
            {isSignup ? "Sign Up 🚀" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button
            className="text-blue-600"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className="mt-6 text-center text-gray-600">Or continue with</div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaGoogle size={20} />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaApple size={20} />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFacebook size={20} />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <SiWeb3Dotjs size={20} />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFingerprint size={20} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
