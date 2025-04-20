
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define types for room and booking
export type RoomStatus = 'online' | 'offline' | 'maintenance' | 'warning';

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  features: string[];
  status: RoomStatus;
}

export interface Booking {
  id: string;
  room: string;
  date: string;
  time: string;
  organizer: string;
  purpose: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface BookingFormData {
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

interface RoomBookingContextType {
  rooms: Room[];
  bookings: Booking[];
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  searchQuery: string;
  isLoading: boolean;
  setSelectedDate: (date: string) => void;
  setSelectedStartTime: (time: string) => void;
  setSelectedEndTime: (time: string) => void;
  setSearchQuery: (query: string) => void;
  bookRoom: (data: BookingFormData) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  viewRoomDetails: (roomId: string) => Room | undefined;
  isBookingDialogOpen: boolean;
  setIsBookingDialogOpen: (isOpen: boolean) => void;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  isDetailDialogOpen: boolean;
  setIsDetailDialogOpen: (isOpen: boolean) => void;
}

const RoomBookingContext = createContext<RoomBookingContextType | undefined>(undefined);

export const RoomBookingProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'rm-101',
      name: 'Lecture Hall 101',
      building: 'Main Building',
      capacity: 120,
      features: ['Projector', 'Audio System', 'Whiteboard'],
      status: 'online',
    },
    {
      id: 'rm-203',
      name: 'Computer Lab 203',
      building: 'Science Wing',
      capacity: 40,
      features: ['Computers', 'Projector', 'Specialized Software'],
      status: 'online',
    },
    {
      id: 'rm-305',
      name: 'Conference Room 305',
      building: 'Administrative Building',
      capacity: 20,
      features: ['Video Conferencing', 'Whiteboard', 'Coffee Station'],
      status: 'maintenance',
    },
    {
      id: 'rm-422',
      name: 'Study Room 422',
      building: 'Library',
      capacity: 8,
      features: ['Whiteboard', 'Reference Materials'],
      status: 'online',
    },
    {
      id: 'rm-510',
      name: 'Seminar Room 510',
      building: 'Main Building',
      capacity: 50,
      features: ['Projector', 'Audio System', 'Flexible Seating'],
      status: 'warning',
    },
    {
      id: 'rm-602',
      name: 'Collaboration Space 602',
      building: 'Student Center',
      capacity: 30,
      features: ['Movable Furniture', 'Whiteboards', 'Display Screens'],
      status: 'online',
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'bk-1001',
      room: 'Lecture Hall 101',
      date: 'May 12, 2023',
      time: '10:00 AM - 11:30 AM',
      organizer: 'Prof. Smith',
      purpose: 'Physics Lecture',
      status: 'upcoming',
    },
    {
      id: 'bk-1002',
      room: 'Computer Lab 203',
      date: 'May 12, 2023',
      time: '2:00 PM - 4:00 PM',
      organizer: 'Dr. Johnson',
      purpose: 'Programming Workshop',
      status: 'upcoming',
    },
    {
      id: 'bk-1003',
      room: 'Study Room 422',
      date: 'May 11, 2023',
      time: '3:00 PM - 5:00 PM',
      organizer: 'Student Group A',
      purpose: 'Project Meeting',
      status: 'completed',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);

  const bookRoom = async (data: BookingFormData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Find the room
      const room = rooms.find(r => r.id === data.roomId);
      
      if (!room) {
        toast({
          title: "Error",
          description: "Room not found",
          variant: "destructive"
        });
        return false;
      }
      
      // Create the new booking
      const newBooking: Booking = {
        id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
        room: room.name,
        date: data.date,
        time: `${data.startTime} - ${data.endTime}`,
        organizer: "Current User", // In a real app, this would be the logged-in user's name
        purpose: data.purpose,
        status: 'upcoming'
      };
      
      // Add the booking to the state
      setBookings(prev => [...prev, newBooking]);
      
      toast({
        title: "Success",
        description: `Room ${room.name} booked successfully for ${data.date}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book room. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Update the booking status to cancelled
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));
      
      toast({
        title: "Success",
        description: "Booking cancelled successfully",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const viewRoomDetails = (roomId: string): Room | undefined => {
    return rooms.find(room => room.id === roomId);
  };
  
  return (
    <RoomBookingContext.Provider
      value={{
        rooms,
        bookings,
        selectedDate,
        selectedStartTime,
        selectedEndTime,
        searchQuery,
        isLoading,
        setSelectedDate,
        setSelectedStartTime,
        setSelectedEndTime,
        setSearchQuery,
        bookRoom,
        cancelBooking,
        viewRoomDetails,
        isBookingDialogOpen,
        setIsBookingDialogOpen,
        selectedRoom,
        setSelectedRoom,
        isDetailDialogOpen,
        setIsDetailDialogOpen
      }}
    >
      {children}
    </RoomBookingContext.Provider>
  );
};

export const useRoomBooking = (): RoomBookingContextType => {
  const context = useContext(RoomBookingContext);
  if (context === undefined) {
    throw new Error('useRoomBooking must be used within a RoomBookingProvider');
  }
  return context;
};
