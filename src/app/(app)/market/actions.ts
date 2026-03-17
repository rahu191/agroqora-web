"use server";

import type { MarketDrivenCropSelectionOutput } from "@/ai/flows/market-driven-crop-selection-flow";
import { z } from "zod";

export interface MarketState {
  formState: 'initial' | 'pending' | 'success' | 'error';
  result: MarketDrivenCropSelectionOutput | null;
  error: string | null;
}

const MarketSchema = z.object({
  location: z.string().min(1, { message: "Location is required." }),
  plantingSeason: z.string().min(1, { message: "Planting season is required." }),
  soilType: z.string().optional(),
  preferredCropCategories: z.preprocess((val) => {
    if (typeof val === 'string' && val) return val.split(',').map(s => s.trim());
    return [];
  }, z.array(z.string()).optional()),
});

export async function getMarketTrends(
  prevState: MarketState,
  formData: FormData
): Promise<MarketState> {
  const validatedFields = MarketSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      ...prevState,
      formState: 'error',
      error: firstError ?? "Validation failed.",
    };
  }

  try {
    const { marketDrivenCropSelection } = await import("@/ai/flows/market-driven-crop-selection-flow");
    const result = await marketDrivenCropSelection(validatedFields.data);
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
