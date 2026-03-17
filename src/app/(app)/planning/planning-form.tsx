"use client";

import { useRef } from "react";
import { useFormState } from "react-dom";
import { getCropPlan, type PlanningState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bot, CalendarDays, Sprout, Loader2, BarChart, Sun, TrendingUp } from "lucide-react";

const initialState: PlanningState = {
  formState: 'initial',
  result: null,
  error: null,
};

const PlanningResult = ({ result }: { result: PlanningState['result'] }) => {
    if (!result) return null;
    const { sowingSchedule, harvestSchedule, reasoning, profitabilityEstimate } = result;

    return (
        <Card className="mt-6 animate-in fade-in-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="text-primary"/>
                    Optimized Crop Plan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-background">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <Sprout className="w-4 h-4 text-primary" /> Sowing Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-lg text-primary">{sowingSchedule}</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-background">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" /> Harvest Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-lg text-primary">{harvestSchedule}</p>
                        </CardContent>
                    </Card>
                 </div>
                 <div>
                    <h4 className="font-semibold mb-2">Reasoning</h4>
                    <p className="text-muted-foreground text-sm">{reasoning}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Profitability Estimate</h4>
                    <p className="text-muted-foreground text-sm">{profitabilityEstimate}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function PlanningForm() {
  const [state, formAction] = useFormState(getCropPlan, initialState);

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <form action={formAction} className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Crop Planning Data</CardTitle>
                        <CardDescription>Provide data to generate an optimized plan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cropType">Crop Type</Label>
                            <Input id="cropType" name="cropType" placeholder="e.g., Rice" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" placeholder="e.g., Punjab, India" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="historicalYieldsData">Historical Yields Data (JSON/CSV)</Label>
                            <Textarea id="historicalYieldsData" name="historicalYieldsData" placeholder='e.g., [{"year": 2022, "yield": 520}]' required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weatherForecastData">Weather Forecast Data (JSON/CSV)</Label>
                            <Textarea id="weatherForecastData" name="weatherForecastData" placeholder='e.g., {"avg_temp_c": 26, "rainfall_mm": 160}' required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="marketTrendsData">Market Trends Data (JSON/CSV)</Label>
                            <Textarea id="marketTrendsData" name="marketTrendsData" placeholder='e.g., {"demand": "high", "price_forecast": 12}' required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2">
                        <Button type="submit" className="w-full" disabled={state.formState === 'pending'}>
                            {state.formState === 'pending' ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</>
                            ) : (
                                <><Bot className="mr-2 h-4 w-4" /> Generate Plan</>
                            )}
                        </Button>
                        {state.formState === 'error' && state.error && (
                            <p className="text-sm text-destructive">{state.error}</p>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </div>
        <div className="md:col-span-2">
            {state.formState === 'success' && <PlanningResult result={state.result} />}
            {state.formState !== 'success' && (
                 <div className="h-full flex flex-col items-center justify-center text-center bg-card rounded-lg border border-dashed p-8">
                    <div className="grid grid-cols-3 gap-8 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2"><BarChart className="h-10 w-10" /><span className="text-xs">Historical Data</span></div>
                        <div className="flex flex-col items-center gap-2"><Sun className="h-10 w-10" /><span className="text-xs">Weather Forecasts</span></div>
                        <div className="flex flex-col items-center gap-2"><TrendingUp className="h-10 w-10" /><span className="text-xs">Market Trends</span></div>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold">Your Optimized Plan Awaits</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Fill out the form to combine these data points into a powerful sowing and harvesting strategy.</p>
                </div>
            )}
        </div>
    </div>
  );
}
