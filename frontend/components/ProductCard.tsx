import React, { useMemo } from 'react';
import type { Product, ProductVariant } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { language, t } = useLocalization();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.variantGroups) {
      // For products with variants, go to the detail page to select options
      onSelect(product);
    } else {
      // For simple products, add directly to cart with quantity 1
      const defaultVariant: ProductVariant = {
        name: '', // Simple products don't have a variant name
        price: product.price,
      };
      addToCart(product, defaultVariant, 1);
    }
  };

  const priceDisplay = useMemo(() => {
    if (!product.variantGroups || product.variantGroups.length === 0) {
      return `NT$${product.price}`;
    }

    const minPrice = product.price; // Base price is the min price
    const maxPrice = product.variantGroups.reduce((max, group) => {
      const groupMax = group.items.reduce((itemMax, item) => Math.max(itemMax, item.price), 0);
      return Math.max(max, groupMax);
    }, 0);

    if (maxPrice <= minPrice) {
      return `NT$${minPrice}`;
    }

    return `NT$${minPrice} - ${maxPrice}`;
  }, [product]);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(product)}
      aria-label={`View details for ${product.name[language]}`}
    >
      <div className="overflow-hidden">
        <img src={product.imageUrls[0]} alt={product.name[language]} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-slate-800">{product.name[language]}</h3>
        <p className="text-sm text-slate-500 mt-1 flex-grow line-clamp-2">{product.description[language]}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-amber-600">
            {priceDisplay}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 z-10"
            aria-label={`Add ${product.name[language]} to cart`}
          >
            {product.variantGroups ? t('product.selectColor') : t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;