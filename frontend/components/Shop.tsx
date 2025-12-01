
import React, { useState } from 'react';
import type { Product, LocalizedString } from '../types';
import ProductDetail from './ProductDetail';
import CategorySidebar from './CategorySidebar';
import ProductList from './ProductList';
import { CATEGORIES } from '../constants';
import { useLocalization } from '../context/LocalizationContext';

const Shop: React.FC = () => {
    const { t } = useLocalization();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<LocalizedString | null>(null);

    if (selectedProduct) {
        return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    }

    return (
        <div className="space-y-8">
             <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('header.shop')}</h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    {t('shop.subtitle')}
                </p>
             </div>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/4 lg:w-1/5">
                    <CategorySidebar
                        categories={CATEGORIES}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </aside>
                <div className="flex-1">
                    <ProductList
                        category={selectedCategory}
                        onProductSelect={setSelectedProduct}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shop;