"use client";

import Image from "next/image";
import Link from "next/link";

const phoneNumber = "254729617393";
const defaultMessage = `
Hi Welcome to Kivamall!
Kenya’s digital shopping mall.  
We deliver fashion, electronics, beauty, and more!.  
Vendors can list their products for free. How can we help you today?
`;

const whatsappBusiness = {
  name: "WhatsApp",
  icon: (
    <Image
      width={50}
      height={50}
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="Chat with Kivamall on WhatsApp"
      className="object-contain bg-gray-100 rounded-full p-1 hover:scale-110 transition-transform"
    />
  ),

  url: `https://wa.me/${phoneNumber}?text=${defaultMessage}`,
};

export default function LiveChat() {
  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce hover:animate-none">
      <Link
        href={whatsappBusiness.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
      >
        {whatsappBusiness.icon}
      </Link>
    </div>
  );
}
