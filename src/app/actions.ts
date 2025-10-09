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
import { employeeAssistantFlow } from '@/ai/flows/employee-assistant';
import { generateJobAnnouncement, JobDetails } from '@/ai/flows/generate-job-announcement';


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

export async function getEmployeeAssistantResponse(prompt: string): Promise<string> {
    try {
        const result = await employeeAssistantFlow(prompt);
        return result;
    } catch (error) {
        console.error('Error in employeeAssistantFlow:', error);
        throw new Error('Failed to get response from AI assistant.');
    }
}

export async function getJobAnnouncement(details: JobDetails): Promise<string> {
  try {
    const result = await generateJobAnnouncement(details);
    return result.announcement;
  } catch (error) {
    console.error('Error in getJobAnnouncement:', error);
    throw new Error('Failed to generate job announcement.');
  }
}
