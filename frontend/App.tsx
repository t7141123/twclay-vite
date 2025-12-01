
import React, { useState } from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Shop from './components/Shop';
import About from './components/About';
import Footer from './components/Footer';
import Training from './components/Training';
import CartModal from './components/CartModal';
import FloatingCartButton from './components/FloatingCartButton';

type View = 'shop' | 'about' | 'training';

const App: React.FC = () => {
  const [view, setView] = useState<View>('about');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSetView = (newView: View) => {
    if (view === newView) return;
    setView(newView);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <CartProvider>
          <ToastProvider>
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
              <Header currentView={view} setView={handleSetView} />
              <main className="flex-grow">
                {view === 'shop' && (
                  <div className="container mx-auto px-4 py-8">
                    <Shop />
                  </div>
                )}
                {view === 'about' && <About />}
                {view === 'training' && <Training />}
              </main>
              <Footer />
              
              {/* Global UI Elements */}
              <FloatingCartButton onClick={() => setIsCartOpen(true)} />
              <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </ToastProvider>
        </CartProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
