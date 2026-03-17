import { PageHeader } from "@/components/page-header";
import DiagnoseForm from "./diagnose-form";

export default function DiagnosePage() {
    return (
        <>
            <PageHeader
                title="Pest & Disease Diagnosis"
                description="Upload a leaf image to diagnose plant health issues and get treatment recommendations."
            />
            <DiagnoseForm />
        </>
    )
}
