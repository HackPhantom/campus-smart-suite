
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, QrCode, Search, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const classes = [
  {
    id: 'cls-101',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    time: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
    location: 'Lecture Hall 101',
    students: 87,
    attendanceRate: '92%',
  },
  {
    id: 'cls-203',
    name: 'Data Structures and Algorithms',
    code: 'CS203',
    time: 'Tue, Thu • 1:00 PM - 3:00 PM',
    location: 'Computer Lab 203',
    students: 42,
    attendanceRate: '88%',
  },
  {
    id: 'cls-305',
    name: 'Database Management Systems',
    code: 'CS305',
    time: 'Mon, Wed • 3:30 PM - 5:00 PM',
    location: 'Room 305',
    students: 38,
    attendanceRate: '85%',
  },
];

const attendanceRecords = [
  {
    date: 'May 10, 2023',
    class: 'CS101 - Introduction to Computer Science',
    present: 82,
    absent: 5,
    rate: '94%',
  },
  {
    date: 'May 8, 2023',
    class: 'CS101 - Introduction to Computer Science',
    present: 80,
    absent: 7,
    rate: '92%',
  },
  {
    date: 'May 5, 2023',
    class: 'CS101 - Introduction to Computer Science',
    present: 79,
    absent: 8,
    rate: '91%',
  },
  {
    date: 'May 3, 2023',
    class: 'CS101 - Introduction to Computer Science',
    present: 85,
    absent: 2,
    rate: '98%',
  },
];

export default function Attendance() {
  return (
    <PageLayout title="Attendance">
      <Tabs defaultValue="classes">
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
                />
              </div>

              <div className="space-y-4">
                {classes.map((cls) => (
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
                          <Button variant="outline" size="sm">History</Button>
                          <Button size="sm">Take Attendance</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option>CS101 - Introduction to Computer Science</option>
                    <option>CS203 - Data Structures and Algorithms</option>
                    <option>CS305 - Database Management Systems</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">From</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">To</label>
                  <Input type="date" />
                </div>
              </div>

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
                    {attendanceRecords.map((record, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
