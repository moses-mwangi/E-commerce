"use strict";
// {
//   "name": "Health & Beauty",
//   "icon": "💄",
//   "banner": "None",
//   "slug": "health-beauty",
//   "description": "Your ultimate beauty destination with 500,000+ products across skincare, makeup, haircare, fragrances, and wellness essentials.",
//   "featured": "on",
//   "trending": "on",
//   "itemCount": 500000,
//   "filters": [
//     {
//       "name": "Brand",
//       "options": [
//         "L'Oréal",
//         "Maybelline",
//         "MAC",
//         "Fenty Beauty",
//         "The Ordinary",
//         "Olaplex",
//         "Dyson",
//         "Foreo",
//         "La Roche-Posay",
//         "CeraVe",
//         "Glossier",
//         "Innisfree",
//         "Drunk Elephant",
//         "Estée Lauder",
//         "Chanel",
//         "Dior",
//         "La Mer",
//         "Tom Ford",
//         "Guerlain"
//       ]
//     },
//     {
//       "name": "Price",
//       "options": ["Under $10", "$10 - $30", "$30 - $50", "$50 - $100", "$100+"]
//     },
//     {
//       "name": "Skin Type",
//       "options": [
//         "Dry",
//         "Oily",
//         "Combination",
//         "Sensitive",
//         "Normal",
//         "Acne-Prone"
//       ]
//     },
//     {
//       "name": "Hair Type",
//       "options": ["Straight", "Wavy", "Curly", "Coily", "Fine", "Thick"]
//     },
//     {
//       "name": "Special Features",
//       "options": [
//         "Vegan",
//         "Cruelty-Free",
//         "Organic",
//         "Hypoallergenic",
//         "Paraben-Free",
//         "Sulfate-Free"
//       ]
//     }
//   ],
//   "subcategories": [
//     {
//       "name": "Skincare Cleansers",
//       "slug": "cleansers",
//       "description": "Face washes, cleansing balms, and micellar waters to remove impurities without stripping skin.",
//       "itemCount": "25000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Gel", "Foam", "Oil", "Micellar Water", "Balms"]
//         },
//         {
//           "name": "Skin Concern",
//           "options": ["Acne", "Sensitive", "Dry", "Anti-Aging"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Toners",
//       "slug": "toners",
//       "description": "Hydrating and exfoliating toners to balance skin pH and prep for treatment.",
//       "itemCount": 12000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Hydrating", "Exfoliating (AHA/BHA)", "pH-Balancing"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Moisturizers",
//       "slug": "moisturizers",
//       "description": "Day creams, night creams, and gels for all skin types and concerns.",
//       "itemCount": 30000,
//       "filters": [
//         { "name": "Texture", "options": ["Cream", "Gel", "Lotion"] },
//         { "name": "Time of Use", "options": ["Day", "Night", "24h"] }
//       ]
//     },
//     {
//       "name": "Skincare Serums & Treatments",
//       "slug": "serums-treatments",
//       "description": "Targeted treatments with active ingredients for specific skin concerns.",
//       "itemCount": 22000,
//       "filters": [
//         {
//           "name": "Key Ingredient",
//           "options": ["Vitamin C", "Hyaluronic Acid", "Retinol", "Niacinamide"]
//         },
//         {
//           "name": "Concern",
//           "options": ["Anti-Aging", "Brightening", "Acne", "Redness"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Face Oils",
//       "slug": "face-oils",
//       "description": "Nourishing plant-based oils for hydration and glow.",
//       "itemCount": 8000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Dry Oil", "Nourishing Oil", "Anti-Aging"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Face Masks",
//       "slug": "face-masks",
//       "description": "Sheet masks, clay masks, and overnight treatments for instant results.",
//       "itemCount": 15000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Sheet Mask", "Clay Mask", "Sleeping Mask", "Peel-Off"]
//         },
//         {
//           "name": "Function",
//           "options": ["Hydrating", "Detoxifying", "Brightening"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Eye Creams",
//       "slug": "eye-creams",
//       "description": "Specialized treatments for dark circles, puffiness, and fine lines.",
//       "itemCount": 10000,
//       "filters": [
//         {
//           "name": "Concern",
//           "options": ["Dark Circles", "Puffiness", "Wrinkles"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Sunscreen",
//       "slug": "sunscreen",
//       "description": "Daily UV protection in lightweight, matte, or tinted formulas.",
//       "itemCount": 18000,
//       "filters": [
//         { "name": "SPF", "options": ["SPF 30", "SPF 50", "SPF 50+"] },
//         { "name": "Texture", "options": ["Gel", "Cream", "Spray"] }
//       ]
//     },
//     {
//       "name": "Skincare Exfoliators & Scrubs",
//       "slug": "exfoliators-scrubs",
//       "description": "Chemical and physical exfoliators to reveal smoother skin.",
//       "itemCount": 9000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Chemical (AHA/BHA)", "Physical Scrub", "Enzyme"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Lip Care",
//       "slug": "lip-care",
//       "description": "Balms, scrubs, and treatments for soft, hydrated lips.",
//       "itemCount": 7000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Lip Balm", "Lip Scrub", "Lip Mask", "Plumper"]
//         }
//       ]
//     },
//     {
//       "name": "Skincare Tools",
//       "slug": "skincare-tools",
//       "description": "Jade rollers, gua sha, and LED devices for enhanced routines.",
//       "itemCount": 5000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Facial Rollers", "LED Masks", "Derma Rollers"]
//         }
//       ]
//     },
//     {
//       "name": "Makeup Foundation",
//       "slug": "foundation",
//       "description": "Liquid, powder, and stick foundations for flawless coverage.",
//       "itemCount": 20000,
//       "filters": [
//         { "name": "Coverage", "options": ["Sheer", "Medium", "Full"] },
//         { "name": "Finish", "options": ["Matte", "Dewy", "Natural"] }
//       ]
//     },
//     {
//       "name": "Makeup Concealer",
//       "slug": "concealer",
//       "description": "High-coverage concealers for blemishes and dark circles.",
//       "itemCount": 15000,
//       "filters": [{ "name": "Type", "options": ["Liquid", "Cream", "Stick"] }]
//     },
//     {
//       "name": "Makeup Primer",
//       "slug": "primer",
//       "description": "Face and eye primers to smooth and prolong makeup wear.",
//       "itemCount": 8000,
//       "filters": [
//         {
//           "name": "Function",
//           "options": ["Pore-Filling", "Hydrating", "Mattifying"]
//         }
//       ]
//     },
//     {
//       "name": "Makeup Blush",
//       "slug": "blush",
//       "description": "Powder, cream, and liquid blushes for a natural flush.",
//       "itemCount": 10000,
//       "filters": [{ "name": "Type", "options": ["Powder", "Cream", "Liquid"] }]
//     },
//     {
//       "name": "Makeup Highlighter",
//       "slug": "highlighter",
//       "description": "Illuminating powders, creams, and liquids for a radiant glow.",
//       "itemCount": 9000,
//       "filters": [
//         { "name": "Finish", "options": ["Shimmer", "Glossy", "Natural"] }
//       ]
//     },
//     {
//       "name": "Makeup Bronzer",
//       "slug": "bronzer",
//       "description": "Powder and cream bronzers for warmth and contour.",
//       "itemCount": 7000,
//       "filters": [{ "name": "Type", "options": ["Powder", "Cream", "Liquid"] }]
//     },
//     {
//       "name": "Makeup Setting Spray/Powder",
//       "slug": "setting-spray-powder",
//       "description": "Products to lock makeup in place for long-lasting wear.",
//       "itemCount": 6000,
//       "filters": [{ "name": "Type", "options": ["Spray", "Powder"] }]
//     },
//     {
//       "name": "Makeup Eyeshadow",
//       "slug": "eyeshadow",
//       "description": "Pressed powders, creams, and palettes in every shade.",
//       "itemCount": 18000,
//       "filters": [
//         { "name": "Type", "options": ["Pressed Powder", "Cream", "Liquid"] }
//       ]
//     },
//     {
//       "name": "Makeup Eyeliner",
//       "slug": "eyeliner",
//       "description": "Pencils, liquids, and gels for precise definition.",
//       "itemCount": 12000,
//       "filters": [{ "name": "Type", "options": ["Pencil", "Liquid", "Gel"] }]
//     },
//     {
//       "name": "Makeup Mascara",
//       "slug": "mascara",
//       "description": "Lengthening, volumizing, and waterproof formulas.",
//       "itemCount": "10000",
//       "filters": [
//         {
//           "name": "Effect",
//           "options": ["Lengthening", "Volumizing", "Waterproof"]
//         }
//       ]
//     },
//     {
//       "name": "Makeup Brow Products",
//       "slug": "brow-products",
//       "description": "Pencils, gels, and pomades for defined brows.",
//       "itemCount": 8000,
//       "filters": [{ "name": "Type", "options": ["Pencil", "Gel", "Pomade"] }]
//     },
//     {
//       "name": "Makeup Lipstick",
//       "slug": "lipstick",
//       "description": "Matte, satin, and glossy lipsticks in every shade.",
//       "itemCount": 5000,
//       "filters": [{ "name": "Finish", "options": ["Matte", "Satin", "Glossy"] }]
//     },
//     {
//       "name": "Makeup Lip Gloss",
//       "slug": "lip-gloss",
//       "description": "Shiny, plumping, and tinted glosses for hydrated lips.",
//       "itemCount": 5000,
//       "filters": [
//         { "name": "Type", "options": ["Clear", "Tinted", "Plumping"] }
//       ]
//     },
//     {
//       "name": "Makeup Lip Liner",
//       "slug": "lip-liner",
//       "description": "Precision liners to define and shape lips.",
//       "itemCount": 5000,
//       "filters": [{ "name": "Type", "options": ["Pencil", "Liquid"] }]
//     },
//     {
//       "name": "Makeup Lip Balm",
//       "slug": "lip-balm",
//       "description": "Moisturizing balms with SPF, tint, or treatment benefits.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Type", "options": ["Basic", "Tinted", "Medicated"] }
//       ]
//     },
//     {
//       "name": "Makeup Brushes",
//       "slug": "makeup-brushes",
//       "description": "Brushes for foundation, eyeshadow, blending, and more.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Type", "options": ["Foundation", "Eyeshadow", "Blending"] }
//       ]
//     },
//     {
//       "name": "Makeup Sponges",
//       "slug": "makeup-sponges",
//       "description": "Beauty blenders and sponges for seamless application.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Shape", "options": ["Teardrop", "Flat", "Oval"] }]
//     },
//     {
//       "name": "Hair Shampoo",
//       "slug": "shampoo",
//       "description": "Cleansing shampoos for all hair types and concerns.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Hair Concern",
//           "options": ["Dryness", "Dandruff", "Color-Treated"]
//         }
//       ]
//     },
//     {
//       "name": "Hair Conditioner",
//       "slug": "conditioner",
//       "description": "Hydrating and detangling conditioners for soft, manageable hair.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Type", "options": ["Rinse-Out", "Leave-In", "Deep"] }
//       ]
//     },
//     {
//       "name": "Hair Masks & Treatments",
//       "slug": "hair-masks-treatments",
//       "description": "Intensive treatments for repair, hydration, and damage control.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Function",
//           "options": ["Repair", "Hydration", "Damage Control"]
//         }
//       ]
//     },
//     {
//       "name": "Hair Oils & Serums",
//       "slug": "hair-oils-serums",
//       "description": "Lightweight oils and serums for shine and frizz control.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Oil", "Serum", "Dry Oil"] }]
//     },
//     {
//       "name": "Hair Gel",
//       "slug": "hair-gel",
//       "description": "Strong-hold and flexible gels for all-day styling.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Hold", "options": ["Light", "Medium", "Strong"] }]
//     },
//     {
//       "name": "Hair Mousse",
//       "slug": "hair-mousse",
//       "description": "Volumizing and texturizing mousses for lift and body.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Function",
//           "options": ["Volumizing", "Texturizing", "Curl-Defining"]
//         }
//       ]
//     },
//     {
//       "name": "Hair Spray",
//       "slug": "hair-spray",
//       "description": "Flexible to firm-hold sprays for lasting styles.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Hold", "options": ["Flexible", "Medium", "Firm"] }]
//     },
//     {
//       "name": "Hair Styling Creams",
//       "slug": "styling-creams",
//       "description": "Creams for definition, smoothing, and control.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Function", "options": ["Defining", "Smoothing", "Control"] }
//       ]
//     },
//     {
//       "name": "Hair Color",
//       "slug": "hair-color",
//       "description": "Permanent, semi-permanent, and temporary hair dyes.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Permanent", "Semi-Permanent", "Temporary"]
//         }
//       ]
//     },
//     {
//       "name": "Hair Dryers",
//       "slug": "hair-dryers",
//       "description": "Ionic and ceramic dryers for fast, damage-free styling.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Technology", "options": ["Ionic", "Ceramic", "Tourmaline"] }
//       ]
//     },
//     {
//       "name": "Hair Straighteners",
//       "slug": "hair-straighteners",
//       "description": "Flat irons for sleek, smooth styles with adjustable heat.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Plate Material",
//           "options": ["Ceramic", "Titanium", "Tourmaline"]
//         }
//       ]
//     },
//     {
//       "name": "Hair Curling Irons",
//       "slug": "curling-irons",
//       "description": "Wands and barrels for curls, waves, and volume.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Barrel Size", "options": ["0.5\"", "1\"", "1.5\""] }
//       ]
//     },
//     {
//       "name": "Hair Brushes & Combs",
//       "slug": "hair-brushes-combs",
//       "description": "Detangling brushes, wide-tooth combs, and styling tools.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Paddle", "Round", "Vent"] }]
//     },
//     {
//       "name": "Body Wash & Soap",
//       "slug": "body-wash-soap",
//       "description": "Cleansing gels, bars, and oils for all skin types.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Gel", "Bar", "Oil"] }]
//     },
//     {
//       "name": "Body Lotion & Cream",
//       "slug": "body-lotion-cream",
//       "description": "Daily moisturizers for smooth, hydrated skin.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Texture", "options": ["Lotion", "Cream", "Butter"] }
//       ]
//     },
//     {
//       "name": "Body Oils & Butters",
//       "slug": "body-oils-butters",
//       "description": "Rich oils and butters for deep nourishment.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Oil", "Butter", "Dry Oil"] }]
//     },
//     {
//       "name": "Body Scrubs",
//       "slug": "body-scrubs",
//       "description": "Exfoliators to smooth and soften skin.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Sugar", "Salt", "Coffee"] }]
//     },
//     {
//       "name": "Body Deodorants",
//       "slug": "deodorants",
//       "description": "Aluminum-free and antiperspirant options.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Aluminum-Free", "Antiperspirant", "Natural"]
//         }
//       ]
//     },
//     {
//       "name": "Hand & Foot Care",
//       "slug": "hand-foot-care",
//       "description": "Creams, balms, and treatments for soft hands and feet.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Hand Cream", "Foot Cream", "Cuticle Oil"]
//         }
//       ]
//     },
//     {
//       "name": "Bath Salts & Soaks",
//       "slug": "bath-salts",
//       "description": "Relaxing and detoxifying bath additives.",
//       "itemCount": 3500,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Epsom Salt", "Mineral Soak", "Bubble Bath"]
//         }
//       ]
//     },
//     {
//       "name": "Feminine Care",
//       "slug": "feminine-care",
//       "description": "Intimate washes, wipes, and hygiene essentials.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Wash", "Wipes", "Spray"] }]
//     },
//     {
//       "name": "Women Perfumes (Ladies)",
//       "slug": "women-perfume",
//       "description": "Eau de parfum and eau de toilette in floral, woody, and fresh scents.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Scent Family", "options": ["Floral", "Woody", "Citrus"] }
//       ]
//     },
//     {
//       "name": "Colognes Perfumes (Men)",
//       "slug": "men-cologne perfumes",
//       "description": "Masculine fragrances in fresh, spicy, and woody notes.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Scent Family", "options": ["Fresh", "Spicy", "Woody"] }
//       ]
//     },
//     {
//       "name": "Body Mists Perfumes",
//       "slug": "body-mists perfumes",
//       "description": "Lightweight, everyday fragrances for subtle scent.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Scent Family", "options": ["Floral", "Fruity", "Fresh"] }
//       ]
//     },
//     {
//       "name": "Roll-On Fragrances",
//       "slug": "roll-on-fragrance",
//       "description": "Compact, portable perfumes for on-the-go touch-ups.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Oil-Based", "Alcohol-Based"] }]
//     },
//     {
//       "name": "Perfume Oils",
//       "slug": "perfume-oils",
//       "description": "Concentrated fragrance oils for long-lasting scent.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Intensity", "options": ["Light", "Medium", "Strong"] }
//       ]
//     },
//     {
//       "name": "Oral Care",
//       "slug": "oral-care",
//       "description": "Toothpaste, mouthwash, and whitening products.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Type", "options": ["Toothpaste", "Mouthwash", "Whitening"] }
//       ]
//     },
//     {
//       "name": "Hair Removal",
//       "slug": "hair-removal",
//       "description": "Razors, waxing kits, and epilators for smooth skin.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Type", "options": ["Razors", "Waxing Kits", "Epilators"] }
//       ]
//     },
//     {
//       "name": "Feminine Hygiene",
//       "slug": "feminine-hygiene",
//       "description": "Tampons, pads, and menstrual cups.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Type", "options": ["Tampons", "Pads", "Cups"] }]
//     },
//     {
//       "name": "Intimate Wash",
//       "slug": "intimate-wash",
//       "description": "pH-balanced cleansers for intimate areas.",
//       "itemCount": 3500,
//       "filters": [{ "name": "pH Level", "options": ["3.5", "4.5", "5.5"] }]
//     },
//     {
//       "name": "Nail Care Tools",
//       "slug": "nail-care-tools",
//       "description": "Clippers, files, and cuticle care for manicures at home.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Type", "options": ["Clippers", "Files", "Cuticle Pushers"] }
//       ]
//     },
//     {
//       "name": "Natural Skincare",
//       "slug": "natural-skincare",
//       "description": "Clean, plant-based skincare with organic ingredients.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Certification", "options": ["USDA Organic", "Ecocert"] }
//       ]
//     },
//     {
//       "name": "Organic Haircare",
//       "slug": "organic-haircare",
//       "description": "Chemical-free shampoos, conditioners, and treatments.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Certification", "options": ["USDA Organic", "COSMOS"] }
//       ]
//     },
//     {
//       "name": "Vegan Makeup",
//       "slug": "vegan-makeup",
//       "description": "Cruelty-free cosmetics without animal-derived ingredients.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Certification", "options": ["Leaping Bunny", "PETA"] }
//       ]
//     },
//     {
//       "name": "Cruelty-Free Products",
//       "slug": "cruelty-free",
//       "description": "Beauty products never tested on animals.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Certification", "options": ["Leaping Bunny", "PETA"] }
//       ]
//     },
//     {
//       "name": "Facial Rollers & Gua Sha",
//       "slug": "facial-rollers",
//       "description": "Jade and rose quartz tools for lymphatic drainage and glow.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Material", "options": ["Jade", "Rose Quartz", "Metal"] }
//       ]
//     },
//     {
//       "name": "Electric Cleansing Brushes",
//       "slug": "cleansing-brushes",
//       "description": "Sonic brushes for deep cleansing and exfoliation.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Technology", "options": ["Sonic", "Rotating"] }]
//     },
//     {
//       "name": "LED Therapy Devices",
//       "slug": "led-devices",
//       "description": "Light therapy masks for acne, wrinkles, and redness.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Light Color", "options": ["Red", "Blue", "Yellow"] }
//       ]
//     },
//     {
//       "name": "Derma Rollers",
//       "slug": "derma-rollers",
//       "description": "Microneedling tools for product absorption and collagen production.",
//       "itemCount": 3500,
//       "filters": [
//         { "name": "Needle Size", "options": ["0.25mm", "0.5mm", "1.0mm"] }
//       ]
//     },
//     {
//       "name": "Beauty Mirrors",
//       "slug": "beauty-mirrors",
//       "description": "Lighted mirrors with magnification for precise application.",
//       "itemCount": 3500,
//       "filters": [{ "name": "Magnification", "options": ["1x", "5x", "10x"] }]
//     }
//   ]
// }
///////////////////////
// {
//   "name": "Jewelry & Watches",
//   "icon": "💍",
//   "banner": "None",
//   "slug": "timeless jewels and watches",
//   "description": "Discover exquisite jewelry and precision timepieces for every occasion. From engagement rings to luxury watches, find timeless pieces for yourself or as gifts.",
//   "featured": "on",
//   "trending": "on",
//   "itemCount": 453000,
//   "filters": [
//     {
//       "name": "Material",
//       "options": [
//         "Gold",
//         "Silver",
//         "Platinum",
//         "Diamond",
//         "Gemstone",
//         "Pearl",
//         "Stainless Steel",
//         "Titanium"
//       ]
//     },
//     {
//       "name": "Price Range",
//       "options": [
//         "Under $50",
//         "$50 - $200",
//         "$200 - $500",
//         "$500 - $1000",
//         "$1000+"
//       ]
//     },
//     {
//       "name": "Gender",
//       "options": ["Women", "Men", "Unisex"]
//     },
//     {
//       "name": "Occasion",
//       "options": [
//         "Engagement",
//         "Wedding",
//         "Anniversary",
//         "Everyday Wear",
//         "Formal"
//       ]
//     },
//     {
//       "name": "Style",
//       "options": ["Modern", "Vintage", "Minimalist", "Bohemian", "Luxury"]
//     },
//     {
//       "name": "Brand",
//       "options": [
//         "Tiffany & Co.",
//         "Cartier",
//         "Rolex",
//         "Pandora",
//         "Swarovski",
//         "Omega",
//         "David Yurman",
//         "Bulgari"
//       ]
//     }
//   ],
//   "subcategories": [
//     {
//       "name": "Rings",
//       "slug": "rings of elegance",
//       "description": "Engagement rings, wedding bands, fashion rings, and statement pieces for every finger.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Engagement",
//             "Wedding Band",
//             "Fashion",
//             "Cocktail",
//             "Stackable"
//           ]
//         },
//         {
//           "name": "Gemstone",
//           "options": [
//             "Diamond",
//             "Sapphire",
//             "Ruby",
//             "Emerald",
//             "Moissanite",
//             "None"
//           ]
//         },
//         {
//           "name": "Metal",
//           "options": [
//             "White Gold",
//             "Yellow Gold",
//             "Rose Gold",
//             "Platinum",
//             "Sterling Silver"
//           ]
//         },
//         {
//           "name": "Setting",
//           "options": ["Prong", "Bezel", "Pavé", "Channel", "Halo"]
//         }
//       ]
//     },
//     {
//       "name": "Necklaces",
//       "slug": "statement necklaces",
//       "description": "Pendants, chains, chokers, and statement necklaces for every neckline.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Pendant", "Chain", "Choker", "Lariat", "Statement"]
//         },
//         {
//           "name": "Length",
//           "options": ["14\"", "16\"", "18\"", "20\"", "24\""]
//         },
//         {
//           "name": "Clasp",
//           "options": ["Lobster Claw", "Spring Ring", "Box Clasp", "Magnetic"]
//         }
//       ]
//     },
//     {
//       "name": "Earrings",
//       "slug": "stylish-earrings",
//       "description": "Studs, hoops, dangles, and clip-ons for every ear type.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Stud", "Hoop", "Dangle", "Huggie", "Clip-On"]
//         },
//         {
//           "name": "Backing",
//           "options": ["Push Back", "Screw Back", "Latch Back", "None"]
//         }
//       ]
//     },
//     {
//       "name": "Bracelets",
//       "slug": "bracelets and bangles",
//       "description": "Bangles, cuffs, charm bracelets, and beaded designs for wrists of all sizes.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Bangle", "Cuff", "Chain", "Charm", "Beaded"]
//         },
//         {
//           "name": "Clasp",
//           "options": [
//             "Toggle",
//             "Lobster Claw",
//             "Extension Chain",
//             "Sliding Knot"
//           ]
//         }
//       ]
//     },
//     {
//       "name": "Watches",
//       "slug": "timepieces-and-watches",
//       "description": "Luxury, casual, and smartwatches for precision timekeeping with style.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Analog", "Digital", "Smartwatch", "Chronograph", "Dress"]
//         },
//         {
//           "name": "Movement",
//           "options": ["Quartz", "Automatic", "Mechanical", "Solar"]
//         },
//         {
//           "name": "Band Material",
//           "options": ["Leather", "Metal", "Silicone", "Nylon", "Ceramic"]
//         },
//         {
//           "name": "Water Resistance",
//           "options": ["30m", "50m", "100m", "200m+"]
//         }
//       ]
//     },
//     {
//       "name": "Anklets",
//       "slug": "charming anklets",
//       "description": "Delicate chains and beaded designs to adorn your ankles.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Chain", "Beaded", "Charm", "Adjustable"]
//         }
//       ]
//     },
//     {
//       "name": "Brooches & Pins",
//       "slug": "decorative brooches pins",
//       "description": "Decorative pins for lapels, scarves, and hats.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Floral", "Animal", "Geometric", "Vintage"]
//         }
//       ]
//     },
//     {
//       "name": "Men's Jewelry",
//       "slug": "stylish mens jewelry",
//       "description": "Rings, chains, cufflinks, and bracelets designed for men.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Rings", "Chains", "Cufflinks", "Bracelets", "Tie Clips"]
//         },
//         {
//           "name": "Style",
//           "options": ["Minimalist", "Bold", "Luxury", "Gothic"]
//         }
//       ]
//     },
//     {
//       "name": "Body Jewelry",
//       "slug": "modern body jewelry",
//       "description": "Nose rings, belly rings, and other body adornments.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Nose Rings",
//             "Belly Rings",
//             "Ear Cuffs",
//             "Industrial Bars"
//           ]
//         },
//         {
//           "name": "Material",
//           "options": ["Surgical Steel", "Titanium", "Gold", "Acrylic"]
//         }
//       ]
//     },
//     {
//       "name": "Luxury & Fine Jewelry",
//       "slug": "fine luxury jewelry",
//       "description": "High-end pieces with precious metals and gemstones.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Certification",
//           "options": ["GIA", "IGI", "AGS", "None"]
//         },
//         {
//           "name": "Collection",
//           "options": ["Signature", "Limited Edition", "Custom"]
//         }
//       ]
//     },
//     {
//       "name": "Vintage & Antique",
//       "slug": "vintage antique jewelry",
//       "description": "Timeless pieces from past eras with unique craftsmanship.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Era",
//           "options": ["Art Deco", "Victorian", "Retro", "Mid-Century"]
//         }
//       ]
//     },
//     {
//       "name": "Religious & Spiritual",
//       "slug": "spiritual symbols jewelry",
//       "description": "Crosses, evil eye, hamsa, and other symbolic pieces.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Symbol",
//           "options": ["Cross", "Evil Eye", "Hamsa", "Om", "Star of David"]
//         }
//       ]
//     },
//     {
//       "name": "Wedding & Bridal",
//       "slug": "bridal jewelry collection",
//       "description": "Bridal sets, eternity bands, and accessories for the big day.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Bridal Sets", "Eternity Bands", "Hair Jewelry", "Garter"]
//         }
//       ]
//     },
//     {
//       "name": "Kids' Jewelry",
//       "slug": "adorable kids jewelry",
//       "description": "Safe, adorable pieces for children and teens.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Bracelets", "Necklaces", "Earrings", "Charms"]
//         }
//       ]
//     },
//     {
//       "name": "Jewelry Care",
//       "slug": "jewelry maintenance kit",
//       "description": "Cleaners, polishing cloths, and storage solutions.",
//       "itemCount": 453000,
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Cleaners",
//             "Polishing Cloths",
//             "Storage Boxes",
//             "Travel Cases"
//           ]
//         }
//       ]
//     }
//   ]
// }
/////////////////////
// {
//   "name": "Fashion",
//   "icon": "👗",
//   "banner": "None",
//   "slug": "fashion-category",
//   "description": "The world's most complete fashion destination. Shop clothing, shoes, accessories, and luxury items for men, women, kids, plus-size, and gender-neutral styles. 1M+ items across 50+ categories.",
//   "featured": "on",
//   "trending": "on",
//   "itemCount": "1000000+",
//   "filters": [
//     {
//       "name": "Brand",
//       "options": [
//         "Nike",
//         "Gucci",
//         "Zara",
//         "H&M",
//         "Louis Vuitton",
//         "Adidas",
//         "Levi's",
//         "Prada",
//         "Balenciaga",
//         "Uniqlo",
//         "Chanel",
//         "Dior",
//         "Versace",
//         "Tommy Hilfiger",
//         "Calvin Klein"
//       ]
//     },
//     {
//       "name": "Price",
//       "options": [
//         "Under $20",
//         "$20-$50",
//         "$50-$100",
//         "$100-$200",
//         "$200-$500",
//         "$500+"
//       ]
//     },
//     {
//       "name": "Material",
//       "options": [
//         "Cotton",
//         "Denim",
//         "Silk",
//         "Leather",
//         "Wool",
//         "Cashmere",
//         "Linen",
//         "Polyester",
//         "Spandex",
//         "Velvet"
//       ]
//     },
//     {
//       "name": "Size System",
//       "options": ["US", "UK", "EU", "International"]
//     },
//     {
//       "name": "Sustainability",
//       "options": [
//         "Organic",
//         "Recycled",
//         "Vegan",
//         "Fair Trade",
//         "Carbon Neutral"
//       ]
//     },
//     {
//       "name": "Occasion",
//       "options": [
//         "Casual",
//         "Formal",
//         "Work",
//         "Wedding",
//         "Sports",
//         "Beach",
//         "Party"
//       ]
//     },
//     {
//       "name": "Season",
//       "options": ["Spring", "Summer", "Fall", "Winter", "All-Season"]
//     },
//     {
//       "name": "Pattern",
//       "options": [
//         "Solid",
//         "Striped",
//         "Floral",
//         "Plaid",
//         "Animal Print",
//         "Graphic"
//       ]
//     }
//   ],
//   "subcategories": [
//     {
//       "name": "Women's dresses",
//       "slug": "fashion-womens-dresses",
//       "description": "Elegant and casual dresses in various lengths and styles for every occasion.",
//       "itemCount": "15000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Maxi",
//             "Midi",
//             "Mini",
//             "Wrap",
//             "Bodycon",
//             "Shirt",
//             "A-line"
//           ]
//         },
//         {
//           "name": "Sleeve Length",
//           "options": ["Sleeveless", "Short", "3/4", "Long"]
//         }
//       ]
//     },
//     {
//       "name": "Women's Jeans",
//       "slug": "jeans-for-women",
//       "description": "Classic and modern jean styles designed to flatter every figure.",
//       "itemCount": "8000",
//       "filters": [
//         {
//           "name": "Fit",
//           "options": ["Skinny", "Straight", "Bootcut", "Flare", "Boyfriend"]
//         },
//         { "name": "Rise", "options": ["High", "Mid", "Low"] }
//       ]
//     },
//     {
//       "name": "Women's Jackets & Coats",
//       "slug": "womens-jackets-coats",
//       "description": "Layer up with our collection of trendy outerwear for all seasons.",
//       "itemCount": "6000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Denim Jackets",
//             "Leather Jackets",
//             "Trench Coats",
//             "Puffer Jackets"
//           ]
//         }
//       ]
//     },
//     {
//       "name": "Women’s Footwear",
//       "slug": "womens-footwear",
//       "description": "Find the perfect pair of heels, flats, sneakers, boots, sandals, and slippers for women. Available in a variety of materials, colors, and sizes.",
//       "itemCount": "25000",
//       "filters": [
//         {
//           "name": "Category",
//           "options": [
//             "Heels",
//             "Flats",
//             "Sneakers",
//             "Boots",
//             "Sandals",
//             "Slippers"
//           ]
//         },
//         { "name": "Size", "options": ["EU 35-42", "US 4-10", "UK 2-8"] },
//         {
//           "name": "Material",
//           "options": ["Leather", "Suede", "Canvas", "Synthetic", "Mesh"]
//         },
//         {
//           "name": "Color",
//           "options": ["Black", "White", "Pink", "Beige", "Multicolor"]
//         },
//         {
//           "name": "Occasion",
//           "options": ["Casual", "Sports", "Formal", "Office", "Outdoor"]
//         }
//       ]
//     },
//     {
//       "name": "Handbags",
//       "slug": "fashion-handbags",
//       "description": "Stylish handbags in all shapes and sizes for every occasion.",
//       "itemCount": "8000",
//       "filters": [
//         { "name": "Type", "options": ["Tote", "Satchel", "Hobo", "Clutch"] }
//       ]
//     },
//     {
//       "name": "Backpacks",
//       "slug": "fashion-backpacks",
//       "description": "Functional and fashionable backpacks for everyday use.",
//       "itemCount": "3000",
//       "filters": [
//         { "name": "Material", "options": ["Leather", "Canvas", "Nylon"] }
//       ]
//     },
//     {
//       "name": "Men’s Clothing",
//       "slug": "mens-clothing",
//       "description": "Discover stylish and comfortable clothing for men, including t-shirts, shirts, hoodies, jackets, suits, pants, shorts, jeans, and sweaters. Perfect for casual, formal, and sportswear occasions.",
//       "itemCount": "50000",
//       "filters": [
//         {
//           "name": "Category",
//           "options": [
//             "T-Shirts",
//             "Shirts",
//             "Hoodies",
//             "Jackets",
//             "Suits",
//             "Pants",
//             "Shorts",
//             "Jeans",
//             "Sweaters"
//           ]
//         },
//         {
//           "name": "Material",
//           "options": ["Cotton", "Denim", "Polyester", "Leather", "Wool"]
//         },
//         {
//           "name": "Fit",
//           "options": ["Slim Fit", "Regular Fit", "Oversized", "Relaxed Fit"]
//         },
//         {
//           "name": "Size",
//           "options": ["XS", "S", "M", "L", "XL", "XXL", "3XL"]
//         },
//         {
//           "name": "Color",
//           "options": [
//             "Red",
//             "Blue",
//             "Black",
//             "White",
//             "Green",
//             "Yellow",
//             "Multicolor"
//           ]
//         },
//         {
//           "name": "Occasion",
//           "options": ["Casual", "Formal", "Business", "Sportswear"]
//         }
//       ]
//     },
//     {
//       "name": "Men’s Shoes",
//       "slug": "mens footwear",
//       "description": "Step out in style with men’s sneakers, loafers, formal shoes, boots, sandals, and slippers. Choose from leather, suede, canvas, and synthetic materials.",
//       "itemCount": "20000",
//       "filters": [
//         {
//           "name": "Category",
//           "options": [
//             "Sneakers",
//             "Loafers",
//             "Formal Shoes",
//             "Boots",
//             "Sandals",
//             "Slippers"
//           ]
//         },
//         { "name": "Size", "options": ["EU 38-46", "US 5-12", "UK 5-11"] },
//         {
//           "name": "Material",
//           "options": ["Leather", "Suede", "Canvas", "Synthetic", "Mesh"]
//         },
//         {
//           "name": "Color",
//           "options": ["Black", "White", "Brown", "Blue", "Gray", "Multicolor"]
//         },
//         {
//           "name": "Occasion",
//           "options": ["Casual", "Sports", "Formal", "Office", "Outdoor"]
//         }
//       ]
//     },
//     {
//       "name": "Men's Shirts",
//       "slug": "mens-shirts-fashion",
//       "description": "Smart and casual shirt options for work or weekend.",
//       "itemCount": "10000",
//       "filters": [
//         { "name": "Type", "options": ["Dress", "Casual", "Polo", "Flannel"] }
//       ]
//     },
//     {
//       "name": "Men's Jeans",
//       "slug": "mens-jeans-styles",
//       "description": "Jeans for men in every fit and wash you could want.",
//       "itemCount": "8000",
//       "filters": [
//         { "name": "Fit", "options": ["Slim", "Straight", "Relaxed", "Tapered"] }
//       ]
//     },
//     {
//       "name": "Men's Jackets",
//       "slug": "womens-jackets-coats",
//       "description": "Layer up with our collection of trendy outerwear for all seasons.",
//       "itemCount": "6000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Denim Jackets",
//             "Leather Jackets",
//             "Trench Coats",
//             "Puffer Jackets"
//           ]
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "",
//       "slug": "",
//       "description": "",
//       "itemCount": 0,
//       "filters": [
//         {
//           "name": "",
//           "options": []
//         }
//       ]
//     },
//     {
//       "name": "Women's dresses",
//       "slug": "fashion-womens-dresses",
//       "description": "Elegant and casual dresses in various lengths and styles for every occasion.",
//       "itemCount": "15000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Maxi",
//             "Midi",
//             "Mini",
//             "Wrap",
//             "Bodycon",
//             "Shirt",
//             "A-line"
//           ]
//         },
//         {
//           "name": "Sleeve Length",
//           "options": ["Sleeveless", "Short", "3/4", "Long"]
//         }
//       ]
//     },
//     {
//       "name": "Tops & Blouses",
//       "slug": "womens-tops-blouses",
//       "description": "Trendy and comfortable tops, blouses, and bodysuits for everyday and formal wear.",
//       "itemCount": "12000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "T-Shirts",
//             "Blouses",
//             "Crop Tops",
//             "Bodysuits",
//             "Tank Tops"
//           ]
//         }
//       ]
//     },
//     {
//       "name": "Women's Jeans",
//       "slug": "jeans-for-women",
//       "description": "Classic and modern jean styles designed to flatter every figure.",
//       "itemCount": "8000",
//       "filters": [
//         {
//           "name": "Fit",
//           "options": ["Skinny", "Straight", "Bootcut", "Flare", "Boyfriend"]
//         },
//         { "name": "Rise", "options": ["High", "Mid", "Low"] }
//       ]
//     },
//     {
//       "name": "Jackets & Coats",
//       "slug": "womens-jackets-coats",
//       "description": "Layer up with our collection of trendy outerwear for all seasons.",
//       "itemCount": "6000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": [
//             "Denim Jackets",
//             "Leather Jackets",
//             "Trench Coats",
//             "Puffer Jackets"
//           ]
//         }
//       ]
//     },
//     {
//       "name": "Heels",
//       "slug": "fashion-heels",
//       "description": "Elevate your look with stylish heels for every event.",
//       "itemCount": "5000",
//       "filters": [
//         {
//           "name": "Height",
//           "options": ["Low (1-2in)", "Medium (2-3in)", "High (3in+)"]
//         }
//       ]
//     },
//     {
//       "name": "Boots",
//       "slug": "fashion-boots-women",
//       "description": "From ankle to over-the-knee, find boots that complete your outfit.",
//       "itemCount": "4000",
//       "filters": [
//         {
//           "name": "Style",
//           "options": ["Ankle", "Knee-High", "Over-the-Knee", "Chelsea"]
//         }
//       ]
//     },
//     {
//       "name": "Handbags",
//       "slug": "fashion-handbags",
//       "description": "Stylish handbags in all shapes and sizes for every occasion.",
//       "itemCount": "8000",
//       "filters": [
//         { "name": "Type", "options": ["Tote", "Satchel", "Hobo", "Clutch"] }
//       ]
//     },
//     {
//       "name": "Backpacks",
//       "slug": "fashion-backpacks",
//       "description": "Functional and fashionable backpacks for everyday use.",
//       "itemCount": "3000",
//       "filters": [
//         { "name": "Material", "options": ["Leather", "Canvas", "Nylon"] }
//       ]
//     },
//     {
//       "name": "Men's Shirts",
//       "slug": "mens-shirts-fashion",
//       "description": "Smart and casual shirt options for work or weekend.",
//       "itemCount": "10000",
//       "filters": [
//         { "name": "Type", "options": ["Dress", "Casual", "Polo", "Flannel"] }
//       ]
//     },
//     {
//       "name": "Men's Jeans",
//       "slug": "mens-jeans-styles",
//       "description": "Jeans for men in every fit and wash you could want.",
//       "itemCount": "8000",
//       "filters": [
//         { "name": "Fit", "options": ["Slim", "Straight", "Relaxed", "Tapered"] }
//       ]
//     },
//     {
//       "name": "Baby Clothing",
//       "slug": "baby-apparel",
//       "description": "Adorable and comfy outfits for the littlest fashionistas.",
//       "itemCount": "8000",
//       "filters": [{ "name": "Age", "options": ["Newborn", "0-6M", "6-12M"] }]
//     },
//     {
//       "name": "Plus Size Fashion",
//       "slug": "fashion-plus-size",
//       "description": "Chic and trendy outfits in inclusive sizes for every shape.",
//       "itemCount": "20000",
//       "filters": [{ "name": "Size Range", "options": ["1X-3X", "4X-6X"] }]
//     },
//     {
//       "name": "Petite Fashion",
//       "slug": "fashion-petite",
//       "description": "Tailored styles designed to flatter petite frames.",
//       "itemCount": "10000",
//       "filters": [{ "name": "Fit", "options": ["Slim", "Regular"] }]
//     },
//     {
//       "name": "Maternity Wear",
//       "slug": "fashion-maternity",
//       "description": "Comfort meets style with our curated maternity fashion.",
//       "itemCount": "8000",
//       "filters": [
//         { "name": "Trimester", "options": ["First", "Second", "Third"] }
//       ]
//     },
//     {
//       "name": "Gender Neutral",
//       "slug": "gender-inclusive-fashion",
//       "description": "Timeless and inclusive styles for every identity.",
//       "itemCount": "5000",
//       "filters": [{ "name": "Style", "options": ["Casual", "Minimal", "Bold"] }]
//     },
//     {
//       "name": "Luxury & Designer",
//       "slug": "designer-luxury-fashion",
//       "description": "Exclusive pieces from top luxury fashion houses.",
//       "itemCount": "10000",
//       "filters": [
//         { "name": "Designer", "options": ["Gucci", "Prada", "Balenciaga"] }
//       ]
//     },
//     {
//       "name": "Wedding Guest",
//       "slug": "fashion-wedding-guest",
//       "description": "Elegant attire options perfect for attending weddings.",
//       "itemCount": "5000",
//       "filters": [
//         {
//           "name": "Dress Code",
//           "options": ["Formal", "Semi-Formal", "Black Tie Optional"]
//         }
//       ]
//     },
//     {
//       "name": "Work Attire",
//       "slug": "professional-fashion",
//       "description": "Polished and professional pieces for every work environment.",
//       "itemCount": "12000",
//       "filters": [
//         {
//           "name": "Type",
//           "options": ["Suits", "Blazers", "Dress Pants", "Work Dresses"]
//         }
//       ]
//     },
//     {
//       "name": "Streetwear",
//       "slug": "urban-streetwear",
//       "description": "Bold and trendy urban wear for men and women.",
//       "itemCount": "15000",
//       "filters": [
//         { "name": "Style", "options": ["Oversized", "Graphic", "Monochrome"] }
//       ]
//     },
//     {
//       "name": "Vintage Inspired",
//       "slug": "vintage-retro-fashion",
//       "description": "Timeless fashion with a vintage flair and retro details.",
//       "itemCount": "8000",
//       "filters": [{ "name": "Era", "options": ["70s", "80s", "90s", "Y2K"] }]
//     }
//   ]
// }
/////////////////////////////////////
// {
//   "name": "Electronics",
//   "icon": "None",
//   "banner": "None",
//   "slug": "electronic-devices",
//   "description": "Explore the latest electronic devices, including smartphones, laptops, tablets, TVs, audio systems, smart home devices, cameras, drones, gaming gear, wearables, and more. Stay connected and productive with cutting-edge technology for every lifestyle.",
//   "featured": "on",
//   "trending": "on",
//   "itemCount": "500000",
//   "filters": [
//     {
//       "name": "Brand",
//       "options": ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "ASUS", "LG", "Canon", "Microsoft"]
//     },
//     {
//       "name": "Price Range",
//       "options": ["Under $100", "$100 - $500", "$500 - $1000", "$1000+"]
//     },
//     {
//       "name": "Color",
//       "options": ["Black", "White", "Silver", "Grey", "Blue", "Red"]
//     }
//   ],
//   "subcategories": [
//     {
//       "name": "Smartphones & Accessories",
//       "slug": "smartphones-accessories",
//       "description": "Latest smartphones and mobile accessories with advanced features like high-resolution cameras, large batteries, and fast processors.",
//       "itemCount": "150000",
//       "filters": [
//         { "name": "Brand", "options": ["Apple", "Samsung", "Xiaomi", "OnePlus", "Google"] },
//         { "name": "Operating System", "options": ["iOS", "Android"] },
//         { "name": "Storage", "options": ["64GB", "128GB", "256GB", "512GB", "1TB"] },
//         { "name": "RAM", "options": ["4GB", "6GB", "8GB", "12GB", "16GB"] },
//         { "name": "Battery", "options": ["3000mAh", "4000mAh", "5000mAh+"] },
//         { "name": "Connectivity", "options": ["4G", "5G", "Wi-Fi", "NFC"] },
//         { "name": "Accessories", "options": ["Chargers", "Covers", "Screen Protectors", "Cables"] }
//       ]
//     },
//     {
//       "name": "Laptops & Computers",
//       "slug": "laptops-computers",
//       "description": "Powerful laptops and desktop computers for business, study, and gaming with latest processors and graphics.",
//       "itemCount": "100000",
//       "filters": [
//         { "name": "Brand", "options": ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer"] },
//         { "name": "Processor", "options": ["Intel i3", "Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "Ryzen 7"] },
//         { "name": "RAM", "options": ["8GB", "16GB", "32GB", "64GB"] },
//         { "name": "Storage", "options": ["256GB SSD", "512GB SSD", "1TB SSD", "HDD + SSD"] },
//         { "name": "Graphics", "options": ["Integrated", "NVIDIA GTX", "NVIDIA RTX", "AMD Radeon"] },
//         { "name": "Screen Size", "options": ["13\"", "14\"", "15.6\"", "17\""] }
//       ]
//     },
//     {
//       "name": "Tablets & e-Readers",
//       "slug": "tablets-e-readers",
//       "description": "Tablets for entertainment or productivity and e-readers for a superior digital reading experience.",
//       "itemCount": "50000",
//       "filters": [
//         { "name": "Brand", "options": ["Apple", "Samsung", "Amazon", "Lenovo", "Microsoft"] },
//         { "name": "Screen Size", "options": ["7\"", "8\"", "10\"", "12\""] },
//         { "name": "Storage", "options": ["32GB", "64GB", "128GB", "256GB"] },
//         { "name": "Connectivity", "options": ["Wi-Fi", "Wi-Fi + Cellular"] }
//       ]
//     },
//     {
//       "name": "Televisions & Home Entertainment",
//       "slug": "televisions-home-entertainment",
//       "description": "Smart TVs, sound systems, and home theatre accessories for immersive entertainment at home.",
//       "itemCount": "70000",
//       "filters": [
//         { "name": "Brand", "options": ["Samsung", "Sony", "LG", "TCL", "Panasonic"] },
//         { "name": "Screen Size", "options": ["32\"", "43\"", "50\"", "55\"", "65\"", "75\""] },
//         { "name": "Resolution", "options": ["HD", "Full HD", "4K", "8K"] },
//         { "name": "Display Type", "options": ["LED", "OLED", "QLED", "Mini-LED"] }
//       ]
//     },
//     {
//       "name": "Audio & Headphones",
//       "slug": "audio-headphones",
//       "description": "High-fidelity headphones, earbuds, Bluetooth speakers, and audio accessories.",
//       "itemCount": "50000",
//       "filters": [
//         { "name": "Brand", "options": ["Sony", "Bose", "JBL", "Apple", "Sennheiser"] },
//         { "name": "Type", "options": ["Headphones", "Earbuds", "Speakers", "Soundbars"] },
//         { "name": "Connectivity", "options": ["Wired", "Wireless", "Bluetooth"] },
//         { "name": "Features", "options": ["Noise Cancelling", "Waterproof", "Touch Control"] }
//       ]
//     },
//     {
//       "name": "Smart Home Devices",
//       "slug": "smart-home-devices",
//       "description": "Smart speakers, plugs, bulbs, and thermostats that automate your home with voice control and scheduling.",
//       "itemCount": "30000",
//       "filters": [
//         { "name": "Brand", "options": ["Amazon", "Google", "Apple", "TP-Link", "Philips Hue"] },
//         { "name": "Compatibility", "options": ["Alexa", "Google Assistant", "Siri"] },
//         { "name": "Device Type", "options": ["Smart Plug", "Smart Speaker", "Smart Display", "Smart Light"] }
//       ]
//     },
//     {
//       "name": "Cameras & Drones",
//       "slug": "cameras-drones",
//       "description": "Professional and compact cameras and drones with high-resolution imaging and video capture.",
//       "itemCount": "40000",
//       "filters": [
//         { "name": "Brand", "options": ["Canon", "Nikon", "Sony", "DJI", "GoPro"] },
//         { "name": "Type", "options": ["DSLR", "Mirrorless", "Drone", "Action Camera"] },
//         { "name": "Resolution", "options": ["1080p", "4K", "6K", "8K"] }
//       ]
//     },
//     {
//       "name": "Gaming Consoles & Accessories",
//       "slug": "gaming-consoles-accessories",
//       "description": "Consoles, controllers, VR gear, and accessories for console and PC gamers.",
//       "itemCount": "30000",
//       "filters": [
//         { "name": "Brand", "options": ["Sony", "Microsoft", "Nintendo"] },
//         { "name": "Console", "options": ["PlayStation", "Xbox", "Nintendo Switch"] },
//         { "name": "Accessories", "options": ["Controllers", "Headsets", "Charging Stations", "VR Sets"] }
//       ]
//     },
//     {
//       "name": "Wearable Technology",
//       "slug": "wearable-technology",
//       "description": "Smartwatches, fitness trackers, and health monitoring bands for an active lifestyle.",
//       "itemCount": "25000",
//       "filters": [
//         { "name": "Brand", "options": ["Apple", "Samsung", "Fitbit", "Garmin", "Amazfit"] },
//         { "name": "Features", "options": ["Heart Rate Monitor", "GPS", "Waterproof", "Sleep Tracking"] },
//         { "name": "Type", "options": ["Smartwatch", "Fitness Tracker"] }
//       ]
//     },
//     {
//       "name": "Computer Accessories",
//       "slug": "computer-accessories",
//       "description": "Keyboards, mice, monitors, webcams, external storage, and more to complete your workstation.",
//       "itemCount": "30000",
//       "filters": [
//         { "name": "Brand", "options": ["Logitech", "HP", "Dell", "ASUS", "Razer"] },
//         { "name": "Type", "options": ["Monitor", "Keyboard", "Mouse", "External HDD", "Webcam"] },
//         { "name": "Connectivity", "options": ["Wired", "Wireless", "Bluetooth"] }
//       ]
//     },
//     {
//       "name": "Printers & Scanners",
//       "slug": "printers-scanners",
//       "description": "Inkjet and laser printers, all-in-one printers, and scanners for home and office use.",
//       "itemCount": "15000",
//       "filters": [
//         { "name": "Brand", "options": ["HP", "Canon", "Epson", "Brother"] },
//         { "name": "Type", "options": ["Inkjet", "Laser", "All-in-One", "Photo Printer"] },
//         { "name": "Connectivity", "options": ["USB", "Wi-Fi", "Ethernet"] }
//       ]
//     },
//     {
//       "name": "Networking Devices",
//       "slug": "networking-devices",
//       "description": "Wi-Fi routers, range extenders, mesh systems, and modems to keep you connected.",
//       "itemCount": "12000",
//       "filters": [
//         { "name": "Brand", "options": ["TP-Link", "Netgear", "ASUS", "D-Link", "Linksys"] },
//         { "name": "Device Type", "options": ["Router", "Modem", "Mesh Wi-Fi", "Range Extender"] },
//         { "name": "Speed", "options": ["300 Mbps", "600 Mbps", "1200 Mbps", "3000 Mbps+"] }
//       ]
//     }
//   ]
// }
//////////////////////////////////
// {
//   "name": "Security Devices",
//   "icon": "security",
//   "banner": "https://example.com/images/categories/security-devices-banner.jpg",
//   "slug": "security-devices",
//   "description": "Protect your property, loved ones, and digital life with cutting-edge security solutions. Discover the latest in surveillance cameras, smart locks, alarm systems, motion sensors, video doorbells, GPS trackers, fire safety devices, cybersecurity tools, perimeter defense, smart safes, and emergency response systems. Designed for homes, businesses, and mobile assets, our devices offer real-time alerts, remote control, and integration with leading smart ecosystems.",
//   "featured": "on",
//   "trending": "on",
//   "itemCount": "115000",
//   "filters": [
//     {
//       "name": "Brand",
//       "options": ["Arlo", "Ring", "Nest", "Hikvision", "Dahua", "SimpliSafe", "August", "Yale", "Wyze", "Eufy", "Reolink", "Ubiquiti", "TP-Link", "Netgear", "Google", "Abode", "Bosch"]
//     },
//     {
//       "name": "Price Range",
//       "options": ["Under $50", "$50 - $200", "$200 - $500", "$500+"]
//     },
//     {
//       "name": "Connectivity",
//       "options": ["Wired", "Wireless", "PoE", "WiFi", "Bluetooth", "Zigbee", "Z-Wave", "GSM"]
//     }
//   ],
//   "subcategories": [
//     {
//       "name": "Surveillance Cameras",
//       "slug": "surveillance-cameras",
//       "description": "Monitor your property with indoor, outdoor, dome, bullet, and PTZ cameras. Features include high-resolution recording, night vision, AI face detection, motion tracking, and cloud or local storage.",
//       "itemCount": "20000",
//       "filters": [
//         { "name": "Camera Type", "options": ["Indoor", "Outdoor", "Dome", "Bullet", "PTZ (Pan-Tilt-Zoom)"] },
//         { "name": "Resolution", "options": ["720p", "1080p", "2K", "4K", "8K"] },
//         { "name": "Night Vision", "options": ["Yes", "No"] },
//         { "name": "Connectivity", "options": ["Wired", "Wireless", "PoE (Power over Ethernet)"] },
//         { "name": "Smart Features", "options": ["Motion Detection", "AI Face Recognition", "Cloud Storage", "Two-Way Audio"] }
//       ]
//     },
//     {
//       "name": "Smart Door Locks & Biometric Systems",
//       "slug": "smart-door-locks-biometric-systems",
//       "description": "Secure your doors with advanced locking systems using fingerprint, facial recognition, RFID, or keypad access. Remotely manage access and monitor entry logs via your smartphone.",
//       "itemCount": "15000",
//       "filters": [
//         { "name": "Lock Type", "options": ["Fingerprint", "RFID Card", "Keypad", "Facial Recognition", "Bluetooth"] },
//         { "name": "Connectivity", "options": ["WiFi", "Bluetooth", "Zigbee", "Z-Wave"] },
//         { "name": "Power Source", "options": ["Battery", "Hardwired"] },
//         { "name": "Material", "options": ["Stainless Steel", "Aluminum", "Plastic"] }
//       ]
//     },
//     {
//       "name": "Alarm Systems & Sirens",
//       "slug": "alarm-systems-sirens",
//       "description": "Install intruder and hazard alert systems including burglar alarms, fire alarms, and gas leak detectors. Get instant mobile alerts, automatic calls to emergency services, and smart integration.",
//       "itemCount": "10000",
//       "filters": [
//         { "name": "Alarm Type", "options": ["Burglar Alarm", "Fire Alarm", "Carbon Monoxide Detector", "Gas Leak Detector"] },
//         { "name": "Connectivity", "options": ["WiFi", "Cellular", "Landline"] },
//         { "name": "Power Source", "options": ["Battery-Powered", "Wired", "Solar-Powered"] },
//         { "name": "Smart Features", "options": ["Mobile Alerts", "Remote Deactivation", "24/7 Monitoring"] }
//       ]
//     },
//     {
//       "name": "Motion Detectors & Sensors",
//       "slug": "motion-detectors-sensors",
//       "description": "Detect unauthorized movement with PIR, microwave, and dual-technology sensors. Compatible with smart home platforms for real-time alerts and automation.",
//       "itemCount": "8000",
//       "filters": [
//         { "name": "Sensor Type", "options": ["PIR (Passive Infrared)", "Microwave", "Dual Technology"] },
//         { "name": "Detection Range", "options": ["10m", "20m", "30m", "50m"] },
//         { "name": "Smart Integration", "options": ["Alexa", "Google Assistant", "Apple HomeKit"] },
//         { "name": "Power Source", "options": ["Battery", "Hardwired", "Solar"] }
//       ]
//     },
//     {
//       "name": "Smart Video Doorbells",
//       "slug": "smart-video-doorbells",
//       "description": "Monitor and interact with visitors remotely using video doorbells with high-definition video, two-way audio, and cloud/local video recording.",
//       "itemCount": "12000",
//       "filters": [
//         { "name": "Resolution", "options": ["720p", "1080p", "2K", "4K"] },
//         { "name": "Two-Way Audio", "options": ["Yes", "No"] },
//         { "name": "Power Source", "options": ["Battery", "Wired"] },
//         { "name": "Storage", "options": ["Cloud", "Local SD Card", "Hybrid"] },
//         { "name": "Night Vision", "options": ["Yes", "No"] }
//       ]
//     },
//     {
//       "name": "GPS Trackers & Asset Security",
//       "slug": "gps-trackers-asset-security",
//       "description": "Track and monitor the location of vehicles, pets, packages, and valuable assets with high-precision GPS systems and geo-fencing alerts.",
//       "itemCount": "7000",
//       "filters": [
//         { "name": "Use Case", "options": ["Vehicle", "Personal", "Pet", "Luggage", "Asset"] },
//         { "name": "Connectivity", "options": ["4G LTE", "GPS+WiFi", "RFID"] },
//         { "name": "Battery Life", "options": ["1 Week", "1 Month", "6 Months", "1 Year"] },
//         { "name": "Geo-Fencing Alerts", "options": ["Yes", "No"] }
//       ]
//     },
//     {
//       "name": "Fire Safety & Smoke Detectors",
//       "slug": "fire-safety-smoke-detectors",
//       "description": "Detect fires early with smoke, heat, and CO detectors. Smart features provide app alerts, emergency calls, and auto-testing capabilities.",
//       "itemCount": "9000",
//       "filters": [
//         { "name": "Detection Type", "options": ["Smoke", "Heat", "Carbon Monoxide", "Multi-Sensor"] },
//         { "name": "Power Source", "options": ["Battery", "Hardwired"] },
//         { "name": "Smart Features", "options": ["App Alerts", "Automatic Emergency Calls", "Self-Test Function"] },
//         { "name": "Sensitivity Levels", "options": ["Low", "Medium", "High"] }
//       ]
//     },
//     {
//       "name": "Smart Safes & Vaults",
//       "slug": "smart-safes-vaults",
//       "description": "Store cash, documents, and valuables in fireproof and waterproof safes with biometric, keypad, or key-based access.",
//       "itemCount": "5000",
//       "filters": [
//         { "name": "Lock Type", "options": ["Biometric", "Keypad", "RFID", "Key Lock"] },
//         { "name": "Material", "options": ["Steel", "Aluminum", "Composite"] },
//         { "name": "Fireproof", "options": ["Yes", "No"] },
//         { "name": "Size", "options": ["Small", "Medium", "Large"] },
//         { "name": "Waterproof", "options": ["Yes", "No"] }
//       ]
//     },
//     {
//       "name": "Perimeter Security & Fencing Systems",
//       "slug": "perimeter-security-fencing-systems",
//       "description": "Install smart gates, electric fences, and motion-detecting barriers to secure property perimeters with wireless or GSM alerts.",
//       "itemCount": "4000",
//       "filters": [
//         { "name": "Security Type", "options": ["Electric Fence", "Motion Sensor Fence", "Smart Gate"] },
//         { "name": "Material", "options": ["Steel", "Aluminum", "Composite"] },
//         { "name": "Connectivity", "options": ["WiFi", "Bluetooth", "GSM"] }
//       ]
//     },
//     {
//       "name": "Cybersecurity Devices",
//       "slug": "cybersecurity-devices",
//       "description": "Guard your digital identity and data with VPN routers, encrypted USBs, firewalls, and physical authentication keys.",
//       "itemCount": "3000",
//       "filters": [
//         { "name": "Type", "options": ["VPN Router", "Encrypted USB", "Hardware Firewall", "Anti-Hacking Dongle", "Security Key"] },
//         { "name": "Connectivity", "options": ["Wired", "Wireless"] },
//         { "name": "Security Level", "options": ["Basic", "Advanced", "Enterprise"] }
//       ]
//     },
//     {
//       "name": "Emergency Response Systems",
//       "slug": "emergency-response-systems",
//       "description": "Equip your home or workplace with panic buttons, emergency alert wearables, and fall detectors. Ideal for elderly care and personal safety.",
//       "itemCount": "4000",
//       "filters": [
//         { "name": "Device Type", "options": ["Panic Button", "Fall Detector", "Wearable Alert", "Medical Alert System"] },
//         { "name": "Connectivity", "options": ["Cellular", "WiFi", "Bluetooth", "GSM"] },
//         { "name": "Integration", "options": ["Alexa", "Google Assistant", "Apple HealthKit"] }
//       ]
//     },
//     {
//       "name": "Security Lighting",
//       "slug": "security-lighting",
//       "description": "Illuminate dark areas with motion-activated lights, floodlights, and smart outdoor lighting. Enhance visibility and deter intruders.",
//       "itemCount": "6000",
//       "filters": [
//         { "name": "Light Type", "options": ["Motion-Activated", "Floodlight", "Smart Outdoor Light"] },
//         { "name": "Power Source", "options": ["Solar", "Battery", "Hardwired"] },
//         { "name": "Brightness", "options": ["Low", "Medium", "High"] }
//       ]
//     }
//   ]
// }
