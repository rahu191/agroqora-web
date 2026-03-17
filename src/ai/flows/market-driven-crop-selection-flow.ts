'use server';
/**
 * @fileOverview A Genkit flow that analyzes market and seasonal trends to recommend the most profitable crops for the upcoming season.
 *
 * - marketDrivenCropSelection - A function that handles the crop selection process.
 * - MarketDrivenCropSelectionInput - The input type for the marketDrivenCropSelection function.
 * - MarketDrivenCropSelectionOutput - The return type for the marketDrivenCropSelection function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const MarketDrivenCropSelectionInputSchema = z.object({
  location: z.string().describe('The geographical location of the farm (e.g., "California, USA", "Pune, India"). This is crucial for seasonal trend analysis.'),
  plantingSeason: z.string().describe('The upcoming planting season or period (e.g., "Spring", "Summer", "June-August").'),
  soilType: z.string().optional().describe('The type of soil available (e.g., "loamy", "clay", "sandy").'),
  preferredCropCategories: z.array(z.string()).optional().describe('Optional list of preferred crop categories (e.g., "vegetables", "fruits") to narrow down recommendations.'),
});
export type MarketDrivenCropSelectionInput = z.infer<typeof MarketDrivenCropSelectionInputSchema>;

// Output Schema
const MarketDrivenCropSelectionOutputSchema = z.object({
  recommendedCrops: z.array(
    z.object({
      name: z.string().describe('The common name of the recommended crop.'),
      reason: z.string().describe('A brief explanation of why this crop is recommended, based on market demand, seasonal suitability, and potential profitability.'),
      estimatedProfitability: z.enum(['Very High', 'High', 'Medium', 'Low', 'Very Low']).describe('An estimation of the profitability for this crop in the upcoming season.'),
      suitableForSoil: z.boolean().describe('True if the crop is generally suitable for the specified soil type, false otherwise.'),
      marketDemandTrend: z.enum(['Increasing', 'Stable', 'Decreasing']).describe('The current trend of market demand for this crop.'),
    })
  ).describe('A list of recommended crops with detailed analysis.'),
  generalMarketOutlook: z.string().describe('A general overview of the market outlook for the specified season and location.'),
});
export type MarketDrivenCropSelectionOutput = z.infer<typeof MarketDrivenCropSelectionOutputSchema>;

// Wrapper function for the flow
export async function marketDrivenCropSelection(input: MarketDrivenCropSelectionInput): Promise<MarketDrivenCropSelectionOutput> {
  return marketDrivenCropSelectionFlow(input);
}

// Define the prompt
const prompt = ai.definePrompt({
  name: 'marketDrivenCropSelectionPrompt',
  input: { schema: MarketDrivenCropSelectionInputSchema },
  output: { schema: MarketDrivenCropSelectionOutputSchema },
  prompt: `You are an expert agricultural market analyst and crop planning advisor. Your task is to recommend the most profitable crops for an upcoming planting season, considering market demand, seasonal suitability, and soil conditions.

Analyze the current market and seasonal trends based on the provided location and planting season. If a soil type is provided, ensure recommendations are suitable for that soil. If preferred crop categories are given, prioritize crops within those categories but still suggest the most profitable options.

Provide a list of recommended crops, each with a clear reason for its recommendation, an estimated profitability, its suitability for the given soil type, and its current market demand trend. Also, give a general overview of the market outlook for the specified season and location.

Input Details:
Location: {{{location}}}
Planting Season: {{{plantingSeason}}}
{{#if soilType}}Soil Type: {{{soilType}}}{{/if}}
{{#if preferredCropCategories}}Preferred Crop Categories: {{#each preferredCropCategories}}- {{{this}}}
{{/each}}{{/if}}

Consider the following factors in your analysis:
- Historical price data and future price predictions.
- Consumer demand and dietary trends.
- Seasonal growing conditions and climate suitability for the specified location.
- Input costs and potential yield.
- Any provided soil type and its impact on crop viability.

Your output must strictly adhere to the provided JSON schema. Ensure all fields are populated accurately and comprehensively.`,
});

// Define the flow
const marketDrivenCropSelectionFlow = ai.defineFlow(
  {
    name: 'marketDrivenCropSelectionFlow',
    inputSchema: MarketDrivenCropSelectionInputSchema,
    outputSchema: MarketDrivenCropSelectionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
