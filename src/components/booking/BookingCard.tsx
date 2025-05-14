import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardImage, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Booking } from '../../types';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const bookingDate = parseISO(booking.date);
  const formattedDate = format(bookingDate, 'EEEE, MMMM d, yyyy');
  
  // Get status badge styling
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'upcoming':
        return 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400';
      case 'completed':
        return 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400';
      case 'cancelled':
        return 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <CardImage
          src={booking.cafeImage}
          alt={booking.cafeName}
          aspectRatio="video"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getStatusBadge()}`}>
            {booking.status}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{booking.cafeName}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>{booking.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users size={16} className="mr-2 flex-shrink-0" />
            <span>{booking.partySize} {booking.partySize === 1 ? 'person' : 'people'}</span>
          </div>
          
          {booking.specialRequests && (
            <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">Special Requests:</p>
              <p>{booking.specialRequests}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {booking.status === 'upcoming' && onCancel && (
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookingCard;