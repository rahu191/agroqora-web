"use server";

import { z } from "zod";

export interface LandingContactState {
  formState: 'initial' | 'pending' | 'success' | 'error';
  error: string | null;
}

const LandingContactSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required." }),
  companyName: z.string().min(1, { message: "Company Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendLandingContactMessage(
  prevState: LandingContactState,
  formData: FormData
): Promise<LandingContactState> {
  const validatedFields = LandingContactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      formState: 'error',
      error: firstError ?? "Validation failed. Please check your inputs.",
    };
  }

  // In a real application, you would send an email here.
  // For this prototype, we'll just simulate a successful submission.
  try {
    console.log("Simulating email sending with data:", validatedFields.data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    return {
      formState: 'success',
      error: null,
    };
  } catch (e: any) {
    return {
      formState: 'error',
      error: "Something went wrong. Please try again later.",
    };
  }
}
