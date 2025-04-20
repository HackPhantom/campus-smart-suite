
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data: classesData, error } = await supabase
        .from("classes")
        .select(`
          id, 
          year, 
          section, 
          academic_year,
          departments(name, code)
        `);
      
      if (error) throw error;
      
      // Transform data to match Class interface
      return classesData.map(cls => ({
        id: cls.id,
        name: `${cls.departments.code} - Year ${cls.year}, Section ${cls.section}`,
        code: cls.departments.code,
        time: calculateClassTime(cls.year, cls.section),
        location: assignClassLocation(cls.year, cls.departments.code),
        students: 0, // Will be populated by counting students
        attendanceRate: "0%"
      }));
    }
  });
};

function calculateClassTime(year: number, section: string): string {
  // Generate realistic time slots based on year and section
  const days = section === 'A' ? 'Mon, Wed, Fri' : 'Tue, Thu';
  const startHour = 8 + (year % 3) * 2;
  const endHour = startHour + 1.5;
  
  const startTime = startHour <= 12 ? `${startHour}:00 AM` : `${startHour-12}:00 PM`;
  const endTime = endHour <= 12 ? `${endHour}:00 AM` : `${endHour-12}:30 PM`;
  
  return `${days} • ${startTime} - ${endTime}`;
}

function assignClassLocation(year: number, departmentCode: string): string {
  const buildings = {
    'CSE': 'Computer Science Building',
    'IT': 'Information Technology Center',
    'ECE': 'Electronics Block',
    'ME': 'Mechanical Engineering Building',
    'CE': 'Civil Engineering Building'
  };
  
  const building = buildings[departmentCode] || 'Main Building';
  const room = 100 + (year * 100) + Math.floor(Math.random() * 50);
  
  return `${building}, Room ${room}`;
}
