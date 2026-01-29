import Breadcrumb from "@/components/Common/Breadcrumb";
import Features from "@/components/Features";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | PGR - Virtual Trading App",
    description: "Explore the wide range of virtual trading services offered by Praedico Global Research.",
};

const ServicesPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Our Services"
                description="Comprehensive virtual trading solutions and AI-driven market insights designed to help you master the stock market without risk."
            />
            <Features />
        </>
    );
};

export default ServicesPage;
