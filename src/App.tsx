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
import { AttendanceProvider } from "./contexts/AttendanceContext";

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/map" element={<Map />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
