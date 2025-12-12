
import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import PageBanner from './PageBanner';
import aboutBanner from '../assets/about_banner.png';
import iconSafety from '../assets/icon_safety.png';
import iconMalleable from '../assets/icon_malleable.png';
import iconHeat from '../assets/icon_heat.png';
import storyMaterial from '../assets/story_material.png';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-700 text-center flex flex-col items-center h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] hover:border-amber-100 dark:hover:border-amber-900/30">
    <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{children}</p>
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
        <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-4">{title}</h3>
        <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};


const SafetyIcon = () => (
  <img src={iconSafety} alt="Safety Icon" className="h-16 w-16 object-contain" />
);

const MalleableIcon = () => (
  <img src={iconMalleable} alt="Malleable Icon" className="h-16 w-16 object-contain" />
);

const HeatIcon = () => (
  <img src={iconHeat} alt="Heat Icon" className="h-16 w-16 object-contain" />
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
      imageSrc: storyMaterial,
      position: 'right'
    },
    {
      title: t('about.story.card3Title'),
      content: (
        <>
          <p>{t('about.story.card3ContentP1')}</p>
          <p>{t('about.story.card3ContentP2')}</p>
          <p className="font-semibold text-amber-700 dark:text-amber-500 mt-4">{t('about.story.card3ContentP3')}</p>
        </>
      ),
      imageSrc: "https://loremflickr.com/600/600/craft,art?lock=3",
      position: 'left'
    }
  ];


  return (
    <>
      {/* Banner Section */}
      <PageBanner 
        title={t('header.about')} 
        subtitle={t('about.title')} 
        imageSrc={aboutBanner}
      />

      {/* Top Section with Features */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <FeatureCard icon={<SafetyIcon />} title={t('about.feature1Title')}>
                  {t('about.feature1Text')}
                </FeatureCard>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <FeatureCard icon={<MalleableIcon />} title={t('about.feature2Title')}>
                  {t('about.feature2Text')}
                </FeatureCard>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <FeatureCard icon={<HeatIcon />} title={t('about.feature3Title')}>
                  {t('about.feature3Text')}
                </FeatureCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section - Full Width Background */}
      <div className="bg-amber-50 dark:bg-slate-900 py-12 md:py-20 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">{t('about.story.title')}</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">{t('about.story.subtitle')}</p>
            </div>

            <div className="space-y-16">
              {storyCards.map((card, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${400 + (index * 150)}ms` }}>
                  <StoryCard
                    title={card.title}
                    content={card.content}
                    imageSrc={card.imageSrc}
                    imagePosition={card.position as 'left' | 'right'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
