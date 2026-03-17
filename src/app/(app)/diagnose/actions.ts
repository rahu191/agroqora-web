"use server";

import type { PlantDiseaseDiagnosisOutput } from "@/ai/flows/plant-disease-diagnosis-flow";
import { z } from "zod";

export interface DiagnoseState {
  formState: 'initial' | 'pending' | 'success' | 'error';
  result: PlantDiseaseDiagnosisOutput | null;
  error: string | null;
}

const DiagnoseSchema = z.object({
  photoDataUri: z.string().min(1, { message: "Please upload an image." }),
});

export async function diagnosePlant(
  prevState: DiagnoseState,
  formData: FormData
): Promise<DiagnoseState> {
  
  const validatedFields = DiagnoseSchema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      formState: 'error',
      error: validatedFields.error.flatten().fieldErrors.photoDataUri?.[0] ?? "Validation failed.",
    };
  }

  try {
    const { plantDiseaseDiagnosis } = await import("@/ai/flows/plant-disease-diagnosis-flow");
    const result = await plantDiseaseDiagnosis({
      photoDataUri: validatedFields.data.photoDataUri,
    });
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
