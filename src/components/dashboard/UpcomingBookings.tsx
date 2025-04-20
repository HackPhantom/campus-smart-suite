
import { CalendarClock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

interface Booking {
  id: string;
  room: string;
  time: string;
  organizer: string;
  attendees: number;
  status: 'online' | 'offline' | 'warning' | 'maintenance';
}

const bookings: Booking[] = [
  {
    id: 'bk-001',
    room: 'Room 101 - Lecture Hall',
    time: '10:00 AM - 11:30 AM',
    organizer: 'Prof. Smith',
    attendees: 45,
    status: 'online'
  },
  {
    id: 'bk-002',
    room: 'Room 205 - Lab',
    time: '12:00 PM - 2:00 PM',
    organizer: 'Dr. Johnson',
    attendees: 18,
    status: 'warning'
  },
  {
    id: 'bk-003',
    room: 'Room 310 - Conference Room',
    time: '3:00 PM - 4:30 PM',
    organizer: 'Department Meeting',
    attendees: 12,
    status: 'online'
  },
  {
    id: 'bk-004',
    room: 'Room 422 - Study Room',
    time: '5:00 PM - 7:00 PM',
    organizer: 'Student Group A',
    attendees: 8,
    status: 'online'
  }
];

export function UpcomingBookings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Today's scheduled room bookings</CardDescription>
        </div>
        <CalendarClock className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{booking.room}</div>
                <div className="text-sm text-muted-foreground">{booking.time}</div>
                <div className="text-sm mt-1">
                  {booking.organizer} • {booking.attendees} attendees
                </div>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
