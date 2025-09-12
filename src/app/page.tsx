'use client';

import { useState } from 'react';
import type { ExplainCodeErrorsOutput } from '@/ai/flows/explain-code-errors';
import type { SuggestAutomatedFixesOutput } from '@/ai/flows/suggest-automated-fixes';
import { getAiExplanation, getAiFix } from '@/app/actions';
import CodeEditor from '@/components/code-editor';
import ResultsPanel from '@/components/results-panel';
import { FileCode2 } from 'lucide-react';

const initialCode = `function BuggyCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`;

export default function Home() {
  const [code, setCode] = useState<string>(initialCode);
  const [explanation, setExplanation] = useState<ExplainCodeErrorsOutput | null>(null);
  const [fix, setFix] = useState<SuggestAutomatedFixesOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setExplanation(null);
    setFix(null);

    // In a real app, you would run a linter here.
    // For this demo, we are using mock errors to pass to the AI.
    const mockErrors = `[
      { "line": 2, "message": "'useState' is not defined." },
      { "line": 4, "message": "'useEffect' is not defined." }
    ]`;

    try {
      const [explanationResult, fixResult] = await Promise.all([
        getAiExplanation({ code, errors: mockErrors }),
        getAiFix({ code, errors: mockErrors }),
      ]);
      setExplanation(explanationResult);
      setFix(fixResult);
    } catch (e) {
      setError('Failed to get AI analysis. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-3 p-4 border-b bg-card">
        <FileCode2 className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-xl font-semibold font-headline">Code Corrector</h1>
          <p className="text-sm text-muted-foreground">Your AI-powered pair programmer for clean code.</p>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:gap-8 lg:p-8">
        <CodeEditor
          code={code}
          setCode={setCode}
          onAnalyze={handleAnalyze}
          isAnalyzing={isLoading}
        />
        <ResultsPanel
          explanation={explanation}
          fix={fix}
          isLoading={isLoading}
          onApplyFix={handleApplyFix}
          error={error}
        />
      </main>
    </div>
  );
}
