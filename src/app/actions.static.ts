// Server Actions disabled for static export
// This file contains server-side functions that are not compatible with static export

// Tipos temporales
export interface JobDetails {
  title: string;
  description: string;
  requirements: string[];
  department: string;
  location: string;
  salary: string;
  experienceLevel: string;
  employmentType: string;
}

export interface JobAnnouncement {
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationInstructions: string;
  companyDescription: string;
}

// All server actions are commented out for static export compatibility
// Uncomment when using with a server runtime

/*
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

// Server actions would go here...
*/

// Client-side alternatives for static deployment
export const clientSideJobCreation = {
  createMockAnnouncement: (jobDetails: Partial<JobDetails>): JobAnnouncement => ({
    title: jobDetails.title || 'Posición Disponible',
    description: jobDetails.description || 'Descripción del puesto de trabajo.',
    requirements: jobDetails.requirements || ['Experiencia relevante', 'Habilidades técnicas'],
    benefits: ['Salario competitivo', 'Beneficios de salud', 'Desarrollo profesional'],
    applicationInstructions: 'Envía tu CV a recursos.humanos@empresa.com',
    companyDescription: 'Empresa líder en su sector con oportunidades de crecimiento.'
  })
};

export default clientSideJobCreation;