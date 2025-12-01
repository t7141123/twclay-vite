
import React from 'react';
import { useCart } from '../context/CartContext';

interface FloatingCartButtonProps {
  onClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ onClick }) => {
  const { itemCount } = useCart();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-amber-600 text-white p-4 rounded-full shadow-lg hover:bg-amber-700 hover:scale-110 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900"
      aria-label="Open Cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-slate-800 animate-bounce">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton;
