
import React from 'react';
import { useRoomBooking } from '@/contexts/RoomBookingContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { CalendarClock, Users, Building2 } from 'lucide-react';

export const RoomDetailsDialog: React.FC = () => {
  const { 
    isDetailDialogOpen, 
    setIsDetailDialogOpen, 
    selectedRoom,
    setSelectedRoom,
    setIsBookingDialogOpen
  } = useRoomBooking();

  const handleBook = () => {
    setIsDetailDialogOpen(false);
    setIsBookingDialogOpen(true);
  };

  const handleClose = () => {
    setIsDetailDialogOpen(false);
  };

  if (!selectedRoom) return null;

  return (
    <Dialog open={isDetailDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{selectedRoom.name}</span>
            <StatusBadge status={selectedRoom.status} />
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{selectedRoom.building}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Capacity: {selectedRoom.capacity} people</span>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Features:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-1"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Availability:</h4>
              <p className="text-sm text-muted-foreground">
                {selectedRoom.status === 'online' 
                  ? 'This room is currently available for booking.'
                  : selectedRoom.status === 'maintenance'
                    ? 'This room is currently under maintenance and unavailable for booking.'
                    : 'This room has limited availability due to technical issues.'}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button 
            onClick={handleBook}
            disabled={selectedRoom.status !== 'online'}
          >
            <CalendarClock className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
