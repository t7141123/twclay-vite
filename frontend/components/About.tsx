import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center h-full">
    <div className="bg-amber-100 text-amber-600 rounded-full p-4 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{children}</p>
  </div>
);

const StoryCard: React.FC<{
  imageSrc: string;
  title: string;
  content: React.ReactNode;
  imagePosition: 'left' | 'right';
}> = ({ imageSrc, title, content, imagePosition }) => {
  const isImageLeft = imagePosition === 'left';
  return (
    <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 items-center ${!isImageLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Image Section */}
      <div className="md:w-2/5 w-full">
        <img 
          src={imageSrc} 
          alt={title} 
          className="rounded-lg shadow-xl object-cover w-full aspect-square" 
        />
      </div>
      {/* Content Section */}
      <div className="md:w-3/5">
        <h3 className="text-2xl font-bold text-amber-600 mb-4">{title}</h3>
        <div className="text-slate-600 space-y-4 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

const SafetyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606 12.02 12.02 0 00-2.618-9.028z" />
  </svg>
);

const MalleableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const HeatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0121.5 1.5c.001 3.183-1.354 6.364-4.014 8.014-2 .5-5 0-7.014 2.986z" />
  </svg>
);

const About: React.FC = () => {
  const { t } = useLocalization();
  
  const storyCards = [
    {
      title: t('about.story.card1Title'),
      content: (
        <>
          <p>{t('about.story.card1ContentP1')}</p>
          <p>{t('about.story.card1ContentP2')}</p>
          <p>{t('about.story.card1ContentP3')}</p>
        </>
      ),
      imageSrc: "https://loremflickr.com/600/600/pottery,hands?lock=1",
      position: 'left'
    },
    {
      title: t('about.story.card2Title'),
      content: (
        <ul className="space-y-3 list-disc list-inside">
          <li>{t('about.story.card2Item1')}</li>
          <li>{t('about.story.card2Item2')}</li>
          <li>{t('about.story.card2Item3')}</li>
          <li>{t('about.story.card2Item4')}</li>
          <li>{t('about.story.card2Item5')}</li>
        </ul>
      ),
      imageSrc: "https://images.unsplash.com/photo-1557954242-2376a63e3b57?q=80&w=1887&auto=format&fit=crop",
      position: 'right'
    },
    {
      title: t('about.story.card3Title'),
      content: (
        <>
          <p>{t('about.story.card3ContentP1')}</p>
          <p>{t('about.story.card3ContentP2')}</p>
          <p className="font-semibold text-amber-700 mt-4">{t('about.story.card3ContentP3')}</p>
        </>
      ),
      imageSrc: "https://loremflickr.com/600/600/craft,art?lock=3",
      position: 'left'
    }
  ];


  return (
    <>
      {/* Top Section with Features */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">{t('header.about')}</h1>
              <p className="text-xl text-amber-600 font-semibold">{t('about.title')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard icon={<SafetyIcon />} title={t('about.feature1Title')}>
                {t('about.feature1Text')}
              </FeatureCard>

              <FeatureCard icon={<MalleableIcon />} title={t('about.feature2Title')}>
                {t('about.feature2Text')}
              </FeatureCard>

              <FeatureCard icon={<HeatIcon />} title={t('about.feature3Title')}>
                {t('about.feature3Text')}
              </FeatureCard>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section - Full Width Background */}
      <div className="bg-amber-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">{t('about.story.title')}</h2>
              <p className="text-lg text-slate-500">{t('about.story.subtitle')}</p>
            </div>

            <div className="space-y-16">
              {storyCards.map((card, index) => (
                <StoryCard
                  key={index}
                  title={card.title}
                  content={card.content}
                  imageSrc={card.imageSrc}
                  imagePosition={card.position as 'left' | 'right'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;