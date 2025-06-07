"use client";

import { List, PhoneCall } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const tabsValues = [
  {
    value: "category",
    option: "CATEGORIES",
  },
  {
    value: "menu",
    option: "MENU",
  },
];

const socialMedia = [
  {
    name: "Facebook",
    icon: (
      <Image
        width={50}
        height={50}
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        alt="Facebook"
        className="h-5 w-5 object-contain"
      />
    ),
    url: "https://www.facebook.com/",
  },
  {
    name: "Instagram",
    icon: (
      <Image
        width={50}
        height={50}
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
        alt="Instagram"
        className="h-5 w-5 object-contain"
      />
    ),
    url: "https://www.instagram.com/",
  },
  {
    name: "YouTube",
    icon: (
      <Image
        width={50}
        height={50}
        src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
        alt="YouTube"
        className="h-5 w-5 object-contain"
      />
    ),
    url: "https://www.youtube.com/",
  },
  {
    name: "LinkedIn",
    icon: (
      <Image
        width={50}
        height={50}
        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
        alt="LinkedIn"
        className="h-5 w-5 object-contain"
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

interface Prop {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ setIsLoading }: Prop) {
  const [currentTab, setCurrentTab] = useState("category");

  const navigate = () => {
    setIsLoading(true);
  };

  return (
    <div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <div className=" text-gray-600">
              <List />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="px-0 overflow-y-auto">
            <SheetHeader className="">
              <SheetTitle className=""></SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex w-full max-w-sm flex-col gap-6">
              <Tabs
                defaultValue="category"
                onValueChange={(value) => setCurrentTab(value)}
                className=""
              >
                <TabsList className="flex justify-between items-center bg-gray-100 rounded-sm">
                  {tabsValues.map((el) => (
                    <div
                      key={el.value}
                      className={`w-full h-full py-[10px] flex items-center justify-center ${
                        currentTab === el.value ? "bg-gray-200" : ""
                      }`}
                    >
                      <TabsTrigger
                        value={el.value}
                        className={`text-[13px] text-gray-800 font-semibold border-gray-300 h-full `}
                      >
                        {el.option}
                      </TabsTrigger>
                    </div>
                  ))}
                </TabsList>
                <TabsContent value="category" className="mt-[6px]">
                  <Card className="rounded-none shadow-none border-none py-3 text-sm text-gray-700">
                    <CardContent className="grid gap-3 px-3 pb-0">
                      <div onClick={() => navigate()} className="">
                        <Link href={`/category`}>Categories</Link>
                      </div>
                      <Separator />
                      <div onClick={() => navigate()} className="">
                        <Link
                          href={`/supports/help-center/deliveryInformation`}
                        >
                          Delivery
                        </Link>
                      </div>
                      <Separator />

                      <div onClick={() => navigate()} className="">
                        <Link href={`/supports`}>Supports</Link>
                      </div>
                      <Separator />
                      <div onClick={() => navigate()} className="">
                        <Link href={`/supports/security`}>Security</Link>
                      </div>
                      <Separator />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="menu">
                  <Card className="rounded-none shadow-none border-none pt-3 text-sm text-gray-700">
                    <CardContent className="grid gap-3 py-0 px-3">
                      <div onClick={() => navigate()} className="">
                        <Link href={`/`}>Home</Link>
                      </div>
                      <Separator />
                      <div onClick={() => navigate()} className="">
                        <Link href={`/supports/about_us`}>About Us</Link>
                      </div>
                      <Separator />
                      <div onClick={() => navigate()} className="">
                        <Link href={`/`}>Contact Us</Link>
                      </div>
                      <Separator />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="border-t px-3 pt-5">
                <h3 className="font-semibold text-[15px] mb-3">
                  Support Options
                </h3>
                <Button
                  variant="outline"
                  className="w-full mb-2 h-8 bg-gray-100"
                >
                  <PhoneCall /> +254 725672675
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 mb-2 h-8">
                  <Image
                    width={19}
                    height={19}
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="object-contain"
                  />
                  Live Chat
                </Button>
                <Button variant="outline" className="w-full h-8 bg-gray-100">
                  📧 moses.mwangi.me@gmail.com
                </Button>
              </div>
              <div className="border-t px-3 py-5">
                <h3 className="font-semibold text-[15px] mb-3">Follow Us</h3>
                <div className="flex items-center gap-4">
                  {socialMedia.map((item, idx) => (
                    <Link key={idx} href={item.url} className="">
                      {item.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
