"use server";

import type { CropPlanningRecommendationOutput } from "@/ai/flows/crop-planning-recommendation-flow";
import { z } from "zod";

export interface PlanningState {
  formState: 'initial' | 'pending' | 'success' | 'error';
  result: CropPlanningRecommendationOutput | null;
  error: string | null;
}

const PlanningSchema = z.object({
  cropType: z.string().min(1, { message: "Crop type is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  historicalYieldsData: z.string().min(1, { message: "Historical data is required." }),
  weatherForecastData: z.string().min(1, { message: "Weather forecast is required." }),
  marketTrendsData: z.string().min(1, { message: "Market trends are required." }),
});

export async function getCropPlan(
  prevState: PlanningState,
  formData: FormData
): Promise<PlanningState> {
  const validatedFields = PlanningSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      ...prevState,
      formState: 'error',
      error: firstError ?? "Validation failed.",
    };
  }

  try {
    const { cropPlanningRecommendation } = await import("@/ai/flows/crop-planning-recommendation-flow");
    const result = await cropPlanningRecommendation(validatedFields.data);
    return {
      formState: 'success',
      result: result,
      error: null,
    };
  } catch (e: any) {
    return {
      ...prevState,
      formState: 'error',
      error: e.message || "An unknown error occurred.",
    };
  }
}
