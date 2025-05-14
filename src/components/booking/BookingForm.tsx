import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import { TimeSlot, BookingFormData } from '../../types';

interface BookingFormProps {
  cafeId: string;
  availableTimeSlots: TimeSlot[];
  onSubmit: (formData: BookingFormData) => void;
  isLoading?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  cafeId,
  availableTimeSlots,
  onSubmit,
  isLoading = false,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      time,
      partySize,
      specialRequests: specialRequests.trim() || undefined,
    });
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Create an array of party sizes from 1 to 8
  const partySizes = Array.from({ length: 8 }, (_, i) => i + 1);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <div className="relative">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <span className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              <Calendar size={18} />
            </span>
            <input
              type="date"
              min={format(today, 'yyyy-MM-dd')}
              max={format(new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')}
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 px-4 focus:outline-none"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Time
        </label>
        <div className="relative">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <span className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              <Clock size={18} />
            </span>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 px-4 appearance-none focus:outline-none"
              required
            >
              <option value="">Select a time</option>
              {availableTimeSlots.map((slot) => (
                <option 
                  key={slot.time} 
                  value={slot.time}
                  disabled={!slot.available}
                >
                  {slot.time} {!slot.available && '(Unavailable)'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Party Size
        </label>
        <div className="relative">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <span className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              <Users size={18} />
            </span>
            <select
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 px-4 appearance-none focus:outline-none"
            >
              {partySizes.map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Special Requests (Optional)
        </label>
        <div className="relative">
          <div className="flex items-start border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <span className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              <MessageSquare size={18} />
            </span>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or preferences?"
              className="block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 px-4 min-h-[100px] focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        disabled={!time || isLoading}
      >
        Confirm Booking
      </Button>
    </form>
  );
};

export default BookingForm;