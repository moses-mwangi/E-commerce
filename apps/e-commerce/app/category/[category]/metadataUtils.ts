import { Metadata } from "next";

export const categoryMetadata: Record<string, Metadata> = {
  "health-beauty": {
    title:
      "Buy Beauty Products Online Kenya | Skincare, Makeup, Haircare - Kivamall",
    description:
      "Kenya's premium online beauty store. Shop 1000+ skincare, makeup, haircare, fragrances & beauty tools. Free delivery in Nairobi & nationwide shipping.",
    keywords: [
      "beauty products Kenya",
      "buy makeup online Kenya",
      "skincare products Nairobi",
      "haircare products Kenya",
      "original perfumes Kenya",
      "beauty tools Kenya",
      "cosmetics online shopping",
      "Kivamall beauty",
      "affordable beauty products",
      "international beauty brands Kenya",
    ],
    openGraph: {
      title: "Beauty Products Kenya | Kivamall Cosmetics & Skincare",
      description:
        "Shop authentic beauty products with free Nairobi delivery. Makeup, skincare, haircare & fragrances from top international brands",
      images: [
        {
          url: "/images/og/beauty-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Beauty Products Collection",
        },
      ],
      url: "https://www.kivamall.com/category/health-beauty",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/health-beauty",
    },
    verification: {
      google: "KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Beauty Products Kenya | Kivamall Cosmetics & Skincare",
        description: "Kenya's largest online beauty store with 1000+ products",
        url: "https://www.kivamall.com/category/health-beauty",
        mainEntityOfPage: "https://www.kivamall.com/category/health-beauty",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Health & Beauty",
              item: "https://www.kivamall.com/category/health-beauty",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/health-beauty?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "fashions-accessories": {
    title:
      "Online Fashion Store Kenya | Clothing, Shoes, Bags & Accessories - Kivamall",
    description:
      "Kenya's leading online fashion destination. Shop trendy clothing, shoes, bags & accessories for men, women & kids. Latest styles with 7-day returns.",
    keywords: [
      "online fashion Kenya",
      "trendy clothes Nairobi",
      "designer shoes Kenya",
      "handbags online shopping",
      "men's fashion Kenya",
      "women's dresses Nairobi",
      "kids clothing Kenya",
      "affordable fashion Kenya",
      "Kivamall fashion",
      "African print clothing",
    ],
    openGraph: {
      title: "Fashion Store Kenya | Kivamall Clothing & Accessories",
      description:
        "Trendy fashion for men, women & kids with 7-day returns. Free Nairobi delivery on orders over KSh 3,000",
      images: [
        {
          url: "/images/og/fashion-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Fashion Collection",
        },
      ],
      url: "https://www.kivamall.com/category/fashions-accessories",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/fashions-accessories",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Fashion Store Kenya | Kivamall Clothing & Accessories",
        description:
          "Kenya's trendiest online fashion destination for the whole family",
        url: "https://www.kivamall.com/category/fashions-accessories",
        mainEntityOfPage:
          "https://www.kivamall.com/category/fashions-accessories",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Fashions & accessories",
              item: "https://www.kivamall.com/category/fashions-accessories",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/fashions-accessories?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "home-kitchen": {
    title:
      "Home & Kitchen Appliances Kenya | Cookware, Electronics, Furniture - Kivamall",
    description:
      "Transform your home with quality appliances from Kivamall. Shop refrigerators, cookware, smart home devices & furniture with installation services.",
    keywords: [
      "kitchen appliances Kenya",
      "home electronics Nairobi",
      "smart home devices",
      "Kenyan furniture online",
      "cooking appliances",
      "home decor Kenya",
      "bedding sets Nairobi",
      "household items Kenya",
      "Kivamall home",
      "premium cookware Kenya",
    ],
    openGraph: {
      title: "Home Appliances Kenya | Kivamall Kitchen & Furniture",
      description:
        "Complete home solutions with professional installation. Free delivery in Nairobi on large appliances",
      images: [
        {
          url: "/images/og/home-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Home & Kitchen Collection",
        },
      ],
      url: "https://www.kivamall.com/category/home-kitchen",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/home-kitchen",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Home Appliances Kenya | Kivamall Kitchen & Furniture",
        description:
          "Kenya's most reliable home appliances and furniture store",
        url: "https://www.kivamall.com/category/home-kitchen",
        mainEntityOfPage: "https://www.kivamall.com/category/home-kitchen",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Home & Kitchen",
              item: "https://www.kivamall.com/category/home-kitchen",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/home-kitchen?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "home-decor": {
    title:
      "Home Decor & Interior Design Items Kenya | Wall Art, Lighting - Kivamall",
    description:
      "Elevate your space with curated home decor from Kivamall. Find wall art, lighting, rugs, cushions & premium interior design solutions in Kenya.",
    keywords: [
      "home decor Kenya",
      "interior design Nairobi",
      "wall art Kenya",
      "modern lighting fixtures",
      "African home decor",
      "curtains and blinds Kenya",
      "home fragrance Nairobi",
      "decorative cushions",
      "Kivamall decor",
      "luxury home accessories",
    ],

    openGraph: {
      title: "Home Decor Kenya | Kivamall Interior Design Solutions",
      description:
        "Premium home decor with free Nairobi delivery. Transform your space with our curated collection of wall art, lighting and textiles",
      images: [
        {
          url: "/images/og/decor-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Home Decor Collection",
        },
      ],
      url: "https://www.kivamall.com/category/home-decor",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/home-decor",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Home Decor Kenya | Kivamall Interior Design Solutions",
        description:
          "Kenya's premier destination for premium home decor and interior design",
        url: "https://www.kivamall.com/category/home-decor",
        mainEntityOfPage: "https://www.kivamall.com/category/home-decor",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Home Decor",
              item: "https://www.kivamall.com/category/home-decor",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/home-decor?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "jewelry-watches": {
    title: "Jewelry & Luxury Watches Kenya | Gold, Diamonds - Kivamall",
    description:
      "Shop genuine jewelry & luxury watches in Kenya. 100% authentic gold, diamonds, and premium timepieces with certification and lifetime warranty.",
    keywords: [
      "gold jewelry Kenya",
      "diamond rings Nairobi",
      "luxury watches Kenya",
      "authentic jewelry online",
      "men's watches Kenya",
      "bridal jewelry Nairobi",
      "investment watches",
      "Kivamall jewelry",
      "Swiss watches Kenya",
      "African jewelry designs",
    ],
    openGraph: {
      title: "Jewelry & Watches Kenya | Kivamall Luxury Timepieces",
      description:
        "Certified authentic jewelry & Swiss watches with lifetime warranty. Free valuation and engraving services available",
      images: [
        {
          url: "/images/og/jewelry-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Jewelry & Watches Collection",
        },
      ],
      url: "https://www.kivamall.com/category/jewelry-watches",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/jewelry-watches",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Jewelry & Watches Kenya | Kivamall Luxury Timepieces",
        description:
          "Kenya's trusted source for certified luxury jewelry and watches",
        url: "https://www.kivamall.com/category/jewelry-watches",
        mainEntityOfPage: "https://www.kivamall.com/category/jewelry-watches",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Jewelry & Watches",
              item: "https://www.kivamall.com/category/jewelry-watches",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/jewelry-watches?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "consumer-electronics": {
    title: "Electronics Store Kenya | Phones, Laptops, TVs, Gadgets - Kivamall",
    description:
      "Kenya's trusted electronics shop. Buy smartphones, laptops, TVs, audio devices & gadgets with warranty. Official distributor of major tech brands.",
    keywords: [
      "smartphones Kenya",
      "laptops Nairobi",
      "4K TVs Kenya",
      "gaming consoles",
      "bluetooth speakers",
      "tech gadgets Kenya",
      "Kivamall electronics",
      "genuine electronics Kenya",
      "phone accessories Nairobi",
      "smart home devices",
    ],
    openGraph: {
      title: "Electronics Kenya | Kivamall Official Tech Store",
      description:
        "Authorized dealer for Samsung, Apple, LG and more. Genuine products with manufacturer warranty and after-sales support",
      images: [
        {
          url: "/images/og/electronics-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Electronics Collection",
        },
      ],
      url: "https://www.kivamall.com/category/consumer-electronics",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/consumer-electronics",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Electronics Kenya | Kivamall Official Tech Store",
        description:
          "Kenya's authorized electronics retailer with genuine products and warranties",
        url: "https://www.kivamall.com/category/consumer-electronics",
        mainEntityOfPage:
          "https://www.kivamall.com/category/consumer-electronics",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Consumer Electronics",
              item: "https://www.kivamall.com/category/consumer-electronics",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/consumer-electronics?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "security-devices": {
    title:
      "Security Systems Kenya | CCTV Cameras, Alarms, Smart Locks - Kivamall",
    description:
      "Premium security solutions for homes & businesses in Kenya. CCTV cameras, alarm systems, smart locks with professional installation services.",
    keywords: [
      "CCTV cameras Kenya",
      "home security systems",
      "smart locks Nairobi",
      "car tracking devices",
      "biometric access control",
      "Kivamall security",
      "alarm systems Kenya",
      "surveillance equipment",
      "fire safety devices",
      "cyber security Kenya",
    ],
    openGraph: {
      title: "Security Systems Kenya | Kivamall Professional Solutions",
      description:
        "Complete security packages with professional installation. Free site surveys and 24/7 support available",
      images: [
        {
          url: "/images/og/security-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Security Devices Collection",
        },
      ],
      url: "https://www.kivamall.com/category/security-devices",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/security-devices",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Security Systems Kenya | Kivamall Professional Solutions",
        description:
          "Kenya's leading provider of professional security systems and surveillance equipment",
        url: "https://www.kivamall.com/category/security-devices",
        mainEntityOfPage: "https://www.kivamall.com/category/security-devices",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Security Devices",
              item: "https://www.kivamall.com/category/security-devices",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/security-devices?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  "car-accessories": {
    title:
      "Car Accessories & Parts Kenya | Premium Auto Care Products - Kivamall",
    description:
      "Enhance your vehicle with premium car accessories in Kenya. Car audio systems, seat covers, navigation, cleaning kits & genuine spare parts.",
    keywords: [
      "car accessories Kenya",
      "car audio systems Nairobi",
      "vehicle security Kenya",
      "car care products",
      "seat covers Kenya",
      "Kivamall auto",
      "car spare parts",
      "tires and wheels Nairobi",
      "auto detailing Kenya",
      "car electronics",
    ],
    openGraph: {
      title: "Car Accessories Kenya | Kivamall Auto Enhancements",
      description:
        "Premium car accessories with professional installation. Free fitting for audio systems and security devices",
      images: [
        {
          url: "/images/og/car-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Car Accessories Collection",
        },
      ],
      url: "https://www.kivamall.com/category/car-accessories",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/car-accessories",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Car Accessories Kenya | Kivamall Auto Enhancements",
        description:
          "Kenya's premier destination for premium car accessories and auto care products",
        url: "https://www.kivamall.com/category/car-accessories",
        mainEntityOfPage: "https://www.kivamall.com/category/car-accessories",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Car Accessories",
              item: "https://www.kivamall.com/category/car-accessories",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/car-accessories?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },

  construction: {
    title:
      "Construction Materials & Equipment Kenya | Building Supplies Online - Kivamall",
    description:
      "Kenya's premier online construction store. Buy quality building materials, tools, hardware & equipment with nationwide delivery. Best prices on cement, roofing, plumbing & more.",
    keywords: [
      "construction materials Kenya",
      "building supplies Nairobi",
      "construction equipment online",
      "cement prices Kenya",
      "roofing materials Nairobi",
      "plumbing supplies Kenya",
      "electrical wiring products",
      "hardware store online",
      "Kivamall construction",
      "quality building materials Kenya",
      "construction tools Kenya",
      "steel bars Nairobi",
      "sand and ballast delivery",
      "tiles and flooring Kenya",
      "paint and coatings Nairobi",
    ],
    openGraph: {
      title: "Construction Materials Kenya | Kivamall Building Supplies",
      description:
        "Source all your construction needs online - cement, roofing, plumbing, tools & equipment with trusted quality & nationwide delivery",
      images: [
        {
          url: "/images/og/construction-og.jpg",
          width: 1200,
          height: 630,
          alt: "Kivamall Construction Materials Collection",
        },
      ],
      url: "https://www.kivamall.com/category/construction",
      type: "website",
    },
    alternates: {
      canonical: "https://www.kivamall.com/category/construction",
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Construction Materials Kenya | Kivamall Building Supplies",
        description:
          "Kenya's premier online construction store for building materials and equipment",
        url: "https://www.kivamall.com/category/construction",
        mainEntityOfPage: "https://www.kivamall.com/category/construction",

        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.kivamall.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Construction",
              item: "https://www.kivamall.com/category/construction",
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kivamall.com/category/construction?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  },
};
