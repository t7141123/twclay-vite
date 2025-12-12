
import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { useTheme } from '../context/ThemeContext';
import type { Language } from '../types';
import logo from '../assets/logo.png';

interface HeaderProps {
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const { language, setLanguage, t } = useLocalization();
  const { theme, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  // Safe navigation handler to prevent "refused to connect" errors in sandboxed environments
  const handleNavigation = (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = path;
    setIsMobileMenuOpen(false);
  };

  // Helper to check active state
  const isActive = (path: string) => currentPath === path || (path === '/about' && currentPath === '');

  // Click outside to close language menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangMenuOpen && !target.closest('.language-selector')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  const getLinkClass = (path: string) => 
    `text-lg ${isActive(path) ? 'text-amber-600 font-semibold border-b-2 border-amber-600' : 'text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'}`;

  const getMobileLinkClass = (path: string) =>
    `block w-full text-left px-4 py-3 rounded-md text-base font-medium ${isActive(path) ? 'bg-amber-50 dark:bg-slate-700 text-amber-600 dark:text-amber-500' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`;

  return (
    <>
      <header className="bg-[#FCF8F2] dark:bg-slate-800 shadow-sm sticky top-0 z-20 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a 
              href="#/about" 
              onClick={handleNavigation('/about')}
              className="cursor-pointer no-underline flex items-center"
            >
              <img src={logo} alt={t('header.title')} className="h-14 w-auto object-contain mix-blend-multiply dark:mix-blend-normal" />
            </a>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <a 
                href="#/about" 
                onClick={handleNavigation('/about')}
                className={getLinkClass('/about')}
              >
                {t('header.about')}
              </a>
              <a 
                href="#/shop" 
                onClick={handleNavigation('/shop')}
                className={getLinkClass('/shop')}
              >
                {t('header.shop')}
              </a>
              <a 
                href="#/training" 
                onClick={handleNavigation('/training')}
                className={getLinkClass('/training')}
              >
                {t('header.training')}
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 p-1"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {/* Facebook Link */}
              <a href="https://www.facebook.com/profile.php?id=100054451541780" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="hidden sm:block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                </svg>
              </a>
              {/* Shopee Link */}
              <a href="https://shopee.tw/kf40229" target="_blank" rel="noopener noreferrer" aria-label="Shopee Store" className="hidden sm:block text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvklEQVR4AbxWA6wdQRStbdtud/ahtr2obdttWNu2bbuNGrVBbdt9qrm9p+6f/W/ncZOTTO5cnL2YmTjBfEazZolcqq2BR2NDAawhixONz63Knd0Ke+FSJONfQIa9CAdn038F+0zYThgIYA0Z9qATkeBeldX9GUB6SqjMkSMZ9qAD3bAGN5qVS+pWpFuEb16FlY1ND3vQoSzchk3YCHhUqduv9K4RKNNq6MImjLWXdv5sNrmhlS4mArqwCVN4OGUX4fRtY2dWK13oQBc2AQcheMyAusIp1iKALmz86Fw0I/AOhtEBe8vXWWHPo0UA42rWvXcCdqRIH8jZ1yAI3OBLoLALQg5U6TWRHe3RnfmN0aPjGaOrJsDapcp9SX5GxAf0zHrgpEjtPLrkRGCvylq6VXk+BZ5CDjsYzaqmMAwjLq13CxA4YdYDxwUMR0PXJAjK4SIfc0BSIAsHeAICzL0aK/NasxcLuRFVaYvZabfeytCn2iq8ayZnx80X2hSw5SY9IC2xNpTn/74bMAEhEJhlloEZloa46TTW/oe+bstDjTuViD8OnIA8zozAWHEnbDOmAXaYCFxS5lNkDsrgcI4AhEGk8gxeRJSNNCDiUaQRJPtk3YSsF98DGusdwtn+5td7ENM0ypqA3JYjgNqGOl4e1VYLr2Nav/enRxnT+RLorEnolwybDV+0vueXqM5q8O85Ta4jULtD/s4AtyZ3Mro7E6Ikfg80XS7NEcAh438E2akfek2cRWi9979zACnXpMloRJFS4jTle0C32azPAbbM18qZAfqoNf7E18heztXMmRoyItHa6u+Bd1qpnCbvfkcBwbv8I9V6G0YJTeduZK+CvybZDtFewdhyBN40K5UFm9EA3hAcAW58Iocnsb//NXlVpAl4FDY+VgJGO5Ycs0z1vUoNdzesUKVzhO+rQQ9+AMiIZbC8wmf/AAAAAElFTSuQmCC" alt="Shopee Store" className="h-6 w-6" />
              </a>
              {/* Language Selector */}
              <div className="relative language-selector">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
                  aria-label="Change language"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                    </svg>
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-md shadow-lg py-1 z-30">
                    <button onClick={() => handleSetLanguage('en')} className={`block px-4 py-2 text-sm w-full text-left ${language === 'en' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'}`}>{t('header.english')}</button>
                    <button onClick={() => handleSetLanguage('zhTW')} className={`block px-4 py-2 text-sm w-full text-left ${language === 'zhTW' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'}`}>{t('header.traditionalChinese')}</button>
                    <button onClick={() => handleSetLanguage('zhCN')} className={`block px-4 py-2 text-sm w-full text-left ${language === 'zhCN' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'}`}>{t('header.simplifiedChinese')}</button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                   </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100 border-t border-slate-100 dark:border-slate-700' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col p-4 space-y-2">
             <a
                href="#/about"
                onClick={handleNavigation('/about')}
                className={getMobileLinkClass('/about')}
              >
                {t('header.about')}
              </a>
              <a
                href="#/shop"
                onClick={handleNavigation('/shop')}
                className={getMobileLinkClass('/shop')}
              >
                {t('header.shop')}
              </a>
              <a
                href="#/training"
                onClick={handleNavigation('/training')}
                className={getMobileLinkClass('/training')}
              >
                {t('header.training')}
              </a>
               {/* Mobile Social Links */}
               <div className="flex space-x-4 px-4 py-2 sm:hidden border-t border-slate-100 dark:border-slate-700 mt-2 pt-4">
                  <a href="https://www.facebook.com/profile.php?id=100054451541780" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                    </svg>
                  </a>
                  <a href="https://shopee.tw/kf40229" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300">
                     <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvklEQVR4AbxWA6wdQRStbdtud/ahtr2obdttWNu2bbuNGrVBbdt9qrm9p+6f/W/ncZOTTO5cnL2YmTjBfEazZolcqq2BR2NDAawhixONz63Knd0Ke+FSJONfQIa9CAdn038F+0zYThgIYA0Z9qATkeBeldX9GUB6SqjMkSMZ9qAD3bAGN5qVS+pWpFuEb16FlY1ND3vQoSzchk3YCHhUqduv9K4RKNNq6MImjLWXdv5sNrmhlS4mArqwCVN4OGUX4fRtY2dWK13oQBc2AQcheMyAusIp1iKALmz86Fw0I/AOhtEBe8vXWWHPo0UA42rWvXcCdqRIH8jZ1yAI3OBLoLALQg5U6TWRHe3RnfmN0aPjGaOrJsDapcp9SX5GxAf0zHrgpEjtPLrkRGCvylq6VXk+BZ5CDjsYzaqmMAwjLq13CxA4YdYDxwUMR0PXJAjK4SIfc0BSIAsHeAICzL0aK/NasxcLuRFVaYvZabfeytCn2iq8ayZnx80X2hSw5SY9IC2xNpTn/74bMAEhEJhlloEZloa46TTW/oe+bstDjTuViD8OnIA8zozAWHEnbDOmAXaYCFxS5lNkDsrgcI4AhEGk8gxeRJSNNCDiUaQRJPtk3YSsF98DGusdwtn+5td7ENM0ypqA3JYjgNqGOl4e1VYLr2Nav/enRxnT+RLorEnolwybDV+0vueXqM5q8O85Ta4jULtD/s4AtyZ3Mro7E6Ikfg80XS7NEcAh438E2akfek2cRWi9979zACnXpMloRJFS4jTle0C32azPAbbM18qZAfqoNf7E18heztXMmRoyItHa6u+Bd1qpnCbvfkcBwbv8I9V6G0YJTeduZK+CvybZDtFewdhyBN40K5UFm9EA3hAcAW58Iocnsb//NXlVpAl4FDY+VgJGO5Ycs0z1vUoNdzesUKVzhO+rQQ9+AMiIZbC8wmf/AAAAAElFTSuQmCC" alt="Shopee Store" className="h-6 w-6" />
                  </a>
               </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
