'use server';

import {
  explainCodeErrors,
  ExplainCodeErrorsInput,
  ExplainCodeErrorsOutput,
} from '@/ai/flows/explain-code-errors';
import {
  suggestAutomatedFixes,
  SuggestAutomatedFixesInput,
  SuggestAutomatedFixesOutput,
} from '@/ai/flows/suggest-automated-fixes';

export async function getAiExplanation(
  input: ExplainCodeErrorsInput
): Promise<ExplainCodeErrorsOutput> {
  try {
    const result = await explainCodeErrors(input);
    return result;
  } catch (error) {
    console.error('Error in getAiExplanation:', error);
    throw new Error('Failed to get AI explanation.');
  }
}

export async function getAiFix(
  input: SuggestAutomatedFixesInput
): Promise<SuggestAutomatedFixesOutput> {
  try {
    const result = await suggestAutomatedFixes(input);
    return result;
  } catch (error) {
    console.error('Error in getAiFix:', error);
    throw new Error('Failed to get AI fix suggestion.');
  }
}
