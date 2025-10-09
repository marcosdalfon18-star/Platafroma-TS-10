'use server';
/**
 * @fileOverview Flujo de IA para generar anuncios de empleo atractivos.
 *
 * - generateJobAnnouncement - Una función que crea un anuncio de empleo basado en los detalles del puesto.
 * - JobDetails - El tipo de entrada para la función.
 * - JobAnnouncement - El tipo de retorno para la función.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const JobDetailsSchema = z.object({
  title: z.string().describe('El título del puesto de trabajo.'),
  description: z.string().optional().describe('Una breve descripción de las responsabilidades y requisitos del puesto.'),
});
export type JobDetails = z.infer<typeof JobDetailsSchema>;

export const JobAnnouncementSchema = z.object({
  announcement: z.string().describe('El texto completo del anuncio de empleo generado.'),
});
export type JobAnnouncement = z.infer<typeof JobAnnouncementSchema>;

export async function generateJobAnnouncement(input: JobDetails): Promise<JobAnnouncement> {
  return generateJobAnnouncementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJobAnnouncementPrompt',
  input: { schema: JobDetailsSchema },
  output: { schema: JobAnnouncementSchema },
  prompt: `
    Eres un experto en Recursos Humanos y redacción de anuncios de empleo para una consultora llamada "Talento Sostenible".
    Tu tarea es crear un anuncio de empleo atractivo, profesional y claro basado en los detalles del puesto proporcionados.

    El anuncio debe tener la siguiente estructura:
    1.  **Título del Puesto:** Claro y conciso.
    2.  **Introducción:** Un párrafo breve que describa la oportunidad y la empresa.
    3.  **Responsabilidades Principales:** Una lista de las tareas clave del puesto.
    4.  **Requisitos:** Una lista de las habilidades y experiencia necesarias.
    5.  **Qué Ofrecemos:** Una lista de los beneficios y ventajas de trabajar en la empresa.
    6.  **Cierre:** Un llamado a la acción para que los candidatos apliquen.

    Utiliza un tono positivo y profesional. Destaca la cultura de la empresa como innovadora y centrada en las personas.

    Detalles del Puesto:
    - Título: {{{title}}}
    - Descripción/Requisitos: {{{description}}}

    Genera el anuncio completo a continuación.
  `,
});

const generateJobAnnouncementFlow = ai.defineFlow(
  {
    name: 'generateJobAnnouncementFlow',
    inputSchema: JobDetailsSchema,
    outputSchema: JobAnnouncementSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
