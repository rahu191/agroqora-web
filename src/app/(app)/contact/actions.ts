"use server";

import { z } from "zod";

export interface ContactState {
  formState: 'initial' | 'pending' | 'success' | 'error';
  error: string | null;
}

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendContactMessage(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      formState: 'error',
      error: firstError ?? "Validation failed. Please check your inputs.",
    };
  }

  // In a real application, you would send an email here using a service like Resend, SendGrid, or Nodemailer.
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
      error: "Something went wrong on our end. Please try again later.",
    };
  }
}
