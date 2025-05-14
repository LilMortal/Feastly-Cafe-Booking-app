import React, { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';
import CafeFilter from '../components/cafe/CafeFilter';
import CafeList from '../components/cafe/CafeList';
import { searchCafes, getCities } from '../data/mockData';
import { Cafe } from '../types';

const HomePage: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cities = getCities();

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const initialCafes = searchCafes();
      setCafes(initialCafes);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleFilter = (filters: {
    searchTerm: string;
    category: string;
    city: string;
    priceRange: string;
  }) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const filteredCafes = searchCafes(
        filters.searchTerm,
        filters.category,
        filters.city,
        filters.priceRange
      );
      setCafes(filteredCafes);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-gradient-to-r from-primary-900 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src="https://images.pexels.com/photos/333523/pexels-photo-333523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Café Ambiance"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <div className="flex items-center mb-4">
            <Coffee size={40} className="mr-3" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">Feastly</h1>
          </div>
          <p className="text-xl md:text-2xl font-light text-center max-w-2xl mb-8">
            Discover and book the perfect café experience
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {cities.slice(0, 4).map((city) => (
              <button
                key={city}
                onClick={() => handleFilter({ searchTerm: '', category: '', city, priceRange: '' })}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        <CafeFilter onFilter={handleFilter} />
        
        <div className="mt-6 mb-4">
          <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
            {isLoading ? 'Finding cafes...' : `${cafes.length} cafés found`}
          </h2>
        </div>
        
        <CafeList cafes={cafes} isLoading={isLoading} />
      </section>
      
      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Why Book with Feastly?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Coffee size={32} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-900 dark:text-white">
                Curated Cafés
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We handpick the best cafés to ensure quality experiences for all our users.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-600 dark:text-primary-400"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-900 dark:text-white">
                Easy Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reserve your spot in just a few clicks and manage your bookings with ease.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-600 dark:text-primary-400"
                >
                  <path d="M17 6.1H3" />
                  <path d="M21 12.1H3" />
                  <path d="M15.1 18H3" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-900 dark:text-white">
                Personalized Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover cafés that match your preferences and dietary requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;