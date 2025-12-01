
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { useLocalization } from '../context/LocalizationContext';
import type { Product, LocalizedString } from '../types';

interface ProductListProps {
  category: LocalizedString | null;
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ category, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState(3);
  const { language, t } = useLocalization();

  useEffect(() => {
    const getColumns = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        return 3;
      }
      if (window.matchMedia('(min-width: 640px)').matches) {
        return 2;
      }
      return 1;
    };

    const handleResize = () => {
      setColumns(getColumns());
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = !category || product.category[language] === category[language];
    const matchesSearch = product.name[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const searchBar = (
     <div>
        <input
          type="text"
          placeholder={t('product.searchPlaceholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-lg mx-auto block px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          aria-label="Search products"
        />
      </div>
  );

  return (
    <div className="space-y-8">
      {searchBar}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            const rowIndex = Math.floor(index / columns);
            const delay = rowIndex * 100; // Reduced delay for snappier feel
            return (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${delay}ms` }}
              >
                <ProductCard product={product} onSelect={onProductSelect} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">{t('product.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
