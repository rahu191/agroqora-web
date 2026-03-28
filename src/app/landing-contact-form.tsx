"use client";

import { useFormState } from "react-dom";
import { sendLandingContactMessage, type LandingContactState } from "./landing-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState: LandingContactState = {
  formState: 'initial',
  error: null,
};

export default function LandingContactForm() {
  const [state, formAction] = useFormState(sendLandingContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.formState === 'success') {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      formRef.current?.reset();
    } else if (state.formState === 'error' && state.error) {
       toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required disabled={state.formState === 'pending'} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name / Farm Name</Label>
          <Input id="companyName" name="companyName" required disabled={state.formState === 'pending'} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" required disabled={state.formState === 'pending'} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiryType">Inquiry Type</Label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          disabled={state.formState === 'pending'}
          className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
          defaultValue=""
        >
          <option value="" disabled>Select...</option>
          <option value="Partnership">Partnership</option>
          <option value="Tech Demo">Tech Demo</option>
          <option value="Media">Media</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea id="message" name="message" required rows={5} disabled={state.formState === 'pending'} />
      </div>
      <Button type="submit" className="w-full !mt-6" size="lg" disabled={state.formState === 'pending'}>
        {state.formState === 'pending' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
