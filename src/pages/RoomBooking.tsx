
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, CalendarClock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';

const rooms = [
  {
    id: 'rm-101',
    name: 'Lecture Hall 101',
    building: 'Main Building',
    capacity: 120,
    features: ['Projector', 'Audio System', 'Whiteboard'],
    status: 'online' as const,
  },
  {
    id: 'rm-203',
    name: 'Computer Lab 203',
    building: 'Science Wing',
    capacity: 40,
    features: ['Computers', 'Projector', 'Specialized Software'],
    status: 'online' as const,
  },
  {
    id: 'rm-305',
    name: 'Conference Room 305',
    building: 'Administrative Building',
    capacity: 20,
    features: ['Video Conferencing', 'Whiteboard', 'Coffee Station'],
    status: 'maintenance' as const,
  },
  {
    id: 'rm-422',
    name: 'Study Room 422',
    building: 'Library',
    capacity: 8,
    features: ['Whiteboard', 'Reference Materials'],
    status: 'online' as const,
  },
  {
    id: 'rm-510',
    name: 'Seminar Room 510',
    building: 'Main Building',
    capacity: 50,
    features: ['Projector', 'Audio System', 'Flexible Seating'],
    status: 'warning' as const,
  },
  {
    id: 'rm-602',
    name: 'Collaboration Space 602',
    building: 'Student Center',
    capacity: 30,
    features: ['Movable Furniture', 'Whiteboards', 'Display Screens'],
    status: 'online' as const,
  },
];

const bookings = [
  {
    id: 'bk-1001',
    room: 'Lecture Hall 101',
    date: 'May 12, 2023',
    time: '10:00 AM - 11:30 AM',
    organizer: 'Prof. Smith',
    purpose: 'Physics Lecture',
    status: 'upcoming' as const,
  },
  {
    id: 'bk-1002',
    room: 'Computer Lab 203',
    date: 'May 12, 2023',
    time: '2:00 PM - 4:00 PM',
    organizer: 'Dr. Johnson',
    purpose: 'Programming Workshop',
    status: 'upcoming' as const,
  },
  {
    id: 'bk-1003',
    room: 'Study Room 422',
    date: 'May 11, 2023',
    time: '3:00 PM - 5:00 PM',
    organizer: 'Student Group A',
    purpose: 'Project Meeting',
    status: 'completed' as const,
  },
];

export default function RoomBooking() {
  return (
    <PageLayout title="Room Booking">
      <Tabs defaultValue="available">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="available">Available Rooms</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          <Button className="bg-primary hover:bg-primary/90">
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
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Time</label>
                  <Input type="time" />
                </div>
              </div>
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by room name, building, or features..."
                  className="pl-8"
                />
              </div>

              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
                        <h3 className="font-medium">{room.name}</h3>
                        <StatusBadge status={room.status} className="ml-2" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{room.building} • Capacity: {room.capacity}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {room.features.map((feature) => (
                          <span key={feature} className="text-xs bg-accent py-0.5 px-2 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center md:items-start space-x-2 ml-auto">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" disabled={room.status !== 'online'}>Book Now</Button>
                    </div>
                  </div>
                ))}
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
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{booking.room}</h3>
                      <span className={`text-xs rounded-full px-2 py-1 ${
                        booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
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
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
