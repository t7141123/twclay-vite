
import React from 'react';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 bg-white dark:bg-slate-900 bg-opacity-75 dark:bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-live="assertive"
      role="status"
    >
      {isLoading && (
         <div className="w-16 h-16 border-4 border-amber-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default PageLoader;
