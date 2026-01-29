import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | PGR - Virtual Trading App",
    description: "Affordable virtual trading plans for every level of investor, from beginners to AI-powered pros.",
};

const PricingPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Pricing Plans"
                description="Choose the perfect plan for your trading journey. Master the markets with our risk-free virtual trading and AI-driven insights."
            />
            <Pricing />
        </>
    );
};

export default PricingPage;
