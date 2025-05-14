import { Cafe, Booking } from '../types';
import { addDays, format } from 'date-fns';

export const mockCafes: Cafe[] = [
  {
    id: '1',
    name: 'The Coffee Studio',
    description: 'A cozy, minimalist café with artisanal coffee and fresh pastries. Our baristas are trained to create the perfect brew using ethically sourced beans from around the world.',
    location: {
      address: '123 Main Street',
      city: 'San Francisco',
      coordinates: [37.7749, -122.4194],
    },
    photos: [
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.8,
    reviewCount: 342,
    priceRange: '$$',
    categories: ['Coffee', 'Breakfast', 'Brunch'],
    hours: {
      Monday: { open: '07:00', close: '20:00' },
      Tuesday: { open: '07:00', close: '20:00' },
      Wednesday: { open: '07:00', close: '20:00' },
      Thursday: { open: '07:00', close: '20:00' },
      Friday: { open: '07:00', close: '21:00' },
      Saturday: { open: '08:00', close: '21:00' },
      Sunday: { open: '08:00', close: '18:00' },
    },
    menu: [
      {
        category: 'Coffee',
        items: [
          {
            name: 'Espresso',
            description: 'Rich and aromatic single shot espresso',
            price: 3.5,
          },
          {
            name: 'Cappuccino',
            description: 'Espresso with steamed milk and foam',
            price: 4.5,
          },
          {
            name: 'Latte',
            description: 'Espresso with a large amount of steamed milk',
            price: 4.75,
          },
        ],
      },
      {
        category: 'Pastries',
        items: [
          {
            name: 'Croissant',
            description: 'Buttery, flaky pastry',
            price: 3.75,
          },
          {
            name: 'Blueberry Muffin',
            description: 'Moist muffin packed with blueberries',
            price: 3.95,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Rustic Bean',
    description: 'A rustic café with a warm atmosphere, perfect for long conversations over specialty coffee and homemade desserts. Our space features reclaimed wood furniture and local art.',
    location: {
      address: '456 Oak Avenue',
      city: 'Portland',
      coordinates: [45.5152, -122.6784],
    },
    photos: [
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6320212/pexels-photo-6320212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.6,
    reviewCount: 256,
    priceRange: '$$',
    categories: ['Coffee', 'Breakfast', 'Lunch'],
    hours: {
      Monday: { open: '07:30', close: '18:00' },
      Tuesday: { open: '07:30', close: '18:00' },
      Wednesday: { open: '07:30', close: '18:00' },
      Thursday: { open: '07:30', close: '18:00' },
      Friday: { open: '07:30', close: '19:00' },
      Saturday: { open: '08:00', close: '19:00' },
      Sunday: { open: '08:00', close: '17:00' },
    },
    menu: [
      {
        category: 'Coffee',
        items: [
          {
            name: 'Drip Coffee',
            description: 'Our signature house blend',
            price: 3.25,
          },
          {
            name: 'Cold Brew',
            description: 'Smooth and rich cold brewed coffee',
            price: 4.75,
          },
        ],
      },
      {
        category: 'Food',
        items: [
          {
            name: 'Avocado Toast',
            description: 'Sourdough toast with avocado, olive oil, and sea salt',
            price: 9.5,
          },
          {
            name: 'Breakfast Burrito',
            description: 'Scrambled eggs, potatoes, cheese, and salsa in a flour tortilla',
            price: 10.25,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Urban Grind',
    description: 'A modern, industrial-chic café in the heart of downtown. We serve premium coffee and offer a relaxed environment for both working and socializing.',
    location: {
      address: '789 Pine Street',
      city: 'Seattle',
      coordinates: [47.6062, -122.3321],
    },
    photos: [
      'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/207142/pexels-photo-207142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.7,
    reviewCount: 412,
    priceRange: '$$$',
    categories: ['Coffee', 'Brunch', 'Lunch'],
    hours: {
      Monday: { open: '06:30', close: '21:00' },
      Tuesday: { open: '06:30', close: '21:00' },
      Wednesday: { open: '06:30', close: '21:00' },
      Thursday: { open: '06:30', close: '21:00' },
      Friday: { open: '06:30', close: '22:00' },
      Saturday: { open: '07:00', close: '22:00' },
      Sunday: { open: '07:00', close: '20:00' },
    },
    menu: [
      {
        category: 'Signature Drinks',
        items: [
          {
            name: 'Lavender Latte',
            description: 'Espresso with steamed milk and house-made lavender syrup',
            price: 5.5,
          },
          {
            name: 'Honey Cardamom Cappuccino',
            description: 'Espresso with frothed milk, honey, and cardamom',
            price: 5.25,
          },
        ],
      },
      {
        category: 'Breakfast',
        items: [
          {
            name: 'Granola Bowl',
            description: 'House-made granola with Greek yogurt and seasonal fruit',
            price: 8.75,
          },
          {
            name: 'Breakfast Sandwich',
            description: 'Egg, cheese, and bacon on a toasted brioche bun',
            price: 9.5,
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Café Soleil',
    description: 'A sunny, Mediterranean-inspired café with large windows and a garden patio. Known for our light fare and exceptional desserts.',
    location: {
      address: '321 Maple Road',
      city: 'Los Angeles',
      coordinates: [34.0522, -118.2437],
    },
    photos: [
      'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3021382/pexels-photo-3021382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4918889/pexels-photo-4918889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.5,
    reviewCount: 287,
    priceRange: '$$',
    categories: ['Coffee', 'Brunch', 'Desserts'],
    hours: {
      Monday: { open: '08:00', close: '19:00' },
      Tuesday: { open: '08:00', close: '19:00' },
      Wednesday: { open: '08:00', close: '19:00' },
      Thursday: { open: '08:00', close: '19:00' },
      Friday: { open: '08:00', close: '20:00' },
      Saturday: { open: '09:00', close: '20:00' },
      Sunday: { open: '09:00', close: '17:00' },
    },
    menu: [
      {
        category: 'Drinks',
        items: [
          {
            name: 'Mediterranean Mocha',
            description: 'Espresso with chocolate and a hint of orange blossom',
            price: 5.25,
          },
          {
            name: 'Mint Tea',
            description: 'Fresh mint leaves steeped in hot water',
            price: 3.75,
          },
        ],
      },
      {
        category: 'Desserts',
        items: [
          {
            name: 'Baklava',
            description: 'Phyllo pastry with nuts and honey',
            price: 4.5,
          },
          {
            name: 'Lemon Tart',
            description: 'Buttery crust with tangy lemon filling',
            price: 5.75,
          },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Rainy Day Roasters',
    description: 'A cozy retreat for rainy days, with comfortable seating and large windows to watch the world go by. We roast our own single-origin beans on-site.',
    location: {
      address: '567 Willow Lane',
      city: 'Chicago',
      coordinates: [41.8781, -87.6298],
    },
    photos: [
      'https://images.pexels.com/photos/2159074/pexels-photo-2159074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1395958/pexels-photo-1395958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.9,
    reviewCount: 376,
    priceRange: '$$',
    categories: ['Coffee', 'Tea', 'Pastries'],
    hours: {
      Monday: { open: '07:00', close: '19:00' },
      Tuesday: { open: '07:00', close: '19:00' },
      Wednesday: { open: '07:00', close: '19:00' },
      Thursday: { open: '07:00', close: '19:00' },
      Friday: { open: '07:00', close: '20:00' },
      Saturday: { open: '08:00', close: '20:00' },
      Sunday: { open: '08:00', close: '18:00' },
    },
    menu: [
      {
        category: 'Single Origin Coffee',
        items: [
          {
            name: 'Ethiopian Pour Over',
            description: 'Bright and fruity with floral notes',
            price: 5.0,
          },
          {
            name: 'Colombian Press',
            description: 'Full-bodied with chocolate and caramel notes',
            price: 4.75,
          },
        ],
      },
      {
        category: 'Tea',
        items: [
          {
            name: 'Earl Grey',
            description: 'Classic black tea with bergamot',
            price: 3.5,
          },
          {
            name: 'Matcha Latte',
            description: 'Ceremonial grade matcha with steamed milk',
            price: 5.25,
          },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Bookworm Café',
    description: 'A quiet café filled with books to browse while you enjoy your coffee. We offer comfortable reading nooks and a selection of literary-themed beverages.',
    location: {
      address: '890 Cedar Avenue',
      city: 'Boston',
      coordinates: [42.3601, -71.0589],
    },
    photos: [
      'https://images.pexels.com/photos/5082704/pexels-photo-5082704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3755747/pexels-photo-3755747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2187607/pexels-photo-2187607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.6,
    reviewCount: 218,
    priceRange: '$$',
    categories: ['Coffee', 'Books', 'Pastries'],
    hours: {
      Monday: { open: '08:00', close: '21:00' },
      Tuesday: { open: '08:00', close: '21:00' },
      Wednesday: { open: '08:00', close: '21:00' },
      Thursday: { open: '08:00', close: '21:00' },
      Friday: { open: '08:00', close: '22:00' },
      Saturday: { open: '09:00', close: '22:00' },
      Sunday: { open: '09:00', close: '20:00' },
    },
    menu: [
      {
        category: 'Literary Drinks',
        items: [
          {
            name: 'The Hemingway',
            description: 'Strong black coffee with a hint of rum flavoring',
            price: 4.75,
          },
          {
            name: 'Jane Austen Tea',
            description: 'English breakfast tea with lavender and honey',
            price: 4.25,
          },
        ],
      },
      {
        category: 'Light Fare',
        items: [
          {
            name: 'Poet\'s Plate',
            description: 'Assortment of cheeses, fruits, and crackers',
            price: 12.5,
          },
          {
            name: 'Novelist\'s Sandwich',
            description: 'Turkey, brie, and apple on sourdough',
            price: 10.75,
          },
        ],
      },
    ],
  },
];

// Generate timestamps for the next 7 days starting from today
const getTodayPlusDays = (days: number) => {
  return addDays(new Date(), days).toISOString();
};

// Generate example bookings
export const mockBookings: Booking[] = [
  {
    id: '1',
    cafeId: '1',
    cafeName: 'The Coffee Studio',
    cafeImage: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userId: '123',
    date: getTodayPlusDays(1),
    time: '10:00',
    partySize: 2,
    status: 'upcoming',
    specialRequests: 'Window seat if possible.'
  },
  {
    id: '2',
    cafeId: '3',
    cafeName: 'Urban Grind',
    cafeImage: 'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userId: '123',
    date: getTodayPlusDays(2),
    time: '14:30',
    partySize: 4,
    status: 'upcoming',
    specialRequests: 'Birthday celebration.'
  },
  {
    id: '3',
    cafeId: '5',
    cafeName: 'Rainy Day Roasters',
    cafeImage: 'https://images.pexels.com/photos/2159074/pexels-photo-2159074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userId: '123',
    date: getTodayPlusDays(-5),
    time: '11:00',
    partySize: 1,
    status: 'completed'
  },
  {
    id: '4',
    cafeId: '2',
    cafeName: 'Rustic Bean',
    cafeImage: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userId: '123',
    date: getTodayPlusDays(-10),
    time: '09:15',
    partySize: 3,
    status: 'completed'
  },
  {
    id: '5',
    cafeId: '4',
    cafeName: 'Café Soleil',
    cafeImage: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userId: '123',
    date: getTodayPlusDays(-2),
    time: '15:45',
    partySize: 2,
    status: 'cancelled'
  },
];

// Generate time slots for booking
export const getAvailableTimeSlots = (date: Date, cafeId: string) => {
  // This is mock data - in a real app this would come from an API
  const timeSlots = [];
  
  // Generate time slots from 8 AM to 8 PM
  for (let hour = 8; hour <= 20; hour++) {
    // For each hour, create slots at :00 and :30
    for (let minutes of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Randomly mark some slots as unavailable
      const isAvailable = Math.random() > 0.3; // 30% chance of being unavailable
      
      timeSlots.push({
        time,
        available: isAvailable
      });
    }
  }
  
  return timeSlots;
};

// Filter cafés by search term, category, etc.
export const searchCafes = (
  searchTerm: string = '', 
  category: string = '',
  city: string = '',
  priceRange: string = ''
) => {
  return mockCafes.filter(cafe => {
    // Filter by search term (name and description)
    const matchesSearch = searchTerm === '' || 
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = category === '' ||
      cafe.categories.some(cat => cat.toLowerCase() === category.toLowerCase());
    
    // Filter by city
    const matchesCity = city === '' ||
      cafe.location.city.toLowerCase() === city.toLowerCase();
    
    // Filter by price range
    const matchesPriceRange = priceRange === '' ||
      cafe.priceRange === priceRange;
    
    return matchesSearch && matchesCategory && matchesCity && matchesPriceRange;
  });
};

// Get a café by ID
export const getCafeById = (id: string) => {
  return mockCafes.find(cafe => cafe.id === id);
};

// Get bookings for a user
export const getUserBookings = (userId: string) => {
  return mockBookings.filter(booking => booking.userId === userId);
};

// Create a new booking
export const createBooking = (bookingData: Omit<Booking, 'id'>): Booking => {
  const cafeData = getCafeById(bookingData.cafeId);
  if (!cafeData) {
    throw new Error('Café not found');
  }
  
  const newBooking: Booking = {
    ...bookingData,
    id: `booking-${Date.now()}`,
  };
  
  // In a real app, this would be saved to a database
  mockBookings.push(newBooking);
  
  return newBooking;
};

// Update booking status
export const updateBookingStatus = (bookingId: string, status: 'upcoming' | 'completed' | 'cancelled') => {
  const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    throw new Error('Booking not found');
  }
  
  mockBookings[bookingIndex].status = status;
  
  return mockBookings[bookingIndex];
};

// Get unique cities from cafés
export const getCities = () => {
  const cities = new Set(mockCafes.map(cafe => cafe.location.city));
  return Array.from(cities);
};

// Get unique categories from cafés
export const getCategories = () => {
  const categories = new Set<string>();
  mockCafes.forEach(cafe => {
    cafe.categories.forEach(category => {
      categories.add(category);
    });
  });
  return Array.from(categories);
};