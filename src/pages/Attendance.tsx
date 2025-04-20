
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, QrCode, Search, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { AttendanceProvider, useAttendance } from '@/contexts/AttendanceContext';
import { AttendanceDialog } from '@/components/attendance/AttendanceDialog';

const AttendanceContent = () => {
  const { 
    classes, 
    attendanceRecords,
    takeAttendance,
    viewAttendanceHistory
  } = useAttendance();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [filteredRecords, setFilteredRecords] = useState(attendanceRecords);
  const [activeTab, setActiveTab] = useState<string>('classes');

  // Handle taking attendance for a class
  const handleTakeAttendance = (classId: string) => {
    takeAttendance(classId);
  };

  // Handle viewing attendance history for a class
  const handleViewHistory = async (classId: string) => {
    const history = await viewAttendanceHistory(classId);
    setFilteredRecords(history);
    setActiveTab('reports');
  };

  // Filter classes based on search query
  const filteredClasses = searchQuery
    ? classes.filter(cls => 
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : classes;

  // Handle report filtering
  const handleFilterReports = () => {
    let filtered = [...attendanceRecords];
    
    if (selectedClassFilter) {
      filtered = filtered.filter(record => 
        record.class.includes(selectedClassFilter)
      );
    }
    
    if (fromDate) {
      const fromDateTime = new Date(fromDate).getTime();
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date).getTime();
        return recordDate >= fromDateTime;
      });
    }
    
    if (toDate) {
      const toDateTime = new Date(toDate).getTime();
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date).getTime();
        return recordDate <= toDateTime;
      });
    }
    
    setFilteredRecords(filtered);
  };

  return (
    <>
      <Tabs defaultValue="classes" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Class Attendance</CardTitle>
                  <CardDescription>Track attendance for your classes</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                  <Button>
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by class name or code..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <div key={cls.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{cls.name}</h3>
                            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full font-medium">
                              {cls.code}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{cls.time}</p>
                          <p className="text-sm text-muted-foreground">{cls.location}</p>
                        </div>
                        <div className="flex flex-col mt-3 lg:mt-0 lg:items-end">
                          <div className="text-sm">
                            <span className="font-medium">{cls.students}</span> students
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{cls.attendanceRate}</span> attendance rate
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewHistory(cls.id)}
                            >
                              History
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleTakeAttendance(cls.id)}
                            >
                              Take Attendance
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No classes matching your search criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Attendance Reports</CardTitle>
                  <CardDescription>View and export attendance data</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Class</label>
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                  >
                    <option value="">All Classes</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.code}>
                        {cls.code} - {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">From</label>
                  <Input 
                    type="date" 
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">To</label>
                  <Input 
                    type="date" 
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="mb-6 w-full md:w-auto"
                onClick={handleFilterReports}
              >
                Apply Filters
              </Button>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Class</th>
                      <th className="py-3 px-4 text-left font-medium">Present</th>
                      <th className="py-3 px-4 text-left font-medium">Absent</th>
                      <th className="py-3 px-4 text-left font-medium">Rate</th>
                      <th className="py-3 px-4 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-3 px-4">{record.date}</td>
                          <td className="py-3 px-4">{record.class}</td>
                          <td className="py-3 px-4">{record.present}</td>
                          <td className="py-3 px-4">{record.absent}</td>
                          <td className="py-3 px-4 font-medium">{record.rate}</td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">Details</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-muted-foreground">
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Attendance Dialog */}
      <AttendanceDialog />
    </>
  );
};

export default function Attendance() {
  return (
    <PageLayout title="Attendance">
      <AttendanceProvider>
        <AttendanceContent />
      </AttendanceProvider>
    </PageLayout>
  );
}
