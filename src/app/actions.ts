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
// import { generateJobAnnouncement, JobDetails, JobAnnouncement } from '@/ai/flows/generate-job-announcement'; // Temporalmente comentado

// Tipos temporales
export interface JobDetails {
  title: string;
  description: string;
  requirements: string[];
  department: string;
  location: string;
  salary?: string;
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

// Función temporal para generar anuncios de trabajo
export async function createJobAnnouncement(
  prevState: JobAnnouncement | string | null,
  formData: FormData,
): Promise<JobAnnouncement | string> {
  try {
    const jobDetails: JobDetails = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      requirements: (formData.get('requirements') as string).split('\n').filter(r => r.trim()),
      department: formData.get('department') as string,
      location: formData.get('location') as string,
      salary: formData.get('salary') as string,
      experienceLevel: formData.get('experienceLevel') as string,
      employmentType: formData.get('employmentType') as string,
    };

    // Simulación de generación de anuncio
    const result = {
      title: `${jobDetails.title} - ${jobDetails.department}`,
      description: `Excelente oportunidad para ${jobDetails.title} con experiencia relevante. Únete a nuestro equipo y desarrolla tu carrera profesional.`,
      content: `🎯 **${jobDetails.title}**\n\n📍 **Ubicación:** ${jobDetails.location}\n🏢 **Departamento:** ${jobDetails.department}\n📈 **Nivel:** ${jobDetails.experienceLevel}\n⏰ **Tipo:** ${jobDetails.employmentType}\n\n**Descripción:**\n${jobDetails.description}\n\n**Requisitos:**\n${jobDetails.requirements.join(', ')}\n\n¡Únete a nuestro equipo!`
    };
    return JSON.stringify(result);
  } catch (error) {
    console.error('Error creating job announcement:', error);
    return 'Error al generar el anuncio de trabajo';
  }
}


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
    // Simulación de generación de anuncio
    const result: JobAnnouncement = {
      title: `${details.title} - ${details.department}`,
      description: `Excelente oportunidad para ${details.title} en ${details.department}. ${details.description}`,
      requirements: details.requirements,
      benefits: ['Salario competitivo', 'Crecimiento profesional', 'Ambiente colaborativo'],
      applicationInstructions: 'Envía tu CV y carta de presentación a través de la plataforma.',
      companyDescription: `Empresa líder en ${details.department} ubicada en ${details.location}.`
    };
    return JSON.stringify(result);
  } catch (error) {
    console.error('Error in getJobAnnouncement:', error);
    throw new Error('Failed to generate job announcement.');
  }
}
