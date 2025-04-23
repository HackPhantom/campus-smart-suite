
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/contexts/attendance/useAttendance";
import { Loader2, Info } from "lucide-react";

interface RemindersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const RemindersDialog: React.FC<RemindersDialogProps> = ({ open, onOpenChange }) => {
  const { selectedClass, attendanceRecords, getSmartReminders } = useAttendance();
  const [reminders, setReminders] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = async () => {
    if (!selectedClass) {
      setError("Select a class to get smart reminders.");
      return;
    }
    setLoading(true);
    setReminders("");
    setError(null);
    try {
      const reminderText = await getSmartReminders(selectedClass.name, attendanceRecords);
      setReminders(reminderText);
    } catch (err: any) {
      setError("Could not retrieve reminders.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchReminders();
    } else {
      setReminders("");
      setError(null);
    }
  // eslint-disable-next-line
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <Info className="inline-block mr-1 mb-1 text-blue-500" />
            Smart Notifications & Reminders
          </DialogTitle>
          <DialogDescription>
            AI-powered suggestions for improving attendance and student engagement.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 min-h-[72px]">
          {loading ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="animate-spin size-4" />
              <span>Generating reminders...</span>
            </div>
          ) : error ? (
            <div className="text-destructive text-sm">{error}</div>
          ) : reminders ? (
            <div className="prose max-w-none text-sm whitespace-pre-line">{reminders}</div>
          ) : (
            <div className="text-muted-foreground text-sm">No reminders available.</div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={fetchReminders} variant="outline" disabled={loading}>
            Refresh Reminders
          </Button>
          <Button onClick={() => onOpenChange(false)} disabled={loading}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
