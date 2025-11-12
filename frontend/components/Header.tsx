import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { useCart } from '../context/CartContext';
import type { Language } from '../types';
import CartModal from './CartModal';

interface HeaderProps {
  currentView: 'shop' | 'about' | 'training';
  setView: (view: 'shop' | 'about' | 'training') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const { language, setLanguage, t } = useLocalization();
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-amber-600 cursor-pointer" onClick={() => setView('about')}>
              {t('header.title')}
            </h1>
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setView('about')}
                className={`text-lg ${currentView === 'about' ? 'text-amber-600 font-semibold border-b-2 border-amber-600' : 'text-slate-600 hover:text-amber-600'}`}
              >
                {t('header.about')}
              </button>
              <button
                onClick={() => setView('shop')}
                className={`text-lg ${currentView === 'shop' ? 'text-amber-600 font-semibold border-b-2 border-amber-600' : 'text-slate-600 hover:text-amber-600'}`}
              >
                {t('header.shop')}
              </button>
              <button
                onClick={() => setView('training')}
                className={`text-lg ${currentView === 'training' ? 'text-amber-600 font-semibold border-b-2 border-amber-600' : 'text-slate-600 hover:text-amber-600'}`}
              >
                {t('header.training')}
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              {/* Facebook Link */}
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="text-blue-600 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                </svg>
              </a>
              {/* Shopee Link */}
              <a href="https://shopee.tw/kf40229" target="_blank" rel="noopener noreferrer" aria-label="Shopee Store" className="text-slate-600 hover:text-amber-600">
                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvklEQVR4AbxWA6wdQRStbdtud/ahtr2obdttWNu2bbuNGrVBbdt9qrm9p+6f/W/ncZOTTO5cnL2YmTjBfEazZolcqq2BR2NDAawhixONz63Knd0Ke+FSJONfQIa9CAdn038F+0zYThgIYA0Z9qATkeBeldX9GUB6SqjMkSMZ9qAD3bAGN5qVS+pWpFuEb16FlY1ND3vQoSzchk3YCHhUqduv9K4RKNNq6MImjLWXdv5sNrmhlS4mArqwCVN4OGUX4fRtY2dWK13oQBc2AQcheMyAusIp1iKALmz86Fw0I/AOhtEBe8vXWWHPo0UA42rWvXcCdqRIH8jZ1yAI3OBLoLALQg5U6TWRHe3RnfmN0aPjGaOrJsDapcp9SX5GxAf0zHrgpEjtPLrkRGCvylq6VXk+BZ5CDjsYzaqmMAwjLq13CxA4YdYDxwUMR0PXJAjK4SIfc0BSIAsHeAICzL0aK/NasxcLuRFVaYvZabfeytCn2iq8ayZnx80X2hSw5SY9IC2xNpTn/74bMAEhEJhlloEZloa46TTW/oe+bstDjTuViD8OnIA8zozAWHEnbDOmAXaYCFxS5lNkDsrgcI4AhEGk8gxeRJSNNCDiUaQRJPtk3YSsF98DGusdwtn+5td7ENM0ypqA3JYjgNqGOl4e1VYLr2Nav/enRxnT+RLorEnolwybDV+0vueXqM5q8O85Ta4jULtD/s4AtyZ3Mro7E6Ikfg80XS7NEcAh438E2akfek2cRWi9979zACnXpMloRJFS4jTle0C32azPAbbM18qZAfqoNf7E18heztXMmRoyItHa6u+Bd1qpnCbvfkcBwbv8I9V6G0YJTeduZK+CvybZDtFewdhyBN40K5UFm9EA3hAcAW58Iocnsb//NXlVpAl4FDY+VgJGO5Ycs0z1vUoNdzesUKVzhO+rQQ9+AMiIZbC8wmf/AAAAAElFTSuQmCC" alt="Shopee Store" className="h-6 w-6" />
              </a>
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center text-slate-600 hover:text-amber-600"
                  aria-label="Change language"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                    </svg>
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
                    <button onClick={() => handleSetLanguage('en')} className={`block px-4 py-2 text-sm w-full text-left ${language === 'en' ? 'bg-amber-100 text-amber-700' : 'text-slate-700 hover:bg-slate-100'}`}>{t('header.english')}</button>
                    <button onClick={() => handleSetLanguage('zhTW')} className={`block px-4 py-2 text-sm w-full text-left ${language === 'zhTW' ? 'bg-amber-100 text-amber-700' : 'text-slate-700 hover:bg-slate-100'}`}>{t('header.traditionalChinese')}</button>
                    <button onClick={() => handleSetLanguage('zhCN')} className={`block px-4 py-2 text-sm w-full text-left ${language === 'zhCN' ? 'bg-amber-100 text-amber-700' : 'text-slate-700 hover:bg-slate-100'}`}>{t('header.simplifiedChinese')}</button>
                  </div>
                )}
              </div>
              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-slate-600 hover:text-amber-600"
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;