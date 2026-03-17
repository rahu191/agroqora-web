"use server";

import type { FertilizerRecommendationOutput } from "@/ai/flows/fertilizer-recommendation-flow";
import { z } from "zod";

export interface FertilizerState {
  formState: 'initial' | 'pending' | 'success' | 'error';
  result: FertilizerRecommendationOutput | null;
  error: string | null;
  fieldErrors?: { [key: string]: string[] | undefined };
}

const FertilizerSchema = z.object({
  soilPh: z.coerce.number().min(0).max(14),
  nitrogen: z.coerce.number().min(0),
  phosphorus: z.coerce.number().min(0),
  potassium: z.coerce.number().min(0),
  soilMoisture: z.coerce.number().min(0).max(100),
  cropType: z.string().min(1, "Crop type is required."),
});

export async function getFertilizerRecommendation(
  prevState: FertilizerState,
  formData: FormData
): Promise<FertilizerState> {
  const validatedFields = FertilizerSchema.safeParse({
    soilPh: formData.get("soilPh"),
    nitrogen: formData.get("nitrogen"),
    phosphorus: formData.get("phosphorus"),
    potassium: formData.get("potassium"),
    soilMoisture: formData.get("soilMoisture"),
    cropType: formData.get("cropType"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      formState: 'error',
      error: "Please correct the errors in the form.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { fertilizerRecommendation } = await import("@/ai/flows/fertilizer-recommendation-flow");
    const { nitrogen, phosphorus, potassium, ...rest } = validatedFields.data;
    const result = await fertilizerRecommendation({
      ...rest,
      npk: { nitrogen, phosphorus, potassium },
    });
    return {
      formState: 'success',
      result: result,
      error: null,
      fieldErrors: {},
    };
  } catch (e: any) {
    return {
      ...prevState,
      formState: 'error',
      error: e.message || "An unknown error occurred.",
      fieldErrors: {},
    };
  }
}
