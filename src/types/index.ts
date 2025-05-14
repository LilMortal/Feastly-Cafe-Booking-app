export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Cafe {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
  };
  photos: string[];
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  categories: string[];
  hours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
    }[];
  }[];
}

export interface Booking {
  id: string;
  cafeId: string;
  cafeName: string;
  cafeImage: string;
  userId: string;
  date: string;
  time: string;
  partySize: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  specialRequests?: string;
}

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type BookingFormData = {
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
};