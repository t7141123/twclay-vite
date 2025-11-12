
import React from 'react';
import type { LocalizedString } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface CategorySidebarProps {
    categories: LocalizedString[];
    selectedCategory: LocalizedString | null;
    onSelectCategory: (category: LocalizedString | null) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    const { language, t } = useLocalization();

    const getButtonClasses = (isActive: boolean) => 
        `w-full text-left p-2 rounded-md transition-colors text-slate-600 hover:bg-amber-100 hover:text-amber-700 ${isActive ? 'font-semibold bg-amber-100 text-amber-700' : ''}`;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-slate-800">{t('shop.categoryTitle')}</h3>
            <ul className="space-y-1">
                <li key="all">
                    <button onClick={() => onSelectCategory(null)} className={getButtonClasses(!selectedCategory)}>
                        {t('shop.allProducts')}
                    </button>
                </li>
                {categories.map(cat => (
                    <li key={cat.en}>
                         <button onClick={() => onSelectCategory(cat)} className={getButtonClasses(selectedCategory?.en === cat.en)}>
                            {cat[language]}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategorySidebar;
