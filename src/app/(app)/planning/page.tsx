import { PageHeader } from "@/components/page-header";
import PlanningForm from "./planning-form";

export default function PlanningPage() {
    return (
        <>
            <PageHeader
                title="Crop Planning Optimization"
                description="Get AI-driven sowing and harvest schedules based on historical yields, weather, and market trends."
            />
            <PlanningForm />
        </>
    )
}
