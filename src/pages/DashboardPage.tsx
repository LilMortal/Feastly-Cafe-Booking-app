import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBookings, updateBookingStatus } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import BookingCard from '../components/booking/BookingCard';
import Button from '../components/ui/Button';
import { Booking } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  useEffect(() => {
    if (user) {
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        const userBookings = getUserBookings(user.id);
        setBookings(userBookings);
        setIsLoading(false);
      }, 800);
    }
  }, [user]);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        updateBookingStatus(bookingId, 'cancelled');
        
        // Update local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-gray-900 dark:text-white">
        My Bookings
      </h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'upcoming'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'completed'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'cancelled'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Cancelled
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            No {activeTab} bookings
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {activeTab === 'upcoming'
              ? "You don't have any upcoming bookings."
              : activeTab === 'completed'
              ? "You don't have any completed bookings yet."
              : "You don't have any cancelled bookings."}
          </p>
          {activeTab === 'upcoming' && (
            <Button onClick={() => navigate('/')}>
              Find a Café
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={
                activeTab === 'upcoming' ? handleCancelBooking : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;