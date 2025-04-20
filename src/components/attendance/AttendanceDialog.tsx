
import React, { useState } from 'react';
import { useAttendance } from '@/contexts/AttendanceContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Save, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export const AttendanceDialog: React.FC = () => {
  const { 
    isAttendanceDialogOpen, 
    setIsAttendanceDialogOpen,
    selectedClass,
    students,
    saveAttendance,
    isLoading
  } = useAttendance();

  const [localStudents, setLocalStudents] = useState(students);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  React.useEffect(() => {
    // Update local state when students change
    setLocalStudents(students);
  }, [students]);

  const handleToggleAttendance = (studentId: string) => {
    setLocalStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  const handleClose = () => {
    setIsAttendanceDialogOpen(false);
  };

  const handleSave = async () => {
    if (await saveAttendance(localStudents, date)) {
      setIsAttendanceDialogOpen(false);
    }
  };

  const filteredStudents = searchQuery
    ? localStudents.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : localStudents;

  return (
    <Dialog open={isAttendanceDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Take Attendance: {selectedClass?.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-48"
              />
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Roll Number</th>
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-center font-medium">Present</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b last:border-0">
                    <td className="py-3 px-4">{student.rollNumber}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <Checkbox 
                        checked={student.present}
                        onCheckedChange={() => handleToggleAttendance(student.id)}
                        className="mx-auto"
                      />
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-muted-foreground">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-2 flex justify-between text-sm">
            <div>Total: {filteredStudents.length} students</div>
            <div>
              Present: {filteredStudents.filter(s => s.present).length} | 
              Absent: {filteredStudents.filter(s => !s.present).length}
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Attendance'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
