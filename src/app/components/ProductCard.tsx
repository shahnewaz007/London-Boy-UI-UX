import { Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

interface ProductCardProps {
  id?: number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  colors?: string[];
  onAddToCart?: () => void;
}

export function ProductCard({ id, image, name, price, originalPrice, badge, colors, onAddToCart }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((v) => !v);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] bg-gray-50 mb-3 overflow-hidden">
        {/* Invisible overlay link for navigation — sits below the action buttons */}
        {id && (
          <Link
            to={`/products/${id}`}
            className="absolute inset-0 z-[1]"
            aria-label={`View ${name}`}
          />
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {badge && (
          <div
            className="absolute top-3 left-3 text-white text-xs px-2 py-1 tracking-wider z-[2]"
            style={{ backgroundColor: '#0a0a0a', fontSize: '0.6rem' }}
          >
            {badge}
          </div>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-[2]"
        >
          <Heart
            className="w-3.5 h-3.5"
            style={{ fill: wishlisted ? '#000' : 'none', color: '#000' }}
          />
        </button>
        <button
          onClick={handleAdd}
          className="absolute bottom-0 left-0 right-0 py-3 text-white text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 z-[2]"
          style={{ backgroundColor: added ? '#333' : '#000' }}
        >
          {added ? '✓ ADDED TO BAG' : (
            <>QUICK ADD <ArrowRight className="w-3 h-3" /></>
          )}
        </button>
      </div>
      <div>
        {id ? (
          <Link to={`/products/${id}`} className="hover:underline block">
            <h3 className="text-sm mb-1" style={{ fontWeight: 400 }}>{name}</h3>
          </Link>
        ) : (
          <h3 className="text-sm mb-1 group-hover:underline" style={{ fontWeight: 400 }}>{name}</h3>
        )}
        <div className="flex items-center space-x-2">
          <span className="text-sm">£{price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">£{originalPrice}</span>
          )}
        </div>
        {colors && colors.length > 0 && (
          <div className="flex space-x-1 mt-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
