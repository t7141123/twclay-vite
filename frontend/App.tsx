import React, { useState } from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Shop from './components/Shop';
import About from './components/About';
import Footer from './components/Footer';
import Training from './components/Training';
import PageLoader from './components/PageLoader';

type View = 'shop' | 'about' | 'training';

const App: React.FC = () => {
  const [view, setView] = useState<View>('about');
  const [isLoading, setIsLoading] = useState(false);

  const handleSetView = (newView: View) => {
    if (view === newView) return;

    setIsLoading(true);

    setTimeout(() => {
      setView(newView);
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 500);
  };

  return (
    <LocalizationProvider>
      <CartProvider>
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800">
          <PageLoader isLoading={isLoading} />
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
        </div>
      </CartProvider>
    </LocalizationProvider>
  );
};

export default App;