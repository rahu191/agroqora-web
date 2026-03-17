'use server';
/**
 * @fileOverview A plant disease diagnosis AI agent.
 *
 * - plantDiseaseDiagnosis - A function that handles the plant disease diagnosis process.
 * - PlantDiseaseDiagnosisInput - The input type for the plantDiseaseDiagnosis function.
 * - PlantDiseaseDiagnosisOutput - The return type for the plantDiseaseDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const PlantDiseaseDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('Optional additional details about the plant or symptoms.'),
});
export type PlantDiseaseDiagnosisInput = z.infer<
  typeof PlantDiseaseDiagnosisInputSchema
>;

const PlantDiseaseDiagnosisOutputSchema = z.object({
  diagnosis: z.object({
    diseaseName: z.string().describe('The name of the identified disease or pest.'),
    severity: z.enum(['low', 'medium', 'high']).describe('The severity of the disease or pest.'),
    confidence: z
      .enum(['high', 'medium', 'low'])
      .describe('The confidence level of the diagnosis.'),
    description: z.string().describe('A detailed description of the diagnosis, including symptoms and potential causes.'),
  }),
  treatmentRecommendations: z.array(z.string()).describe('A list of recommended treatments or actions.'),
});
export type PlantDiseaseDiagnosisOutput = z.infer<
  typeof PlantDiseaseDiagnosisOutputSchema
>;

export async function plantDiseaseDiagnosis(
  input: PlantDiseaseDiagnosisInput
): Promise<PlantDiseaseDiagnosisOutput> {
  return plantDiseaseDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plantDiseaseDiagnosisPrompt',
  input: {schema: PlantDiseaseDiagnosisInputSchema},
  output: {schema: PlantDiseaseDiagnosisOutputSchema},
  prompt: `You are an expert botanist and agricultural assistant specialized in diagnosing plant diseases and pests.

Your task is to analyze the provided image of a plant leaf and any accompanying description to identify potential diseases or pests. Based on your diagnosis, you must provide a detailed description and recommend appropriate treatments.

Here is the information:
Description: {{{description}}}
Photo: {{media url=photoDataUri}}`,
});

const plantDiseaseDiagnosisFlow = ai.defineFlow(
  {
    name: 'plantDiseaseDiagnosisFlow',
    inputSchema: PlantDiseaseDiagnosisInputSchema,
    outputSchema: PlantDiseaseDiagnosisOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      prompt: await prompt(input),
      model: googleAI.model('gemini-1.5-flash'), // Using a multi-modal model for image analysis
      config: {
        temperature: 0.2,
      },
    });
    return output!;
  }
);
