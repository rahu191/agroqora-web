"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFertilizerRecommendation, type FertilizerState } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Bot, Droplets, Loader2, TestTube2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  soilPh: z.coerce.number().min(0).max(14),
  nitrogen: z.coerce.number().min(0, "Must be positive"),
  phosphorus: z.coerce.number().min(0, "Must be positive"),
  potassium: z.coerce.number().min(0, "Must be positive"),
  soilMoisture: z.coerce.number().min(0).max(100),
  cropType: z.string().min(1, "Crop type is required."),
});

type FormData = z.infer<typeof formSchema>;

const initialState: FertilizerState = {
  formState: 'initial',
  result: null,
  error: null,
};

const FertilizerResult = ({ result }: { result: FertilizerState['result'] }) => {
    if (!result) return null;
    const { recommendation, fertilizerType, applicationAmount, justification } = result;

    return (
        <Card className="mt-6 animate-in fade-in-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TestTube2 className="text-primary"/>
                    Fertilizer Recommendation
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-primary font-bold text-lg">{recommendation}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Fertilizer Type</p>
                        <p className="font-semibold">{fertilizerType}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Application Amount</p>
                        <p className="font-semibold">{applicationAmount}</p>
                    </div>
                </div>

                <div>
                    <p className="font-semibold">Justification</p>
                    <p className="text-muted-foreground text-sm">{justification}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function FertilizerForm() {
  const [state, formAction] = useFormState(getFertilizerRecommendation, initialState);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilPh: 7.0,
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      soilMoisture: 50,
      cropType: "Wheat",
    },
  });

  useEffect(() => {
    if (state.formState === 'error' && state.fieldErrors) {
      for (const [field, errors] of Object.entries(state.fieldErrors)) {
        if (errors) {
          form.setError(field as keyof FormData, {
            type: 'manual',
            message: errors.join(', '),
          });
        }
      }
    }
  }, [state, form]);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Form {...form}>
            <form action={formAction} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Soil & Crop Data</CardTitle>
                  <CardDescription>Enter the details to get a recommendation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Corn, Tomato, Wheat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="soilPh"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil pH ({field.value})</FormLabel>
                        <FormControl>
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={0}
                            max={14}
                            step={0.1}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                     <FormField
                        control={form.control}
                        name="nitrogen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nitrogen (N)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phosphorus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phosphorus (P)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="potassium"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Potassium (K)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                          </FormItem>
                        )}
                      />
                  </div>
                   <FormField
                      control={form.control}
                      name="soilMoisture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soil Moisture ({field.value}%)</FormLabel>
                          <FormControl>
                            <Slider
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              min={0}
                              max={100}
                              step={1}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                   <Button type="submit" className="w-full" disabled={state.formState === 'pending' || !form.formState.isValid}>
                        {state.formState === 'pending' ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                             <>
                                <Bot className="mr-2 h-4 w-4" />
                                Get Recommendation
                            </>
                        )}
                    </Button>
                    {state.formState === 'error' && state.error && (
                        <p className="text-sm text-destructive text-center w-full">{state.error}</p>
                    )}
                </CardFooter>
              </Card>
            </form>
        </Form>
      </div>
      <div className="md:col-span-2">
        {state.formState === 'success' && <FertilizerResult result={state.result} />}
        {state.formState !== 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center bg-card rounded-lg border border-dashed p-8">
                <Droplets className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Your Recommendation Awaits</h3>
                <p className="mt-2 text-sm text-muted-foreground">Fill out the form to receive an AI-powered fertilizer plan.</p>
            </div>
        )}
      </div>
    </div>
  );
}
