import type { Product, LocalizedString, ProductVariant } from './types';

// The unified image for individual clay blocks
const PRODUCT_IMAGE_URL = "https://clay.com.tw/img/all_color.7890c0fd.jpg";

// Define categories
const POLYMER_CLAY: LocalizedString = {
  en: "Polymer Clay", zhTW: "軟陶土", zhCN: "软陶土"
};
const FIVE_COLOR_SET: LocalizedString = {
  en: "5 Color Set", zhTW: "五色軟陶", zhCN: "五色软陶"
};
const TEN_COLOR_SET: LocalizedString = {
  en: "10 Color Set", zhTW: "十色軟陶", zhCN: "十色软陶"
};
const LIQUID_CLAY: LocalizedString = {
  en: "Liquid Clay", zhTW: "液體軟陶", zhCN: "液体软陶"
};
const VARNISH: LocalizedString = {
  en: "Varnish", zhTW: "亮光漆", zhCN: "亮光漆"
};

export const CATEGORIES: LocalizedString[] = [
  POLYMER_CLAY,
  FIVE_COLOR_SET,
  TEN_COLOR_SET,
  LIQUID_CLAY,
  VARNISH
];

// Define color codes for variants
const GENERAL_COLOR_CODES = [
  'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7',
  'R1', 'R2', 'R3', 'R4',
  'B1', 'B2', 'B3', 'B4',
  'O1', 'O2', 'O3', 'O4',
  'Ga1', 'Ga2', 'Ga3', 'Ga4',
  'G1', 'G2', 'G3', 'G4',
  'P1', 'P2', 'P3', 'P4'
];
const SPECIAL_COLOR_CODES = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
const M8_CODE = ['M8'];

// Helper to generate variants
const createVariants = (
  generalPrice: number,
  specialPrice: number,
  m8Price: number
): { label: LocalizedString, items: ProductVariant[] }[] => [
  {
    label: { en: "General Colors", zhTW: "一般色", zhCN: "一般色" },
    items: GENERAL_COLOR_CODES.map(name => ({ name, price: generalPrice }))
  },
  {
    label: { en: "Special Colors", zhTW: "特殊色", zhCN: "特殊色" },
    items: SPECIAL_COLOR_CODES.map(name => ({ name, price: specialPrice }))
  },
  {
    label: { en: "Extra Special Colors", zhTW: "特級特殊色", zhCN: "特级特殊色" },
    items: M8_CODE.map(name => ({ name, price: m8Price }))
  },
];


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: {
      en: "Polymer Clay 50g",
      zhTW: "軟陶土 50g",
      zhCN: "软陶土 50g",
    },
    description: {
      en: "A single 50g block of high-quality polymer clay. Choose your favorite color from our wide selection. Perfect for small projects and detailed work.",
      zhTW: "單塊50克高品質軟陶土。從我們豐富的顏色中選擇您最喜歡的顏色。非常適合小型項目和精細工作。",
      zhCN: "单块50克高品质软陶土。从我们丰富的颜色中选择您最喜欢的颜色。非常适合小型项目和精细工作。",
    },
    price: 85,
    imageUrls: [PRODUCT_IMAGE_URL],
    category: POLYMER_CLAY,
    variantGroups: createVariants(85, 95, 100),
  },
  {
    id: 2,
    name: {
      en: "Polymer Clay 100g",
      zhTW: "軟陶土 100g",
      zhCN: "软陶土 100g",
    },
    description: {
        en: "A single 100g block of high-quality polymer clay. Choose your favorite color. Larger size for bigger creations.",
        zhTW: "單塊100克高品質軟陶土。選擇您最喜歡的顏色。尺寸較大，適合較大的創作。",
        zhCN: "单块100克高品质软陶土。选择您最喜欢的颜色。尺寸较大，适合较大的创作。",
    },
    price: 155,
    imageUrls: [PRODUCT_IMAGE_URL],
    category: POLYMER_CLAY,
    variantGroups: createVariants(155, 165, 180),
  },
  {
    id: 3,
    name: {
      en: "Polymer Clay 200g",
      zhTW: "軟陶土 200g",
      zhCN: "软陶土 200g",
    },
    description: {
        en: "A single 200g block of high-quality polymer clay. Choose your favorite color. Bulk size for the serious artist.",
        zhTW: "單塊200克高品質軟陶土。選擇您最喜歡的顏色。大包裝，專業藝術家首選。",
        zhCN: "单块200克高品质软陶土。选择您最喜欢的颜色。大包装，专业艺术家首选。",
    },
    price: 290,
    imageUrls: [PRODUCT_IMAGE_URL],
    category: POLYMER_CLAY,
    variantGroups: createVariants(290, 310, 340),
  },
  {
    id: 4,
    name: {
      en: "Liquid Polymer Clay (50ml)",
      zhTW: "液體軟陶 50ml/瓶",
      zhCN: "液体软陶 50ml/瓶",
    },
    description: {
      en: "50ml bottle of translucent liquid polymer clay, bakeable and perfect for glazing, transfers, and finishing touches.",
      zhTW: "50ml瓶裝半透明液體軟陶，可烘烤，非常適合用於上光、轉印和細節修飾。",
      zhCN: "50ml瓶装半透明液体软陶，可烘烤，非常适合用于上光、转印和细节修饰。",
    },
    price: 150,
    imageUrls: ["https://down-tw.img.susercontent.com/file/30bfa65cd154be321d4185ff2b054261@resize_w900_nl.webp"],
    category: LIQUID_CLAY,
  },
  {
    id: 5,
    name: {
        en: "Gloss Varnish (15ml)",
        zhTW: "亮光漆 15ml/瓶",
        zhCN: "亮光漆 15ml/瓶",
    },
    description: {
        en: "15ml bottle of durable, super glossy varnish to seal and protect your polymer clay creations.",
        zhTW: "15ml瓶裝耐用的高光澤清漆，可密封和保護您的軟陶作品。",
        zhCN: "15ml瓶装耐用的高光泽清漆，可密封和保护您的软陶作品。",
    },
    price: 110,
    imageUrls: ['https://down-tw.img.susercontent.com/file/56730736f65efbd50332143b47394b07@resize_w900_nl.webp'],
    category: VARNISH,
  },
  {
    id: 6,
    name: {
      en: "5 Colors Polymer Clay Set",
      zhTW: "五色軟陶",
      zhCN: "五色软陶",
    },
    description: {
      en: "A small pack of 5 primary colors, ideal for small projects or mixing.",
      zhTW: "包含5種基本顏色的軟陶入門套裝。",
      zhCN: "一小包5种原色，非常适合小型项目或混色使用。",
    },
    price: 170,
    imageUrls: ["https://down-tw.img.susercontent.com/file/77a2ae63482e0f79331dfbc22e4a9f42.webp"],
    category: FIVE_COLOR_SET,
  },
  {
    id: 7,
    name: {
      en: "10 Colors Polymer Clay Set",
      zhTW: "十色軟陶",
      zhCN: "十色软陶",
    },
    description: {
      en: "A basic starter set with 10 essential colors of polymer clay.",
      zhTW: "包含10種基本顏色的軟陶入門套裝。",
      zhCN: "包含10种基本颜色的软陶入门套装。",
    },
    price: 330,
    imageUrls: ["https://down-tw.img.susercontent.com/file/tw-11134207-7r98q-lvby5bfu6g1lf2@resize_w900_nl.webp"],
    category: TEN_COLOR_SET,
  }
];