
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Define a type for the attendance record data
interface AttendanceRecord {
  id: string;
  date: string;
  class_id: string;
  status: 'present' | 'absent';
  students: {
    id: string;
    name: string;
  };
}

// Define a type for the processed records
interface ProcessedRecord {
  date: string;
  class: string;
  present: number;
  absent: number;
  records: AttendanceRecord[];
  rate?: string;
}

export const useAttendanceRecords = (classId?: string) => {
  return useQuery({
    queryKey: ["attendance", classId],
    enabled: !!classId,
    queryFn: async () => {
      if (!classId) return [];
      
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .select(`
          id,
          departments(code),
          year,
          section
        `)
        .eq("id", classId)
        .single();
      
      if (classError) throw classError;
      
      const className = `${classData.departments.code} - Year ${classData.year}, Section ${classData.section}`;
      
      const { data, error } = await supabase
        .from("attendance_records")
        .select(`
          id,
          date,
          class_id,
          status,
          students(id, name)
        `)
        .eq("class_id", classId);
      
      if (error) throw error;
      
      // Group by date to calculate metrics
      const recordsByDate: Record<string, ProcessedRecord> = {};
      
      // Process each record and group by date
      data.forEach((record: AttendanceRecord) => {
        const date = record.date;
        
        if (!recordsByDate[date]) {
          recordsByDate[date] = {
            date: formatDate(date),
            class: className,
            present: 0,
            absent: 0,
            records: []
          };
        }
        
        if (record.status === 'present') {
          recordsByDate[date].present += 1;
        } else {
          recordsByDate[date].absent += 1;
        }
        
        recordsByDate[date].records.push(record);
      });
      
      // Convert to array and calculate rates
      return Object.values(recordsByDate).map(record => {
        const total = record.present + record.absent;
        const rate = total > 0 ? `${Math.round((record.present / total) * 100)}%` : '0%';
        return {
          ...record,
          rate
        };
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  });
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
