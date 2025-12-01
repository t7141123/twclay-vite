
import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse transition-colors duration-300">
      <div className="bg-slate-200 dark:bg-slate-700 h-56 w-full"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        <div className="mt-4 flex justify-between items-center">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
