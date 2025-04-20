
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStudents = (classId?: string) => {
  return useQuery({
    queryKey: ["students", classId],
    enabled: !!classId,
    queryFn: async () => {
      if (!classId) return [];
      
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("class_id", classId);
      
      if (error) throw error;
      
      return data.map(student => ({
        id: student.id,
        name: student.name,
        rollNumber: student.roll_number,
        present: true // Default value when loading students
      }));
    }
  });
};
