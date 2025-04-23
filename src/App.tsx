
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RoomBooking from "./pages/RoomBooking";
import Attendance from "./pages/Attendance";
import Energy from "./pages/Energy";
import Map from "./pages/Map";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";
import { RoomBookingProvider } from "./contexts/RoomBookingContext";
import Users from "./pages/Users";
import Security from "./pages/Security";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room-booking" element={<RoomBookingProvider><RoomBooking /></RoomBookingProvider>} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/map" element={<Map />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/security" element={<Security />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
