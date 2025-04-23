
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users as UsersIcon } from 'lucide-react';

export default function Users() {
  return (
    <PageLayout title="Users">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary" />
              <CardTitle>Users Management</CardTitle>
            </div>
            <CardDescription>
              View and manage campus users and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium text-muted-foreground">
                User management module coming soon
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This section will allow administrators to manage users, roles, and permissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
