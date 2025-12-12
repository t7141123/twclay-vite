
import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import PageBanner from './PageBanner';

const Training: React.FC = () => {
  const { t } = useLocalization();

  return (
    <>
      <PageBanner 
        title={t('header.training')} 
        subtitle={t('training.title1')} 
        imageSrc="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1920&q=80"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Details Section */}
            <div className="animate-fade-in-up bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-amber-400 transition-colors duration-300" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('training.title1')}</h2>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p>
                  <strong>{t('training.courseType')}</strong><br />
                  {t('training.courseTypeA')}<br />
                  {t('training.courseTypeB')}
                </p>
                <p>
                  <strong>{t('training.duration')}</strong>
                </p>
                <p>
                  <strong>{t('training.location')}</strong>
                </p>
                <p>
                  <strong>{t('training.fee')}</strong>
                </p>
                <p>
                  <strong>{t('training.classSize')}</strong>
                </p>
                <p>
                  <strong>{t('training.targetAudience')}</strong><br />
                  {t('training.targetAudienceA')}<br />
                  {t('training.targetAudienceB')}
                </p>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="animate-fade-in-up bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-amber-400 transition-colors duration-300" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('training.title2')}</h2>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300 list-inside">
                <li>{t('training.content1')}</li>
                <li>{t('training.content2')}</li>
                <li>{t('training.content3')}</li>
                <li>{t('training.content4')}</li>
                <li>{t('training.content5')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Training;
