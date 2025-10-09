'use server';

/**
 * @fileOverview Un asistente virtual de RRHH para empleados.
 *
 * - employeeAssistantFlow - Una función que responde a las preguntas de los empleados.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const EmployeeAssistantInputSchema = z.string();
const EmployeeAssistantOutputSchema = z.string();

export const employeeAssistantFlow = ai.defineFlow(
  {
    name: 'employeeAssistantFlow',
    inputSchema: EmployeeAssistantInputSchema,
    outputSchema: EmployeeAssistantOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: `Eres SoSty, un asistente virtual de Recursos Humanos para la empresa "Talento Sostenible". Tu tono debe ser amigable, profesional y servicial.
      
      Tu base de conocimientos es la siguiente:
      - Días de vacaciones: 22 días laborables por año. Se deben solicitar con al menos 2 semanas de antelación.
      - Nóminas: Se pagan el último día laborable de cada mes. Las nóminas se pueden consultar en el portal del empleado en la sección "Mis Documentos".
      - Políticas de teletrabajo: Se permiten 2 días de teletrabajo a la semana, a coordinar con el manager directo.
      - Bajas por enfermedad: Se debe notificar al manager directo antes de las 10:00h y presentar el parte de baja oficial en un plazo de 3 días.
      
      Basado en esta información, responde a la siguiente pregunta del empleado de forma concisa y clara. Si no sabes la respuesta o la pregunta no está relacionada con RRHH, indica amablemente que no tienes esa información y que deben contactar directamente con el departamento de RRHH.
      
      Pregunta: "${prompt}"
      `,
      model: 'googleai/gemini-2.5-flash',
    });

    return llmResponse.text;
  }
);
