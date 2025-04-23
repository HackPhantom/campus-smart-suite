
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useClasses } from '@/hooks/useClasses';
import { useStudents } from '@/hooks/useStudents';
import { useAttendanceRecords } from '@/hooks/useAttendanceRecords';
import { useQueryClient } from '@tanstack/react-query';
import { calculateAttendanceRate } from './attendanceUtils';

export interface Class {
  id: string;
  name: string;
  code: string;
  time: string;
  location: string;
  students: number;
  attendanceRate: string;
}

export interface AttendanceRecord {
  date: string;
  class: string;
  present: number;
  absent: number;
  rate: string;
  records?: any[];
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  present: boolean;
}

interface AttendanceContextType {
  classes: Class[];
  attendanceRecords: AttendanceRecord[];
  isLoading: boolean;
  selectedClass: Class | null;
  students: Student[];
  takeAttendance: (classId: string) => void;
  saveAttendance: (students: Student[], date: string) => Promise<boolean>;
  viewAttendanceHistory: (classId: string) => Promise<AttendanceRecord[]>;
  isAttendanceDialogOpen: boolean;
  setIsAttendanceDialogOpen: (isOpen: boolean) => void;
  getAttendanceAnalysis: (className: string) => Promise<string>;
}

export const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: classesData = [], isLoading: isLoadingClasses } = useClasses();
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const { data: studentsData = [], isLoading: isLoadingStudents } = useStudents(selectedClassId || undefined);
  const { data: attendanceRecordsData = [], isLoading: isLoadingAttendance } = useAttendanceRecords(selectedClassId || undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState<boolean>(false);

  const classes: Class[] = classesData.map(cls => ({
    ...cls,
    students: studentsData.length,
    attendanceRate: calculateAttendanceRate(attendanceRecordsData)
  }));

  const takeAttendance = useCallback((classId: string) => {
    const classObj = classes.find(c => c.id === classId);
    if (classObj) {
      setSelectedClass(classObj);
      setSelectedClassId(classId);
      setStudents(studentsData.map(student => ({
        ...student,
        present: true // Default all students to present
      })));
      setIsAttendanceDialogOpen(true);
    }
  }, [classes, studentsData]);

  const saveAttendance = async (studentsData: Student[], date: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!selectedClass || !selectedClassId) return false;
      const records = studentsData.map(student => ({
        class_id: selectedClassId,
        student_id: student.id,
        date: date,
        status: student.present ? 'present' : 'absent'
      }));
      const { data: existingRecords } = await supabase
        .from('attendance_records')
        .select('id')
        .eq('class_id', selectedClassId)
        .eq('date', date);
      if (existingRecords && existingRecords.length > 0) {
        const { error: deleteError } = await supabase
          .from('attendance_records')
          .delete()
          .eq('class_id', selectedClassId)
          .eq('date', date);
        if (deleteError) throw deleteError;
      }
      const { error } = await supabase
        .from('attendance_records')
        .insert(records);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast({
        title: "Attendance Saved",
        description: `Recorded attendance for ${selectedClass.name} with ${studentsData.filter(s => s.present).length} present and ${studentsData.filter(s => !s.present).length} absent`,
      });
      return true;
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast({
        title: "Error",
        description: "Failed to save attendance. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
      setIsAttendanceDialogOpen(false);
    }
  };

  const viewAttendanceHistory = async (classId: string): Promise<AttendanceRecord[]> => {
    setSelectedClassId(classId);
    return attendanceRecordsData;
  };

  const getAttendanceAnalysis = async (className: string): Promise<string> => {
    try {
      const response = await fetch('/api/groq-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'analyze_attendance',
          data: {
            className,
            attendanceRecords: students,
            students: studentsData
          }
        })
      });
      if (!response.ok) throw new Error('Failed to get attendance analysis');
      const data = await response.json();
      return data.analysis;      
    } catch (error) {
      console.error('Error getting attendance analysis:', error);
      return 'Unable to generate analysis at this time.';
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        classes,
        attendanceRecords: attendanceRecordsData,
        isLoading: isLoadingClasses || isLoadingStudents || isLoadingAttendance || isLoading,
        selectedClass,
        students,
        takeAttendance,
        saveAttendance,
        viewAttendanceHistory,
        isAttendanceDialogOpen,
        setIsAttendanceDialogOpen,
        getAttendanceAnalysis
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
