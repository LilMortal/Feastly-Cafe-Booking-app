import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { Cafe } from '../../types';

interface CafeCardProps {
  cafe: Cafe;
}

const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  return (
    <Link to={`/cafes/${cafe.id}`} className="group">
      <Card hoverable className="h-full">
        <CardImage
          src={cafe.photos[0]}
          alt={cafe.name}
          aspectRatio="video"
        />
        <CardContent className="space-y-2">
          <CardTitle>{cafe.name}</CardTitle>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={14} className="mr-1" />
            <span>{cafe.location.city}</span>
            <span className="mx-2">•</span>
            <span>{cafe.priceRange}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center text-accent-500">
              <Star size={16} fill="currentColor" className="mr-1" />
              <span className="font-medium">{cafe.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {cafe.reviewCount} reviews
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Clock size={14} className="mr-1 flex-shrink-0" />
            <span>
              {cafe.hours.Monday.open} - {cafe.hours.Monday.close}
            </span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {cafe.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CafeCard;