import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { getCities, getCategories } from '../../data/mockData';

interface CafeFilterProps {
  onFilter: (filters: {
    searchTerm: string;
    category: string;
    city: string;
    priceRange: string;
  }) => void;
}

const CafeFilter: React.FC<CafeFilterProps> = ({ onFilter }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  const cities = getCities();
  const categories = getCategories();
  const priceRanges = ['$', '$$', '$$$'];
  
  const handleApplyFilters = () => {
    onFilter({
      searchTerm,
      category,
      city,
      priceRange,
    });
    if (window.innerWidth < 768) {
      setIsFiltersOpen(false);
    }
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setCity('');
    setPriceRange('');
    onFilter({
      searchTerm: '',
      category: '',
      city: '',
      priceRange: '',
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <Input
            icon={<Search size={18} className="text-gray-400" />}
            placeholder="Search cafés by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </div>
        
        <div className="md:hidden">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            rightIcon={isFiltersOpen ? <X size={16} /> : <Filter size={16} />}
          >
            {isFiltersOpen ? 'Hide Filters' : 'Filters'}
          </Button>
        </div>
        
        <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:flex md:space-x-3 space-y-3 md:space-y-0 mt-3 md:mt-0`}>
          <div className="relative min-w-[120px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative min-w-[120px]">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any City</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative min-w-[100px]">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any Price</option>
              {priceRanges.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
          </div>
          
          <Button onClick={handleApplyFilters}>Apply</Button>
          <Button variant="ghost" onClick={handleResetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CafeFilter;