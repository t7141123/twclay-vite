
import React from 'react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="relative h-64 md:h-80 w-full overflow-hidden mb-8">
      {/* Background Image with Parallax-like feel or simple cover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-slate-100 max-w-2xl font-medium drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
