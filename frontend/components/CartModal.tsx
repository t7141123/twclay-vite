
import React from 'react';
import { useCart } from '../context/CartContext';
import { useLocalization } from '../context/LocalizationContext';
import { submitPaymentForm } from '../utils/ecpay';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();
  const { t, language } = useLocalization();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    // Trigger ECPay form submission
    // Note: In a real app with backend, you might want to create order in DB first.
    submitPaymentForm(cartItems, cartTotal, language);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col transition-colors duration-300" onClick={e => e.stopPropagation()}>
        <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{t('cart.title')} ({itemCount})</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-4 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">{t('cart.empty')}</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.cartId} className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.productName[language]} className="w-20 h-20 object-cover rounded-md bg-white" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">{item.productName[language]}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.variantName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">NT${item.price}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
                    {/* Quantity Adjuster */}
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700">
                        <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="h-8 w-8 flex items-center justify-center text-slate-600 dark:text-slate-300 text-lg hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none transition-colors rounded-l-md"
                            aria-label={`Decrease quantity for ${item.productName[language]} (${item.variantName})`}
                        >
                            &minus;
                        </button>
                        <span
                            className="h-8 w-10 flex items-center justify-center text-center font-medium bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-l border-r border-slate-300 dark:border-slate-600"
                            aria-live="polite"
                        >
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center text-slate-600 dark:text-slate-300 text-lg hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none transition-colors rounded-r-md"
                            aria-label={`Increase quantity for ${item.productName[language]} (${item.variantName})`}
                        >
                            &#43;
                        </button>
                    </div>
                    {/* Remove Button */}
                    <button onClick={() => removeFromCart(item.cartId)} className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" aria-label={`Remove ${item.productName[language]} (${item.variantName})`}>
                        {t('cart.remove')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {cartItems.length > 0 && (
          <footer className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 rounded-b-lg">
            <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {t('cart.total')}: <span className="text-amber-600 dark:text-amber-500">NT${cartTotal.toFixed(0)}</span>
            </div>
            <div className="flex space-x-2">
                <button onClick={clearCart} className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                    {t('cart.clear')}
                </button>
                <button 
                  onClick={handleCheckout}
                  className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-md hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors"
                >
                    {t('cart.checkout')}
                </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CartModal;
