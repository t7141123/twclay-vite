
export type Language = 'en' | 'zhTW' | 'zhCN';

export type LocalizedString = {
  [key in Language]: string;
};

export interface ProductVariant {
  name: string; // e.g., "M1"
  price: number;
}

export interface ProductVariantGroup {
  label: LocalizedString;
  items: ProductVariant[];
}

export interface Product {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  price: number; // Base price for display on product cards
  imageUrls: string[];
  category: LocalizedString;
  variantGroups?: ProductVariantGroup[];
}

export interface CartItem {
  cartId: string; // Composite ID: `${productId}-${variantName}`
  productId: number;
  productName: LocalizedString;
  variantName: string;
  price: number; // This is the variant's price
  quantity: number;
  imageUrl: string;
}
