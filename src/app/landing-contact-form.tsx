"use client";

import { useFormState } from "react-dom";
import { sendLandingContactMessage, type LandingContactState } from "./landing-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
        <Select name="inquiryType" required disabled={state.formState === 'pending'}>
            <SelectTrigger id="inquiryType">
                <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Partnership">Partnership</SelectItem>
                <SelectItem value="Tech Demo">Tech Demo</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
        </Select>
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
