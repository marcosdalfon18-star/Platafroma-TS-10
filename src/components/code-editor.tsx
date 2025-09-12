'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Upload, Wand2, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onAnalyze, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard!',
      description: 'The code has been copied successfully.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setCode(typeof text === 'string' ? text : '');
      };
      reader.readAsText(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Your Code</CardTitle>
        <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={triggerFileSelect}>
                            <Upload className="h-4 w-4" />
                            <span className="sr-only">Upload File</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Upload File</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy Code</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copy Code</p>
                    </TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleDownload}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Code</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Download Code</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".js,.jsx,.ts,.tsx,.html,.css,.json"
            />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here or upload a file..."
          className="flex-1 font-code text-sm resize-none"
          style={{ minHeight: '400px' }}
        />
        <Button onClick={onAnalyze} disabled={isAnalyzing} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isAnalyzing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Analyze & Correct
        </Button>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
