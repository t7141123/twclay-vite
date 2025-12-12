import React, { useState, useEffect } from 'react';
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
import PageLoader from './components/PageLoader';

const App: React.FC = () => {
  // Initialize state based on current URL hash, default to '/about' if empty
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || '/about';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsLoading(true);
      const hash = window.location.hash.slice(1);
      const newPath = hash || '/about';
      
      // Short delay for transition effect
      setTimeout(() => {
        setCurrentPath(newPath);
        window.scrollTo(0, 0);
        setIsLoading(false);
      }, 500);
    };

    // If loaded without hash, set default to #/about
    if (!window.location.hash) {
      window.location.hash = '/about';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    // Simple route matching
    if (currentPath.startsWith('/shop')) {
      // Removed container padding wrapper here to let Shop handle its own layout (for full-width banner)
      return <Shop />;
    }
    if (currentPath.startsWith('/training')) {
      return <Training />;
    }
    // Default to About for '/about' or any unknown route
    return <About />;
  };

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <CartProvider>
          <ToastProvider>
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
              <Header currentPath={currentPath} />
              <main className="flex-grow">{renderContent()}</main>
              <Footer />

              {/* Global UI Elements */}
              <FloatingCartButton onClick={() => setIsCartOpen(true)} />
              <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
              <PageLoader isLoading={isLoading} />
            </div>
          </ToastProvider>
        </CartProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
