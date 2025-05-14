import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Phone, Globe, ChevronLeft, Users, DollarSign } from 'lucide-react';
import Button from '../components/ui/Button';
import { getCafeById } from '../data/mockData';
import { Cafe } from '../types';
import { format } from 'date-fns';

const CafeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeMenuTab, setActiveMenuTab] = useState(0);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const cafeData = getCafeById(id);
        if (cafeData) {
          setCafe(cafeData);
        }
        setIsLoading(false);
      }, 800);
    }
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  const getDayOfWeek = () => {
    return format(new Date(), 'EEEE');
  };

  const currentDay = getDayOfWeek();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!cafe) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-[70vh]">
        <h2 className="text-2xl font-semibold mb-4">Café Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The café you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to search
        </button>
      </div>
      
      {/* Cafe Photo Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative">
          {/* Main Image */}
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <img
              src={cafe.photos[activeImage]}
              alt={cafe.name}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>
          
          {/* Thumbnail Row */}
          <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
            {cafe.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 h-20 w-28 md:h-24 md:w-36 rounded-md overflow-hidden ${
                  activeImage === index
                    ? 'ring-2 ring-primary-600 dark:ring-primary-400'
                    : 'opacity-70'
                }`}
              >
                <img
                  src={photo}
                  alt={`${cafe.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cafe Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-2">
                {cafe.name}
              </h1>
              
              <div className="flex items-center flex-wrap gap-y-2 mb-4">
                <div className="flex items-center text-accent-600 dark:text-accent-400 mr-4">
                  <Star size={18} fill="currentColor" className="mr-1" />
                  <span className="font-medium">{cafe.rating.toFixed(1)}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    ({cafe.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 mr-4">
                  <DollarSign size={18} className="mr-1" />
                  <span>{cafe.priceRange}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-1">
                  {cafe.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {cafe.description}
              </p>
            </div>
            
            {/* Location & Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-medium text-lg mb-3 text-gray-900 dark:text-white">
                  Location
                </h3>
                <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{cafe.location.address}</p>
                    <p>{cafe.location.city}</p>
                  </div>
                </div>
                <div className="mt-4 w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-medium text-lg mb-3 text-gray-900 dark:text-white">
                  Hours
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  {Object.entries(cafe.hours).map(([day, hours]) => (
                    <div
                      key={day}
                      className={`flex justify-between ${
                        day === currentDay
                          ? 'font-semibold text-primary-600 dark:text-primary-400'
                          : ''
                      }`}
                    >
                      <span>{day}</span>
                      <span>
                        {hours.open} - {hours.close}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Menu */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                Menu
              </h3>
              
              {/* Menu Tabs */}
              <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-700">
                {cafe.menu.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveMenuTab(index)}
                    className={`px-4 py-2 whitespace-nowrap rounded-t-lg font-medium ${
                      activeMenuTab === index
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
              
              {/* Menu Items */}
              <div className="mt-4 space-y-4">
                {cafe.menu[activeMenuTab].items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 sticky top-24">
              <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                Make a Reservation
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Clock size={18} className="mr-2" />
                  <span>Operating hours: {cafe.hours[currentDay].open} - {cafe.hours[currentDay].close}</span>
                </div>
                
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Users size={18} className="mr-2" />
                  <span>Accommodates groups of 1-8 people</span>
                </div>
                
                <Button
                  onClick={handleBookNow}
                  fullWidth
                  size="lg"
                >
                  Book Now
                </Button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  No reservation fee • Free cancellation
                </p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
              <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone size={18} className="mr-2" />
                  <span>(555) 123-4567</span>
                </div>
                
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Globe size={18} className="mr-2" />
                  <a
                    href="#"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {cafe.name.toLowerCase().replace(/\s+/g, '')}.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeDetailPage;