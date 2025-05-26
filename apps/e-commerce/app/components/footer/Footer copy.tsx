"use client";

import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import { AiOutlineMobile } from "react-icons/ai";
import Link from "next/link";
import { SiGoogleappsscript } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm pt-12 pb-6">
      <div className="mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Get Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Live Chat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Check Order Status
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Refunds
              </a>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Report Abuse
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Payments & Protections
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Safe and Easy Payments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Money-Back Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                On-Time Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                After-Sales Protections
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Product Monitoring Services
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Source on Our Platform
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Request for Quotation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Membership Program
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Logistics Solutions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Sales Tax & VAT
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Industry Reads & News
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Sell with Us
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Start Selling
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Seller Central
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Become a Verified Supplier
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Partnerships
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Supplier App
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Get to Know Us
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                About Our Company
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Corporate Responsibility
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                News Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className=" mx-auto px-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaYoutube size={20} />
            </a>
          </div>

          {/* <div className="flex items-center space-x-2 mt-6 md:mt-0">
            <AiOutlineMobile size={24} className="text-orange-500" />
            <span className="text-gray-400">Trade on the go with our App</span>
            <SiGoogleappsscript className="text-orange-500" />
          </div> */}

          <div className="flex space-x-4 mt-6 md:mt-0">
            <FaCcVisa size={36} />
            <FaCcMastercard size={36} />
            <FaCcPaypal size={36} />
            <FaCcAmex size={36} />
          </div>
        </div>
      </div>

      {/* <div className=" mx-auto px-6 mt-10 grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-gray-400">
        <a href="#" className="hover:text-gray-300">
          AliExpress
        </a>
        <a href="#" className="hover:text-gray-300">
          1688.com
        </a>
        <a href="#" className="hover:text-gray-300">
          Tmall
        </a>
        <a href="#" className="hover:text-gray-300">
          Alipay
        </a>
        <a href="#" className="hover:text-gray-300">
          Lazada
        </a>
        <a href="#" className="hover:text-gray-300">
          Taobao Global
        </a>
      </div> */}

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-xs">
        <div className="mb-2">
          <a href="#" className="hover:text-gray-300 mx-2">
            Legal Notice
          </a>
          |
          <a href="#" className="hover:text-gray-300 mx-2">
            Product Listing Policy
          </a>
          |
          <a href="#" className="hover:text-gray-300 mx-2">
            Intellectual Property Protection
          </a>
          |
          <a href="#" className="hover:text-gray-300 mx-2">
            Privacy Policy
          </a>
          |
          <a href="#" className="hover:text-gray-300 mx-2">
            Terms of Use
          </a>
        </div>
        © {new Date().getFullYear()} Hypermart. All Rights Reserved.
      </div>
    </footer>
  );
}
