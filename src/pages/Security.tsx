
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function Security() {
  return (
    <PageLayout title="Security">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle>Campus Security</CardTitle>
            </div>
            <CardDescription>
              Monitor and manage campus security systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium text-muted-foreground">
                Security dashboard coming soon
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This section will provide security monitoring, alerts, and management tools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
