import { PageHeader } from "@/components/page-header";
import MarketForm from "./market-form";

export default function MarketPage() {
    return (
        <>
            <PageHeader
                title="Market Trend Analysis"
                description="Analyze market and seasonal trends to receive recommendations for the most profitable crops."
            />
            <MarketForm />
        </>
    )
}
