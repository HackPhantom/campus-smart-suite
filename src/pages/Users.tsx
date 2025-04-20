
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon, UserPlus, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const users = [
  {
    id: 'usr-001',
    name: 'John Smith',
    email: 'john.smith@example.edu',
    role: 'Administrator',
    department: 'IT Services',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    id: 'usr-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.edu',
    role: 'Faculty',
    department: 'Computer Science',
    status: 'Active',
    lastLogin: '1 day ago',
  },
  {
    id: 'usr-003',
    name: 'Michael Chen',
    email: 'michael.chen@example.edu',
    role: 'Staff',
    department: 'Facilities Management',
    status: 'Active',
    lastLogin: '3 hours ago',
  },
  {
    id: 'usr-004',
    name: 'Emily Taylor',
    email: 'emily.taylor@example.edu',
    role: 'Faculty',
    department: 'Physics',
    status: 'Inactive',
    lastLogin: '2 weeks ago',
  },
  {
    id: 'usr-005',
    name: 'David Wilson',
    email: 'david.wilson@example.edu',
    role: 'Student',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '5 hours ago',
  },
  {
    id: 'usr-006',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@example.edu',
    role: 'Staff',
    department: 'Administration',
    status: 'Active',
    lastLogin: '1 hour ago',
  },
];

const groups = [
  {
    id: 'grp-001',
    name: 'IT Administrators',
    members: 8,
    description: 'IT staff with administrator privileges',
  },
  {
    id: 'grp-002',
    name: 'Facilities Management',
    members: 15,
    description: 'Staff responsible for campus facilities',
  },
  {
    id: 'grp-003',
    name: 'Computer Science Faculty',
    members: 12,
    description: 'Faculty members of the CS department',
  },
  {
    id: 'grp-004',
    name: 'Engineering Students',
    members: 256,
    description: 'Students enrolled in engineering programs',
  },
];

export default function Users() {
  return (
    <PageLayout title="User Management">
      <Tabs defaultValue="users">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users by name, email, or department..."
                  className="pl-8"
                />
              </div>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Email</th>
                      <th className="py-3 px-4 text-left font-medium">Role</th>
                      <th className="py-3 px-4 text-left font-medium">Department</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Last Login</th>
                      <th className="py-3 px-4 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.role}</td>
                        <td className="py-3 px-4">{user.department}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Groups</CardTitle>
                  <CardDescription>Manage user groups and permissions</CardDescription>
                </div>
                <Button variant="outline">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.map((group) => (
                  <div key={group.id} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                      </div>
                      <div className="flex items-center mt-3 lg:mt-0">
                        <span className="text-sm bg-muted py-1 px-2 rounded-md mr-4">
                          {group.members} members
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Members</Button>
                          <Button variant="outline" size="sm">Permissions</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
