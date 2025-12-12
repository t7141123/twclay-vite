
import React, { useState } from 'react';
import type { Product, LocalizedString } from '../types';
import ProductDetail from './ProductDetail';
import CategorySidebar from './CategorySidebar';
import ProductList from './ProductList';
import PageBanner from './PageBanner';
import { CATEGORIES } from '../constants';
import { useLocalization } from '../context/LocalizationContext';
import shopBanner from '../assets/shop_banner.png';

const Shop: React.FC = () => {
    const { t } = useLocalization();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<LocalizedString | null>(null);

    if (selectedProduct) {
        return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    }

    return (
        <div className="space-y-8">
            <PageBanner 
                title={t('header.shop')} 
                subtitle={t('shop.subtitle')} 
                imageSrc={shopBanner}
            />

            <div className="container mx-auto px-4 pb-12">
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
        </div>
    );
};

export default Shop;
