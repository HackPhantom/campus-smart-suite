
import React, { useState, useEffect } from 'react';
import { useAttendance } from '@/contexts/AttendanceContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, X, Brain } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentTable } from './StudentTable';
import { StudentSearch } from './StudentSearch';
import { AnalysisSection } from './AnalysisSection';

export const AttendanceDialog: React.FC = () => {
  const {
    isAttendanceDialogOpen,
    setIsAttendanceDialogOpen,
    selectedClass,
    students,
    saveAttendance,
    isLoading,
    getAttendanceAnalysis
  } = useAttendance();

  const [localStudents, setLocalStudents] = useState(students);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<string>('attendance');
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  useEffect(() => {
    if (isAttendanceDialogOpen) {
      setAnalysis('');
      setActiveTab('attendance');
    }
  }, [isAttendanceDialogOpen]);

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

  const handleGetAnalysis = async () => {
    if (!selectedClass) return;
    setIsAnalyzing(true);
    const analysisText = await getAttendanceAnalysis(selectedClass.name);
    setAnalysis(analysisText);
    setIsAnalyzing(false);
    setActiveTab('analysis');
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="analysis">Smart Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="py-4">
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
              <StudentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <StudentTable students={filteredStudents} onToggle={handleToggleAttendance} />
            <div className="mt-2 flex justify-between text-sm">
              <div>Total: {filteredStudents.length} students</div>
              <div>
                Present: {filteredStudents.filter(s => s.present).length} | 
                Absent: {filteredStudents.filter(s => !s.present).length}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                className="mr-2"
                onClick={handleGetAnalysis}
                disabled={isAnalyzing || isLoading}
              >
                <Brain className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="analysis" className="py-4">
            <AnalysisSection
              analysis={analysis}
              isAnalyzing={isAnalyzing}
              onGenerate={handleGetAnalysis}
            />
          </TabsContent>
        </Tabs>
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
