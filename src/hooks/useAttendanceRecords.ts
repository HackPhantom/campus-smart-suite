
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      const recordsByDate = data.reduce((acc, record) => {
        const date = record.date;
        if (!acc[date]) {
          acc[date] = {
            date: formatDate(date),
            class: className,
            present: 0,
            absent: 0,
            records: []
          };
        }
        
        if (record.status === 'present') {
          acc[date].present += 1;
        } else {
          acc[date].absent += 1;
        }
        
        acc[date].records.push(record);
        
        return acc;
      }, {});
      
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
