'use server';
/**
 * @fileOverview A fertilizer recommendation AI agent.
 *
 * - fertilizerRecommendation - A function that handles the fertilizer recommendation process.
 * - FertilizerRecommendationInput - The input type for the fertilizerRecommendation function.
 * - FertilizerRecommendationOutput - The return type for the fertilizerRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerRecommendationInputSchema = z.object({
  soilPh: z.number().min(0).max(14).describe('The current pH level of the soil.'),
  npk: z
    .object({
      nitrogen: z.number().describe('Nitrogen level in the soil (ppm).'),
      phosphorus: z.number().describe('Phosphorus level in the soil (ppm).'),
      potassium: z.number().describe('Potassium level in the soil (ppm).'),
    })
    .describe('NPK levels in the soil.'),
  soilMoisture: z
    .number()
    .min(0)
    .max(100)
    .describe('Soil moisture content as a percentage (0-100%).'),
  cropType: z.string().describe('The type of crop being grown.'),
});
export type FertilizerRecommendationInput = z.infer<typeof FertilizerRecommendationInputSchema>;

const FertilizerRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('The overall fertilizer recommendation.'),
  fertilizerType: z.string().describe('The recommended type of fertilizer (e.g., Urea, DAP, NPK 10-26-26).'),
  applicationAmount: z.string().describe('The recommended amount of fertilizer to apply (e.g., "50kg per acre", "200g per plant").'),
  justification: z.string().describe('Explanation for the given recommendation based on the input data.'),
});
export type FertilizerRecommendationOutput = z.infer<typeof FertilizerRecommendationOutputSchema>;

export async function fertilizerRecommendation(
  input: FertilizerRecommendationInput
): Promise<FertilizerRecommendationOutput> {
  return fertilizerRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerRecommendationPrompt',
  input: {schema: FertilizerRecommendationInputSchema},
  output: {schema: FertilizerRecommendationOutputSchema},
  prompt: `You are an expert agronomist specializing in soil health and crop nutrition. Your goal is to provide precise fertilizer recommendations based on the provided soil data and crop type.

Analyze the following information to determine the optimal fertilizer type and application amount, and provide a clear justification.

Soil pH: {{{soilPh}}}
NPK Levels:
  - Nitrogen (N): {{{npk.nitrogen}}} ppm
  - Phosphorus (P): {{{npk.phosphorus}}} ppm
  - Potassium (K): {{{npk.potassium}}} ppm
Soil Moisture: {{{soilMoisture}}}%
Crop Type: {{{cropType}}}

Consider the typical nutrient requirements for '{{{cropType}}}' at a general growth stage. If the NPK levels are particularly low or high, suggest appropriate adjustments. If soil pH is outside the optimal range for '{{{cropType}}}', mention its impact.

Provide a specific fertilizer type (e.g., Urea, DAP, NPK 10-26-26) and a clear application amount. Also, include a brief justification for your recommendation.`,
});

const fertilizerRecommendationFlow = ai.defineFlow(
  {
    name: 'fertilizerRecommendationFlow',
    inputSchema: FertilizerRecommendationInputSchema,
    outputSchema: FertilizerRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
