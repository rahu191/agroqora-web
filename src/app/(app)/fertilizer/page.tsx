import { PageHeader } from "@/components/page-header";
import FertilizerForm from "./fertilizer-form";

export default function FertilizerPage() {
    return (
        <>
            <PageHeader
                title="Fertilizer Recommendation"
                description="Analyze soil nutrient data to receive optimal fertilizer application suggestions."
            />
            <FertilizerForm />
        </>
    )
}
