
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, CalendarClock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { RoomBookingProvider, useRoomBooking } from '@/contexts/RoomBookingContext';
import { RoomBookingDialog } from '@/components/room-booking/RoomBookingDialog';
import { RoomDetailsDialog } from '@/components/room-booking/RoomDetailsDialog';
import { useState } from 'react';

const RoomBookingContent = () => {
  const { 
    rooms, 
    bookings, 
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    searchQuery,
    setSelectedDate,
    setSelectedStartTime,
    setSelectedEndTime,
    setSearchQuery,
    setIsBookingDialogOpen,
    setSelectedRoom,
    setIsDetailDialogOpen,
    cancelBooking
  } = useRoomBooking();

  // Filter rooms based on search query
  const filteredRooms = searchQuery
    ? rooms.filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : rooms;

  const handleBookNow = (room: any) => {
    setSelectedRoom(room);
    setIsBookingDialogOpen(true);
  };

  const handleViewDetails = (room: any) => {
    setSelectedRoom(room);
    setIsDetailDialogOpen(true);
  };

  const handleNewBooking = () => {
    // Set default values for a new booking
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedStartTime('');
    setSelectedEndTime('');
  };

  const handleCancelBooking = async (bookingId: string) => {
    await cancelBooking(bookingId);
  };

  const [activeTab, setActiveTab] = useState<string>('available');

  return (
    <>
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="available">Available Rooms</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={handleNewBooking}
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>

        <TabsContent value="available" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Find Available Rooms</CardTitle>
                  <CardDescription>Search for rooms by name, features, or capacity</CardDescription>
                </div>
                <Button variant="outline" className="h-8 px-2 lg:px-3">
                  <Search className="h-3.5 w-3.5 lg:mr-2" />
                  <span className="hidden lg:inline-flex">Advanced Search</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date</label>
                  <Input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Time</label>
                  <Input 
                    type="time" 
                    value={selectedStartTime}
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Time</label>
                  <Input 
                    type="time" 
                    value={selectedEndTime}
                    onChange={(e) => setSelectedEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by room name, building, or features..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <div key={room.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
                          <h3 className="font-medium">{room.name}</h3>
                          <StatusBadge status={room.status} className="ml-2" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{room.building} • Capacity: {room.capacity}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {room.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-accent py-0.5 px-2 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center md:items-start space-x-2 ml-auto">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(room)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          disabled={room.status !== 'online'}
                          onClick={() => handleBookNow(room)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No rooms matching your search criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>Manage your room reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{booking.room}</h3>
                        <span className={`text-xs rounded-full px-2 py-1 ${
                          booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status === 'upcoming' ? 'Upcoming' : 
                           booking.status === 'cancelled' ? 'Cancelled' : 
                           'Completed'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.date} • {booking.time}
                      </p>
                      <p className="text-sm mt-2">
                        <span className="font-medium">Organizer:</span> {booking.organizer}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Purpose:</span> {booking.purpose}
                      </p>
                      {booking.status === 'upcoming' && (
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">Modify</Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    You don't have any bookings yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <RoomBookingDialog />
      <RoomDetailsDialog />
    </>
  );
};

export default function RoomBooking() {
  return (
    <PageLayout title="Room Booking">
      <RoomBookingProvider>
        <RoomBookingContent />
      </RoomBookingProvider>
    </PageLayout>
  );
}
