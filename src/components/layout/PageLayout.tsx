
import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto p-6 bg-muted/30 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
