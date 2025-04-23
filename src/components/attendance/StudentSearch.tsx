
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({ searchQuery, setSearchQuery }) => (
  <div className="relative w-64">
    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Search students..."
      className="pl-8"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);
