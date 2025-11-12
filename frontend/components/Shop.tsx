
import React, { useState } from 'react';
import type { Product, LocalizedString } from '../types';
import ProductDetail from './ProductDetail';
import CategorySidebar from './CategorySidebar';
import ProductList from './ProductList';
import { CATEGORIES } from '../constants';

const Shop: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<LocalizedString | null>(null);

    if (selectedProduct) {
        return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    }

    return (
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
    );
};

export default Shop;
