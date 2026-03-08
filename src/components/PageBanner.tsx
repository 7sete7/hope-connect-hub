import { ScrollFadeIn } from '@/components/ScrollFadeIn';

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
}

export function PageBanner({ title, backgroundImage }: PageBannerProps) {
  return (
    <div className="relative pt-32 pb-24 bg-gradient-to-br from-[hsl(270,60%,25%)] via-[hsl(270,55%,30%)] to-[hsl(330,60%,30%)] overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollFadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <div className="w-20 h-1 rounded-full bg-secondary mx-auto" />
        </ScrollFadeIn>
      </div>
    </div>
  );
}
