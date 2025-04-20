
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRoomBookings = () => {
  return useQuery({
    queryKey: ["room_bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("room_bookings")
        .select(`
          *,
          room:rooms(name)
        `);
      
      if (error) throw error;
      return data;
    }
  });
};
