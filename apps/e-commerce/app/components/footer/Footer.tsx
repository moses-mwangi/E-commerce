"use client";

import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

const socialMedia = [
  {
    name: "Facebook",
    icon: (
      <Image
        width={29}
        height={29}
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        alt="Facebook"
        className="object-contain bg-gray-100 rounded-full p-[4px]"
      />
    ),
    url: "https://www.facebook.com/",
  },
  {
    name: "Instagram",
    icon: (
      <Image
        width={29}
        height={29}
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
        alt="Instagram"
        className="object-contain bg-gray-100 rounded-full p-[4px]"
      />
    ),
    url: "https://www.instagram.com/",
  },
  {
    name: "YouTube",
    icon: (
      <Image
        width={29}
        height={29}
        src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
        alt="YouTube"
        className="w-7 h-7 object-contain bg-gray-100 rounded-full p-[4px]"
      />
    ),
    url: "https://www.youtube.com/",
  },
  {
    name: "LinkedIn",
    icon: (
      <Image
        width={29}
        height={29}
        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
        alt="LinkedIn"
        className=" object-contain bg-gray-100 rounded-full p-[4px]"
      />
    ),
    url: "https://www.linkedin.com/in/moses-mwangi-5b4ba6292/",
  },
  {
    name: "XTwitter",
    icon: (
      <FaXTwitter
        size={28}
        className="text-black dark:text-white bg-gray-100 rounded-full p-[4px]"
      />
    ),
    url: "https://x.com/",
  },
  {
    name: "WhatsApp",
    icon: (
      <Image
        width={29}
        height={29}
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className=" object-contain bg-gray-100 rounded-full p-[px]"
      />
    ),
    url: "https://wa.me/",
  },
  {
    name: "TikTok",
    icon: (
      <FaTiktok
        size={27}
        className="text-black dark:text-white bg-gray-100 rounded-full p-[4px]"
      />
    ),

    url: "https://www.tiktok.com/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm pt-12 pb-6">
      <div className="mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Get Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/supports" className="hover:text-gray-400">
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/supports/help-center/order-status"
                className="hover:text-gray-400"
              >
                Live Chat
              </a>
            </li>
            <li>
              <a
                href="/supports/help-center/order-status"
                className="hover:text-gray-400"
              >
                Check Order Status
              </a>
            </li>
            <li>
              <a
                href="/supports/help-center/returns-refunds"
                className="hover:text-gray-400"
              >
                Refunds
              </a>
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
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Source on Our Platform
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                How to shop prodcts
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
            {/* <li>
              <a href="#" className="hover:text-gray-400">
                Supplier App
              </a>
            </li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Get to Know Us
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/supports/about_us/company_info"
                className="hover:text-gray-400"
              >
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
              <a
                // href="/supports/about_us/career"
                href="#"
                className="hover:text-gray-400"
              >
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className=" mx-auto px-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            {socialMedia.map((el, idx) => (
              <Link href={el.url} key={idx}>
                {el.icon}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <FaCcVisa size={36} />
            <FaCcMastercard size={36} />
            <FaCcPaypal size={36} />
            <FaCcAmex size={36} />
          </div>
        </div>
      </div>

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
