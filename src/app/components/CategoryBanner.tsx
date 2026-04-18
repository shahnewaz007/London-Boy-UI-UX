import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { TEXT, BUTTON } from '../lib/design';

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
  href?: string;
}

export function CategoryBanner({ title, subtitle, image, reverse, href = '/products' }: CategoryBannerProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
      <div className="flex-1">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
      <div className="flex-1 text-center lg:text-left px-4 lg:px-12">
        <p style={TEXT.eyebrow} className="mb-4">London Boy</p>
        <h2 className="mb-5" style={TEXT.bannerTitle}>
          {title}
        </h2>
        <p className="mb-8" style={{ ...TEXT.body, fontSize: '0.95rem', fontWeight: 400, color: '#0a0a0a' }}>{subtitle}</p>
        <Link
          to={href}
          className="group inline-flex items-center gap-2 border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors tracking-[0.1em]"
          style={BUTTON.outline}
        >
          EXPLORE COLLECTION
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
