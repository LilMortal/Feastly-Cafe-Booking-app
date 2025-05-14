import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import BookingForm from '../components/booking/BookingForm';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { getCafeById, getAvailableTimeSlots, createBooking } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Cafe, BookingFormData, TimeSlot } from '../types';
import { format } from 'date-fns';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const cafeData = getCafeById(id);
        if (cafeData) {
          setCafe(cafeData);
          
          // Get initial time slots for today
          const timeSlots = getAvailableTimeSlots(new Date(), id);
          setAvailableTimeSlots(timeSlots);
        }
        setIsLoading(false);
      }, 800);
    }
  }, [id]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    
    // Get time slots for the selected date
    const timeSlots = getAvailableTimeSlots(date, id || '');
    setAvailableTimeSlots(timeSlots);
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    if (!cafe || !user) return;
    
    setIsBookingInProgress(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        createBooking({
          cafeId: cafe.id,
          cafeName: cafe.name,
          cafeImage: cafe.photos[0],
          userId: user.id,
          date: formData.date.toISOString(),
          time: formData.time,
          partySize: formData.partySize,
          status: 'upcoming',
          specialRequests: formData.specialRequests,
        });
        
        setBookingSuccess(true);
      } catch (error) {
        console.error('Booking failed:', error);
      } finally {
        setIsBookingInProgress(false);
      }
    }, 1500);
  };

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
          The café you're trying to book doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-success-600 dark:text-success-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-900 dark:text-white">
            Booking Confirmed!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your reservation at {cafe.name} has been confirmed. You can view your booking details in your dashboard.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard')}
              fullWidth
            >
              View My Bookings
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              fullWidth
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition mb-6"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back to café
      </button>
      
      <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-gray-900 dark:text-white">
        Book a Table at {cafe.name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Reservation Details
          </h2>
          
          <BookingForm
            cafeId={cafe.id}
            availableTimeSlots={availableTimeSlots}
            onSubmit={handleBookingSubmit}
            isLoading={isBookingInProgress}
          />
        </div>
        
        {/* Café Summary */}
        <div>
          <Card>
            <CardImage
              src={cafe.photos[0]}
              alt={cafe.name}
              aspectRatio="video"
            />
            <CardContent>
              <CardTitle>{cafe.name}</CardTitle>
              <CardDescription className="mb-4">
                {cafe.location.address}, {cafe.location.city}
              </CardDescription>
              
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Today's Hours:</span>{' '}
                  {cafe.hours[format(new Date(), 'EEEE')].open} - {cafe.hours[format(new Date(), 'EEEE')].close}
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Price Range:</span>{' '}
                  {cafe.priceRange}
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Types:</span>{' '}
                  {cafe.categories.join(', ')}
                </p>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                  Reservation Information
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Reservations are held for 15 minutes</li>
                  <li>• Cancellation is free up to 2 hours before</li>
                  <li>• Large parties (6+) may require a deposit</li>
                  <li>• Special requests are subject to availability</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;