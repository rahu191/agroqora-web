'use server';
/**
 * @fileOverview A Genkit flow for recommending optimized crop sowing and harvest schedules.
 *
 * - cropPlanningRecommendation - A function that handles the crop planning recommendation process.
 * - CropPlanningRecommendationInput - The input type for the cropPlanningRecommendation function.
 * - CropPlanningRecommendationOutput - The return type for the cropPlanningRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema
const CropPlanningRecommendationInputSchema = z.object({
  cropType: z.string().describe('The type of crop for which to suggest a plan (e.g., "Wheat", "Rice").'),
  location: z.string().describe('The geographical location of the farm (e.g., "Punjab, India").'),
  historicalYieldsData: z.string().describe('Historical yield data for the specified crop and location, ideally in a structured format like JSON or CSV. Example: "[{\"year\": 2020, \"yield_per_acre\": 500}, {\"year\": 2021, \"yield_per_acre\": 550}]"'),
  weatherForecastData: z.string().describe('Weather forecast data for the upcoming season, including temperature, rainfall, and sunlight hours. Example: "{ \"next_3_months\": { \"avg_temp_c\": 25, \"total_rainfall_mm\": 150, \"avg_sunlight_hours\": 8 } }"'),
  marketTrendsData: z.string().describe('Current and forecasted market trends and prices for the crop. Example: "{ \"current_price_per_kg\": 20, \"forecasted_price_increase_pct\": 10, \"demand_trend\": \"high\" }"')
});
export type CropPlanningRecommendationInput = z.infer<typeof CropPlanningRecommendationInputSchema>;

// Define the output schema
const CropPlanningRecommendationOutputSchema = z.object({
  sowingSchedule: z.string().describe('Recommended optimal period for sowing the crop (e.g., "Mid-October to Early November").'),
  harvestSchedule: z.string().describe('Recommended optimal period for harvesting the crop (e.g., "Late March to Mid-April").'),
  reasoning: z.string().describe('Detailed explanation of the recommendations based on historical yields, weather forecasts, and market trends.'),
  profitabilityEstimate: z.string().describe('An estimated outlook on the potential profitability of the crop based on the plan (e.g., "High potential due to favorable market prices and optimal weather conditions.").')
});
export type CropPlanningRecommendationOutput = z.infer<typeof CropPlanningRecommendationOutputSchema>;

export async function cropPlanningRecommendation(input: CropPlanningRecommendationInput): Promise<CropPlanningRecommendationOutput> {
  return cropPlanningRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropPlanningRecommendationPrompt',
  input: { schema: CropPlanningRecommendationInputSchema },
  output: { schema: CropPlanningRecommendationOutputSchema },
  prompt: `You are an expert agricultural planning agent. Your task is to analyze various data points to recommend an optimal sowing and harvest schedule for a specific crop, maximizing productivity and profitability.\n\nConsider the following information:\n\nCrop Type: {{{cropType}}}\nLocation: {{{location}}}\n\nHistorical Yields Data:\n{{{historicalYieldsData}}}\n\nWeather Forecast Data:\n{{{weatherForecastData}}}\n\nMarket Trends Data:\n{{{marketTrendsData}}}\n\nBased on this data, provide the most appropriate sowing and harvest schedules, a detailed reasoning for your recommendations, and an estimated profitability outlook. Your response MUST be in the specified JSON format.`
});

const cropPlanningRecommendationFlow = ai.defineFlow(
  {
    name: 'cropPlanningRecommendationFlow',
    inputSchema: CropPlanningRecommendationInputSchema,
    outputSchema: CropPlanningRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
