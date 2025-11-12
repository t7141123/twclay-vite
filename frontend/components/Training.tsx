import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const Training: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{t('header.training')}</h1>
          <p className="text-xl text-amber-600">
            {t('training.title1')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Details Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('training.title1')}</h2>
            <div className="space-y-4 text-slate-700">
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
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('training.title2')}</h2>
            <ul className="space-y-3 text-slate-700 list-inside">
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
  );
};

export default Training;