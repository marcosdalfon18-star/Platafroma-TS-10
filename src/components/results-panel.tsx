'use client';

import type { ExplainCodeErrorsOutput } from '@/ai/flows/explain-code-errors';
import type { SuggestAutomatedFixesOutput } from '@/ai/flows/suggest-automated-fixes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface ResultsPanelProps {
  explanation: ExplainCodeErrorsOutput | null;
  fix: SuggestAutomatedFixesOutput | null;
  isLoading: boolean;
  onApplyFix: (fixedCode: string) => void;
  error: string | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  explanation,
  fix,
  isLoading,
  onApplyFix,
  error,
}) => {
  const renderLoadingState = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="p-4 border rounded-lg">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );

  const renderInitialState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed rounded-lg p-8">
      <Lightbulb className="w-12 h-12 mb-4 text-muted-foreground" />
      <h3 className="text-xl font-semibold">AI Analysis Results</h3>
      <p className="text-muted-foreground">
        Click "Analyze & Correct" to see AI-powered explanations and fixes for your code.
      </p>
    </div>
  );

  if (isLoading) {
    return <Card className="p-6">{renderLoadingState()}</Card>;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    );
  }
  
  if (!explanation && !fix) {
    return renderInitialState();
  }

  return (
    <Card className="h-full">
        <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Review the AI-generated feedback and apply fixes.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="explanation" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="explanation">AI Explanation</TabsTrigger>
                <TabsTrigger value="fix">Automated Fix</TabsTrigger>
            </TabsList>
            <TabsContent value="explanation" className="mt-4">
                {explanation ? (
                <div className="space-y-4">
                    <p className="text-sm">{explanation.explanation}</p>
                    <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>View Detailed Suggestions</AccordionTrigger>
                        <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            {explanation.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                </div>
                ) : <p className="text-sm text-muted-foreground">No explanation available.</p>}
            </TabsContent>
            <TabsContent value="fix" className="mt-4">
                {fix ? (
                <div className="space-y-4">
                    <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Automated Fix Applied</AlertTitle>
                        <AlertDescription>{fix.explanation}</AlertDescription>
                    </Alert>
                    <div className="relative">
                        <pre className="p-4 bg-muted rounded-md text-muted-foreground overflow-x-auto text-sm font-code">
                            <code>{fix.fixedCode}</code>
                        </pre>
                    </div>
                    <Button onClick={() => onApplyFix(fix.fixedCode)} className="w-full">
                        Apply This Fix
                    </Button>
                </div>
                ) : <p className="text-sm text-muted-foreground">No automated fix available.</p>}
            </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
};

export default ResultsPanel;
