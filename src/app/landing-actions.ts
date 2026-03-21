"use server";

import { z } from "zod";
import { google } from "googleapis";
import nodemailer from "nodemailer";

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

  try {
    // 1. Authenticate with Google Sheets API
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("Missing Google API credentials in environment variables.");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Append row to 'contact-enquiries' sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'contact-enquiries!A:E', // Make sure this matches your sheet tab name
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            validatedFields.data.fullName,
            validatedFields.data.email,
            `${validatedFields.data.companyName} | ${validatedFields.data.inquiryType}`,
            validatedFields.data.message
          ]
        ]
      }
    });

    // 3. Send Email Notification to User via Nodemailer
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const htmlBody = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; line-height: 1.6; padding: 20px;">
          <h2 style="color: #2E7D32;">Thank you for getting in touch!</h2>
          <p>Hi <strong>${validatedFields.data.fullName}</strong>,</p>
          <p>Thank you for reaching out to us. We have received your inquiry and our team will get back to you as soon as possible.</p>
          
          <div style="background-color: #fbfbfb; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h4 style="margin-top: 0; border-bottom: 2px solid #2E7D32; padding-bottom: 8px; color: #2E7D32;">Your Submission Details</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 140px;"><strong>Name</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${validatedFields.data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${validatedFields.data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company / Farm</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${validatedFields.data.companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Inquiry Type</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${validatedFields.data.inquiryType}</td>
              </tr>
            </table>

            <h4 style="margin-bottom: 8px; margin-top: 20px; color: #444;">Message:</h4>
            <div style="background-color: #fff; padding: 15px; border-radius: 6px; border-left: 4px solid #2E7D32;">
              <p style="margin: 0; font-style: italic; color: #555; white-space: pre-wrap;">${validatedFields.data.message}</p>
            </div>
          </div>
          
          <p>Best regards,<br><strong>The Aqroqora Team</strong></p>
          
          <!-- Footer with Logo -->
          <hr style="border: none; border-top: 1px solid #e1e8ed; margin: 40px 0 20px 0;">
          <div style="text-align: center;">
            <img src="https://www.agroqora.com/_next/image?url=%2FAgroqora_logo.png&w=64&q=75" alt="Aqroqora Logo" style="max-width: 64px; height: auto; display: block; margin: 0 auto;">
            <p style="font-size: 12px; color: #888888; margin-top: 15px;">
              &copy; ${new Date().getFullYear()} Aqroqora. All rights reserved.
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Aqroqora Team" <aqroqora@gmail.com>`,
        to: "aqroqora@gmail.com",
        cc: validatedFields.data.email,
        bcc: ["rahul.patle@agroqora.com", "kiran.fegade@agroqora.com"],
        replyTo: validatedFields.data.email,
        subject: "Thank you for getting in touch with Aqroqora!",
        html: htmlBody,
      });
    }

    return {
      formState: 'success',
      error: null,
    };
  } catch (e: any) {
    console.error("Form Submission Error:", e);
    return {
      formState: 'error',
      error: "Something went wrong. Please check console if building locally.",
    };
  }
}
