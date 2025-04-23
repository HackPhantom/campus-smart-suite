
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface AnalysisSectionProps {
  analysis: string;
  isAnalyzing: boolean;
  onGenerate: () => void;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({ analysis, isAnalyzing, onGenerate }) => (
  <div className="py-4">
    {analysis ? (
      <Card>
        <CardContent className="pt-4">
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium mb-2">AI Attendance Analysis</h3>
            <div className="whitespace-pre-line text-sm">
              {analysis}
            </div>
          </div>
        </CardContent>
      </Card>
    ) : (
      <div className="text-center py-10 text-muted-foreground">
        {isAnalyzing ? (
          <div className="flex flex-col items-center">
            <div className="animate-pulse h-6 w-6 mb-2">
              <Brain className="h-6 w-6" />
            </div>
            <p>Analyzing attendance data...</p>
          </div>
        ) : (
          <div>
            <p>Click &quot;AI Analysis&quot; to get intelligent insights about this attendance session.</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={onGenerate}
              disabled={isAnalyzing}
            >
              <Brain className="h-4 w-4 mr-2" />
              Generate Analysis
            </Button>
          </div>
        )}
      </div>
    )}
  </div>
);
