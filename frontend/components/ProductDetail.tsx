import React, { useState, useMemo } from 'react';
import type { Product, ProductVariant } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [activeImageUrl, setActiveImageUrl] = useState(product.imageUrls[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { language, t } = useLocalization();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(product, selectedVariant, quantity);
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const displayPrice = useMemo(() => {
    return selectedVariant ? selectedVariant.price : product.price;
  }, [selectedVariant, product.price]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-amber-600 hover:text-amber-800 font-semibold flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('shop.backToProducts')}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg shadow-md mb-4">
            <img
              src={activeImageUrl}
              alt={`${product.name[language]} main view`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {product.imageUrls.map((url, index) => (
              <button
                key={url}
                onClick={() => setActiveImageUrl(url)}
                className={`w-20 h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ${activeImageUrl === url ? 'ring-2 ring-offset-2 ring-amber-500' : 'opacity-70 hover:opacity-100'}`}
                aria-label={`View image ${index + 1} of ${product.name[language]}`}
              >
                <img src={url} alt={`${product.name[language]} thumbnail ${index+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name[language]}</h1>
          <p className="text-slate-500 mb-4">{product.description[language]}</p>
          
          {/* Variant Selector */}
          {product.variantGroups && (
            <div className="my-4 space-y-4">
              <h2 className="text-lg font-semibold text-slate-700">{t('product.selectColor')}</h2>
              {product.variantGroups.map((group) => (
                <div key={group.label.en}>
                  <h3 className="text-sm font-medium text-slate-600 mb-2">{group.label[language]}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(variant => (
                       <button
                        key={variant.name}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-1 border rounded-full text-sm transition-colors ${selectedVariant?.name === variant.name ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}
                       >
                         {variant.name}
                       </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4">
             <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <span className="text-4xl font-bold text-amber-600">NT${displayPrice}</span>
              <div className="flex items-center gap-2">
                <label htmlFor="quantity-selector" className="font-semibold text-slate-700">{t('product.quantity')}</label>
                {/* Quantity Selector */}
                <div id="quantity-selector" className="flex items-center border border-slate-300 rounded-md">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="h-10 w-10 flex items-center justify-center text-slate-600 text-xl hover:bg-slate-100 focus:outline-none transition-colors rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                    >
                        &minus;
                    </button>
                    <span
                        className="h-10 w-12 flex items-center justify-center text-center font-medium bg-white border-l border-r border-slate-300"
                        aria-live="polite"
                    >
                        {quantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="h-10 w-10 flex items-center justify-center text-slate-600 text-xl hover:bg-slate-100 focus:outline-none transition-colors rounded-r-md"
                        aria-label="Increase quantity"
                    >
                        &#43;
                    </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!!product.variantGroups && !selectedVariant}
              className="w-full bg-amber-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {t('product.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;