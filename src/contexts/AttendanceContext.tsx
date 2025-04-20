
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define types for classes and attendance
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
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 'cls-101',
      name: 'Introduction to Computer Science',
      code: 'CSE101',
      time: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
      location: 'Lecture Hall 101',
      students: 87,
      attendanceRate: '92%',
    },
    {
      id: 'cls-203',
      name: 'Data Structures and Algorithms',
      code: 'CSE203',
      time: 'Tue, Thu • 1:00 PM - 3:00 PM',
      location: 'Computer Lab 203',
      students: 42,
      attendanceRate: '88%',
    },
    {
      id: 'cls-305',
      name: 'Database Management Systems',
      code: 'CSE305',
      time: 'Mon, Wed • 3:30 PM - 5:00 PM',
      location: 'Room 305',
      students: 38,
      attendanceRate: '85%',
    },
    {
      id: 'cls-401',
      name: 'Software Engineering',
      code: 'IT401',
      time: 'Mon, Wed, Fri • 9:00 AM - 10:30 AM',
      location: 'Lecture Hall 202',
      students: 45,
      attendanceRate: '90%',
    },
    {
      id: 'cls-102',
      name: 'Digital Electronics',
      code: 'ECE102',
      time: 'Tue, Thu • 10:00 AM - 11:30 AM',
      location: 'Electronics Lab 101',
      students: 52,
      attendanceRate: '86%',
    },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      date: 'May 10, 2023',
      class: 'CSE101 - Introduction to Computer Science',
      present: 82,
      absent: 5,
      rate: '94%',
    },
    {
      date: 'May 8, 2023',
      class: 'CSE101 - Introduction to Computer Science',
      present: 80,
      absent: 7,
      rate: '92%',
    },
    {
      date: 'May 5, 2023',
      class: 'CSE101 - Introduction to Computer Science',
      present: 79,
      absent: 8,
      rate: '91%',
    },
    {
      date: 'May 3, 2023',
      class: 'CSE101 - Introduction to Computer Science',
      present: 85,
      absent: 2,
      rate: '98%',
    },
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState<boolean>(false);

  // Generate dummy student data for a class
  const generateStudents = (classId: string, count: number): Student[] => {
    const dummyStudents: Student[] = [];
    for (let i = 1; i <= count; i++) {
      const rollPrefix = classId.split('-')[1];
      dummyStudents.push({
        id: `student-${rollPrefix}-${i}`,
        name: `Student ${i}`,
        rollNumber: `${rollPrefix}${i.toString().padStart(3, '0')}`,
        present: true
      });
    }
    return dummyStudents;
  };

  const takeAttendance = (classId: string) => {
    const selectedClass = classes.find(c => c.id === classId);
    if (selectedClass) {
      setSelectedClass(selectedClass);
      const studentCount = selectedClass.students;
      setStudents(generateStudents(classId, studentCount));
      setIsAttendanceDialogOpen(true);
    }
  };

  const saveAttendance = async (studentsData: Student[], date: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (!selectedClass) return false;
      
      const presentCount = studentsData.filter(s => s.present).length;
      const absentCount = studentsData.length - presentCount;
      const rate = `${Math.round((presentCount / studentsData.length) * 100)}%`;
      
      // Add to attendance records
      const newRecord: AttendanceRecord = {
        date,
        class: `${selectedClass.code} - ${selectedClass.name}`,
        present: presentCount,
        absent: absentCount,
        rate,
      };
      
      setAttendanceRecords(prev => [newRecord, ...prev]);
      
      // Update class attendance rate based on average
      const classRecords = [
        ...attendanceRecords.filter(r => r.class.includes(selectedClass.code)),
        newRecord
      ];
      
      if (classRecords.length > 0) {
        const totalRate = classRecords.reduce((sum, record) => {
          return sum + parseInt(record.rate.replace('%', ''));
        }, 0);
        
        const newRate = `${Math.round(totalRate / classRecords.length)}%`;
        
        setClasses(prev => prev.map(c => 
          c.id === selectedClass.id ? { ...c, attendanceRate: newRate } : c
        ));
      }
      
      toast({
        title: "Attendance Saved",
        description: `Recorded attendance for ${selectedClass.name} with ${presentCount} present and ${absentCount} absent`,
      });
      
      return true;
    } catch (error) {
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
    const selectedClass = classes.find(c => c.id === classId);
    if (!selectedClass) return [];
    
    return attendanceRecords.filter(record => 
      record.class.includes(selectedClass.code)
    );
  };

  return (
    <AttendanceContext.Provider
      value={{
        classes,
        attendanceRecords,
        isLoading,
        selectedClass,
        students,
        takeAttendance,
        saveAttendance,
        viewAttendanceHistory,
        isAttendanceDialogOpen,
        setIsAttendanceDialogOpen
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
