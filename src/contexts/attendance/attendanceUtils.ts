
import type { AttendanceRecord } from './AttendanceProvider';

// Utility to calculate attendance rate from an array of AttendanceRecord
export function calculateAttendanceRate(records: AttendanceRecord[]): string {
  if (!records || records.length === 0) return "0%";
  
  let totalPresent = 0;
  let totalStudents = 0;
  
  records.forEach(record => {
    totalPresent += record.present;
    totalStudents += (record.present + record.absent);
  });
  
  return totalStudents > 0 
    ? `${Math.round((totalPresent / totalStudents) * 100)}%` 
    : "0%";
}
