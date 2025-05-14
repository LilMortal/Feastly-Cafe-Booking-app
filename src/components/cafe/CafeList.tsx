import React from 'react';
import CafeCard from './CafeCard';
import { Cafe } from '../../types';

interface CafeListProps {
  cafes: Cafe[];
  isLoading?: boolean;
}

const CafeList: React.FC<CafeListProps> = ({ cafes, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse"
          >
            <div className="bg-gray-200 dark:bg-gray-700 aspect-video"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cafes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No cafés found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cafes.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
};

export default CafeList;