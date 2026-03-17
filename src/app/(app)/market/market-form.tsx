"use client";

import { useFormState } from "react-dom";
import { getMarketTrends, type MarketState } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bot, TrendingUp, Loader2, CheckCircle, XCircle } from "lucide-react";

const initialState: MarketState = {
  formState: 'initial',
  result: null,
  error: null,
};

const MarketResult = ({ result }: { result: MarketState['result'] }) => {
    if (!result) return null;
    const { recommendedCrops, generalMarketOutlook } = result;

    const ProfitabilityBadge = ({ level }: { level: string }) => {
        const styles: { [key: string]: string } = {
            'Very High': 'bg-green-600',
            'High': 'bg-green-500',
            'Medium': 'bg-yellow-500',
            'Low': 'bg-orange-500',
            'Very Low': 'bg-red-500',
        };
        return <Badge className={`text-white ${styles[level]}`}>{level}</Badge>;
    }

    return (
        <Card className="mt-6 animate-in fade-in-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-primary"/>
                    Market Recommendations
                </CardTitle>
                <CardDescription>{generalMarketOutlook}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Profitability</TableHead>
                            <TableHead>Demand Trend</TableHead>
                            <TableHead>Soil Suitability</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recommendedCrops.map(crop => (
                            <TableRow key={crop.name}>
                                <TableCell className="font-medium">{crop.name}</TableCell>
                                <TableCell className="text-sm text-muted-foreground max-w-xs">{crop.reason}</TableCell>
                                <TableCell><ProfitabilityBadge level={crop.estimatedProfitability} /></TableCell>
                                <TableCell>{crop.marketDemandTrend}</TableCell>
                                <TableCell>
                                    {crop.suitableForSoil ? 
                                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                                    <XCircle className="h-5 w-5 text-red-500" />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default function MarketForm() {
  const [state, formAction] = useFormState(getMarketTrends, initialState);

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <form action={formAction} className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Market Analysis</CardTitle>
                        <CardDescription>Get crop recommendations based on trends.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" placeholder="e.g., California, USA" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plantingSeason">Planting Season</Label>
                            <Input id="plantingSeason" name="plantingSeason" placeholder="e.g., Spring, June-August" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soilType">Soil Type (Optional)</Label>
                            <Input id="soilType" name="soilType" placeholder="e.g., loamy, clay" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="preferredCropCategories">Preferred Categories (Optional, comma-separated)</Label>
                            <Input id="preferredCropCategories" name="preferredCropCategories" placeholder="e.g., vegetables, fruits" />
                        </div>
                    </CardContent>
                     <CardFooter className="flex-col items-start gap-2">
                        <Button type="submit" className="w-full" disabled={state.formState === 'pending'}>
                            {state.formState === 'pending' ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Market...</>
                            ) : (
                                <><Bot className="mr-2 h-4 w-4" /> Get Recommendations</>
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
            {state.formState === 'success' && <MarketResult result={state.result} />}
            {state.formState !== 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center bg-card rounded-lg border border-dashed p-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Profitable Crop Insights</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Fill out the form to discover the best crops to plant for the upcoming season based on market data.</p>
                </div>
            )}
        </div>
    </div>
  );
}
