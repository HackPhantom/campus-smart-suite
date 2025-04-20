
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map as MapIcon, Building2, Layers, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/status-badge';

export default function Map() {
  return (
    <PageLayout title="Campus Map">
      <Tabs defaultValue="map">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="buildings">Building List</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Layers className="mr-2 h-4 w-4" />
              Layers
            </Button>
            <Button variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </div>
        </div>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Interactive Campus Map</CardTitle>
                  <CardDescription>Navigate and find locations on campus</CardDescription>
                </div>
                <MapIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* This would be replaced with an actual map component in a real implementation */}
                <div className="bg-muted rounded-lg h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Interactive Campus Map</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      This placeholder represents an interactive map with buildings, rooms, and facilities that would be implemented using a mapping library like Leaflet or Google Maps.
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-background shadow-lg rounded-lg p-3 space-y-2 border">
                  <div className="text-sm font-medium">Map Legend</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-sm mr-2"></div>
                      <span>Academic Buildings</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                      <span>Recreational Areas</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-2"></div>
                      <span>Administration</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                      <span>Alert Zones</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buildings">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Campus Buildings</CardTitle>
                  <CardDescription>All buildings and their current status</CardDescription>
                </div>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Main Academic Building',
                    type: 'Academic',
                    floors: 4,
                    rooms: 52,
                    status: 'online' as const,
                    occupancy: '78%',
                  },
                  {
                    name: 'Science and Engineering Center',
                    type: 'Academic',
                    floors: 5,
                    rooms: 68,
                    status: 'warning' as const,
                    occupancy: '65%',
                  },
                  {
                    name: 'Student Center',
                    type: 'Recreational',
                    floors: 3,
                    rooms: 24,
                    status: 'online' as const,
                    occupancy: '82%',
                  },
                  {
                    name: 'Library',
                    type: 'Academic',
                    floors: 6,
                    rooms: 32,
                    status: 'online' as const,
                    occupancy: '45%',
                  },
                  {
                    name: 'Administration Building',
                    type: 'Administrative',
                    floors: 3,
                    rooms: 42,
                    status: 'maintenance' as const,
                    occupancy: '34%',
                  },
                  {
                    name: 'Sports Complex',
                    type: 'Recreational',
                    floors: 2,
                    rooms: 18,
                    status: 'online' as const,
                    occupancy: '56%',
                  },
                ].map((building, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{building.name}</h3>
                          <StatusBadge status={building.status} className="ml-2" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {building.type} • {building.floors} floors • {building.rooms} rooms
                        </p>
                      </div>
                      <div className="flex items-center mt-3 lg:mt-0">
                        <Users className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">Current occupancy: <strong>{building.occupancy}</strong></span>
                        <div className="ml-4">
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    </div>
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
