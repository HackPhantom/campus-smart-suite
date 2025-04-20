
import React, { createContext, useContext, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useRooms } from "@/hooks/useRooms";
import { useRoomBookings } from "@/hooks/useRoomBookings";

export type RoomStatus = 'online' | 'offline' | 'maintenance' | 'warning';

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  features: string[];
  status: RoomStatus;
  created_at?: string;
}

export interface Booking {
  id: string;
  room: { name: string };
  room_id?: string;
  date: string;
  start_time: string;
  end_time: string;
  organizer: string;
  purpose: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  created_at?: string;
  created_by?: string;
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

interface BookingFormData {
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

const RoomBookingContext = createContext<RoomBookingContextType | undefined>(undefined);

export const RoomBookingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: roomsData = [], isLoading: isLoadingRooms } = useRooms();
  const { data: bookingsData = [], isLoading: isLoadingBookings } = useRoomBookings();
  
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);

  // Convert Supabase data to our application types
  const rooms: Room[] = roomsData.map(room => ({
    id: room.id,
    name: room.name,
    building: room.building,
    capacity: room.capacity,
    features: room.features,
    status: room.status as RoomStatus,
    created_at: room.created_at
  }));

  const bookings: Booking[] = bookingsData.map(booking => ({
    id: booking.id,
    room: booking.room,
    room_id: booking.room_id,
    date: booking.date,
    start_time: booking.start_time,
    end_time: booking.end_time,
    organizer: booking.organizer,
    purpose: booking.purpose,
    status: booking.status as 'upcoming' | 'completed' | 'cancelled',
    created_at: booking.created_at,
    created_by: booking.created_by
  }));

  const bookRoom = async (data: BookingFormData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('room_bookings')
        .insert([{
          room_id: data.roomId,
          date: data.date,
          start_time: data.startTime,
          end_time: data.endTime,
          purpose: data.purpose,
          organizer: "Current User", // In a real app, this would be the logged-in user
          status: 'upcoming'
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Room booked successfully",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book room. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('room_bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

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
        isLoading: isLoadingRooms || isLoadingBookings,
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
