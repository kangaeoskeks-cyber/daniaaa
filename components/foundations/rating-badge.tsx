import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  title: string;
  subtitle?: string;
  className?: string;
}

export function RatingBadge({ rating, title, subtitle, className = '' }: RatingBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 ${className}`}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white leading-tight">{title}</span>
        {subtitle && <span className="text-xs text-gray-400 leading-tight">{subtitle}</span>}
      </div>
    </div>
  );
}
