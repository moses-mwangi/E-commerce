"use client";

import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Home,
  Info,
  List,
  Mail,
  PhoneCall,
  Shield,
  Truck,
} from "lucide-react";
import React, { Fragment, useState } from "react";

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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

const phoneNumber = "254729617393";
// const defaultMessage = `
// Hi Welcome to Kivamall! \nKenya’s digital /n \n  shopping mall.
// We deliver fashion, electronics, beauty, and more!.
// Vendors can list their products for free. How can we help you today?
// `;

const defaultMessage = `
Hello Kivamall 👋,  
I'm excited to explore Kenya’s digital shopping mall!  
Looking forward to finding great deals on fashion, electronics, beauty products, and more.  
I’m also interested in listing my products—love that it's free for vendors!  
Could you please assist me with getting started?
`;

const tabsValues = [
  {
    value: "category",
    option: "CATEGORIES",
  },
  {
    value: "menu",
    option: "MENU",
  },
  {
    value: "value",
    option: "VALUE",
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
    url: "https://www.instagram.com/kivamall.ke/",
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
  // {
  //   name: "WhatsApp",
  //   icon: (
  //     <Image
  //       width={29}
  //       height={29}
  //       src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
  //       alt="WhatsApp"
  //       className=" object-contain bg-gray-100 rounded-full p-[px]"
  //     />
  //   ),
  //   url: "https://wa.me/",
  // },
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

const menu = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  {
    href: "/category",
    label: "Categories",
    icon: <List size={18} />,
  },
  {
    href: "/supports/help-center/deliveryInformation",
    label: "Delivery",
    icon: <Truck size={18} />,
  },
  {
    href: "/supports",
    label: "Supports",
    icon: <HelpCircle size={18} />,
  },
  {
    href: "/supports/security",
    label: "Security",
    icon: <Shield size={18} />,
  },
  {
    href: "/supports/about_us",
    label: "About Us",
    icon: <Info size={18} />,
  },
  {
    href: "/contact",
    label: "Contact Us",
    icon: <Mail size={18} />,
  },
];

interface Prop {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ setIsLoading }: Prop) {
  const { push } = useRouter();
  const [currentTab, setCurrentTab] = useState("category");
  const { categories } = useSelector((state: RootState) => state.category);
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  const navigate = () => {
    setIsLoading(true);
  };

  const toggleShowAll = (categoryId: string) => {
    setShowAll((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
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
          <SheetContent
            side="left"
            className="px-0 overflow-y-auto w-[340px] sm:w-auto"
          >
            <SheetHeader className="">
              <SheetTitle className=""></SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex w-full max-w-[400px] flex-col gap-6">
              <Tabs
                defaultValue="category"
                onValueChange={(value) => setCurrentTab(value)}
                className=""
              >
                <TabsList className="flex justify-between items-center bg-gray-100 rounded-sm">
                  {tabsValues?.map((el) => (
                    <div
                      key={el.value}
                      className={`w-full border-r-2 h-full py-[10px] flex items-center justify-center ${
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
                  <Card className="rounded-none shadow-none border-none pt-2 text-sm text-gray-700">
                    <CardContent className="px-3 pb-0">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-0 p-0"
                      >
                        {categories?.map((category) => (
                          <AccordionItem
                            key={category.id}
                            value={`category-${category.id}`}
                            className="border-b-0 space-y-3 py-1 group"
                          >
                            <div className="flex flex-col">
                              <div
                                className="flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={(e) => {
                                  if (e.target === e.currentTarget) {
                                    navigate();
                                    push(`/category/${category.name}`);
                                  }
                                }}
                              >
                                <span className="font-medium text-gray-700 hover:text-blue-600 cursor-pointer group-data-[state=open]:font-semibold group-data-[state=open]:text-gray-800">
                                  {category.name}
                                </span>
                                <AccordionTrigger className="[&[data-state=open]>svg]:rotate-180 w-8 h-8 p-1 hover:bg-gray-100 rounded-md ml-2" />
                              </div>

                              <AccordionContent className="pt-1 pbdd-2 pl-2">
                                <div className="flex flex-col gap-2">
                                  {/* {category?.subcategories.map( */}
                                  {category?.subcategories
                                    .slice(
                                      0,
                                      showAll[Number(category.id)]
                                        ? category.subcategories.length
                                        : 10
                                    )
                                    .map((subcategory) => (
                                      <div
                                        key={subcategory.id}
                                        onClick={() => {
                                          navigate();
                                          push(
                                            `/category/${category.name}/${subcategory.name}`
                                          );
                                        }}
                                        className="py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                                      >
                                        {subcategory.name}
                                      </div>
                                    ))}
                                  <div>
                                    {category.subcategories.length > 10 && (
                                      <button
                                        onClick={() => {
                                          if (category.id) {
                                            toggleShowAll(String(category.id));
                                          }
                                        }}
                                        className="flex gap-2 items-center py-2 px-3 text-blue-600/75 transition-colors text-left"
                                      >
                                        {showAll[Number(category.id)]
                                          ? "Show less"
                                          : "See all"}
                                        {showAll[Number(category.id)] ? (
                                          <ChevronUp size={18} />
                                        ) : (
                                          <ChevronDown size={18} />
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </AccordionContent>
                            </div>
                            <Separator />
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="menu" className="">
                  <Card className="rounded-none shadow-none border-none pt-3 text-sm font-medium text-gray-700">
                    <CardContent className="grid gap-0 py-0 px-0">
                      {menu.map((item, index) => (
                        <Fragment key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-gray-500">{item.icon}</span>
                            <span className="text-gray-700 hover:text-blue-600">
                              {item.label}
                            </span>
                          </Link>
                          {index < 6 && <Separator className="mx-4" />}
                        </Fragment>
                      ))}
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
                  <PhoneCall /> +254 729617393
                </Button>
                <Link
                  href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
                  className="w-full"
                >
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
                </Link>
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
