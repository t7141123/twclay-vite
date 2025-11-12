// FIX: This file was empty. It has been populated with the necessary content to resolve module import errors.
import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const Footer: React.FC = () => {
  const { t } = useLocalization();

  return (
    <footer className="mt-auto text-white">
      {/* Contact Section */}
      <div className="bg-slate-700">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          {/* LINE Info - Takes up 1 column */}
          <div className="flex flex-col items-center">
            <a href="https://lin.ee/alA0MFK" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <img 
                src="https://clay.com.tw/img/line.ea790370.png" 
                alt={t('footer.contactUs.line')}
                className="h-24 w-auto group-hover:scale-110 transition-transform duration-300"
              />
              <p className="text-lg font-semibold">{t('footer.contactUs.line')}</p>
            </a>
          </div>
          
          {/* Company Info & CTA - Takes up 2 columns */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-amber-400 mb-3">{t('footer.contactUs.ctaTitle')}</h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto md:mx-0">{t('footer.contactUs.ctaText')}</p>
            <div>
              <h4 className="text-xl font-semibold mb-2">{t('footer.contactUs.companyName')}</h4>
              <p className="text-lg text-slate-300">{t('footer.contactUs.phone')}: (+886) 912-259-153</p>
              <p className="text-lg text-slate-300">{t('footer.contactUs.taxId')}: 97456764</p>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="bg-slate-900">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm text-slate-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;