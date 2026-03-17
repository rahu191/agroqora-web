"use client";

import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { diagnosePlant, type DiagnoseState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Upload, X, Bot, HeartPulse, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialState: DiagnoseState = {
  formState: 'initial',
  result: null,
  error: null,
};

const ImageUploader = ({ onImageUpload, onImageClear, disabled }: { onImageUpload: (dataUri: string) => void; onImageClear: () => void; disabled?: boolean; }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        onImageUpload(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
      setImagePreview(null);
      onImageClear();
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  return (
    <div className="space-y-4">
        <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" disabled={disabled} />
        
        {imagePreview ? (
            <div className="relative group aspect-video rounded-lg overflow-hidden border">
                <Image src={imagePreview} alt="Plant preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="destructive" size="icon" onClick={handleClear} disabled={disabled}>
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Remove image</span>
                    </Button>
                </div>
            </div>
        ) : (
             <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50 transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-muted-foreground"/>
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
            </label>
        )}
    </div>
  )
};

const DiagnosisResult = ({ result }: { result: DiagnoseState['result'] }) => {
    if (!result) return null;
    const { diagnosis, treatmentRecommendations } = result;

    const confidenceBadge = {
        high: <Badge className="bg-primary/80 hover:bg-primary/70">High</Badge>,
        medium: <Badge variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">Medium</Badge>,
        low: <Badge variant="destructive">Low</Badge>,
    }[diagnosis.confidence];

    const severityBadge = {
        high: <Badge variant="destructive">High</Badge>,
        medium: <Badge variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">Medium</Badge>,
        low: <Badge className="bg-primary/80 hover:bg-primary/70">Low</Badge>,
    }[diagnosis.severity];

    return (
        <Card className="mt-6 animate-in fade-in-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="text-primary"/>
                    Diagnosis Result
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg">{diagnosis.diseaseName}</h3>
                    <p className="text-muted-foreground">{diagnosis.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground">Confidence</span>
                        {confidenceBadge}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground">Severity</span>
                         {severityBadge}
                    </div>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-2">Recommended Treatments</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {treatmentRecommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                </div>

            </CardContent>
        </Card>
    );
}

export default function DiagnoseForm() {
  const [state, formAction] = useFormState(diagnosePlant, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleImageUpload = (dataUri: string) => {
    const existingInput = formRef.current?.querySelector('input[name="photoDataUri"]') as HTMLInputElement;
    if (existingInput) {
      existingInput.value = dataUri;
    } else {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'photoDataUri';
      input.value = dataUri;
      formRef.current?.appendChild(input);
    }
  };

  const handleImageClear = () => {
    const existingInput = formRef.current?.querySelector('input[name="photoDataUri"]');
    if(existingInput) {
        formRef.current?.removeChild(existingInput);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
        <form ref={formRef} action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Upload Leaf Image</CardTitle>
                    <CardDescription>Upload a clear photo of an affected leaf for an AI-powered diagnosis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ImageUploader 
                        onImageUpload={handleImageUpload}
                        onImageClear={handleImageClear}
                        disabled={state.formState === 'pending'}
                    />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                    <Button type="submit" className="w-full" disabled={state.formState === 'pending'}>
                        {state.formState === 'pending' ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                             <>
                                <Bot className="mr-2 h-4 w-4" />
                                Diagnose Plant
                            </>
                        )}
                    </Button>
                    {state.formState === 'error' && state.error && (
                        <p className="text-sm text-destructive">{state.error}</p>
                    )}
                </CardFooter>
            </Card>
        </form>
        {state.formState === 'success' && <DiagnosisResult result={state.result} />}
    </div>
  );
}
