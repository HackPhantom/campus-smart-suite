
import { Building2, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

interface Building {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  rooms: number;
  occupation: number;
}

const buildings: Building[] = [
  {
    id: 'bldg-001',
    name: 'Main Building',
    status: 'online',
    rooms: 45,
    occupation: 78,
  },
  {
    id: 'bldg-002',
    name: 'Science Wing',
    status: 'warning',
    rooms: 24,
    occupation: 62,
  },
  {
    id: 'bldg-003',
    name: 'Library',
    status: 'online',
    rooms: 12,
    occupation: 45,
  },
  {
    id: 'bldg-004',
    name: 'Student Center',
    status: 'online',
    rooms: 18,
    occupation: 83,
  },
  {
    id: 'bldg-005',
    name: 'Administrative Building',
    status: 'maintenance',
    rooms: 32,
    occupation: 34,
  },
];

export function CampusOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Campus Overview</CardTitle>
          <CardDescription>Building status and occupancy</CardDescription>
        </div>
        <Building2 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {buildings.map((building) => (
            <div key={building.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{building.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {building.rooms} rooms • {building.occupation}% occupied
                  </div>
                </div>
              </div>
              <StatusBadge status={building.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
