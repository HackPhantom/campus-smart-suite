
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  present: boolean;
}

interface StudentTableProps {
  students: Student[];
  onToggle: (studentId: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, onToggle }) => (
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
        {students.length > 0 ? (
          students.map(student => (
            <tr key={student.id} className="border-b last:border-0">
              <td className="py-3 px-4">{student.rollNumber}</td>
              <td className="py-3 px-4">{student.name}</td>
              <td className="py-3 px-4 text-center">
                <Checkbox
                  checked={student.present}
                  onCheckedChange={() => onToggle(student.id)}
                  className="mx-auto"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="py-4 text-center text-muted-foreground">
              No students found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
