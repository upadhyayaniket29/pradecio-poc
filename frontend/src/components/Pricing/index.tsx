"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import EnrollmentModal from "./EnrollmentModal";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "" });
  const { setNotification, enroll } = useAuth();

  const handleEnroll = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setIsEnrollmentOpen(true);
  };

  const handleConfirmEnroll = async () => {
    try {
      await enroll({
        plan: selectedPlan.name,
        price: selectedPlan.price,
        duration: isMonthly ? "mo" : "yr"
      });
      setIsEnrollmentOpen(false);
      setNotification(`Successfully enrolled in ${selectedPlan.name} plan!`);
    } catch (error) {
      // Notification is handled in AuthContext
    }
  };

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="Choose the plan that fits your trading journey, from risk-free practice to AI-driven wealth creation."
          center
          width="665px"
        />

        <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${isMonthly
                ? "pointer-events-none text-primary"
                : "text-dark dark:text-white"
                } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${isMonthly ? "" : "translate-x-full"
                    } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${isMonthly
                ? "text-dark dark:text-white"
                : "pointer-events-none text-primary"
                } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Free"
            price={isMonthly ? "0" : "0"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Perfect for beginners to start their virtual trading journey."
            onEnroll={() => handleEnroll("Free", isMonthly ? "0" : "0")}
          >
            <OfferList text="Virtual Trading (NSE Stocks)" status="active" />
            <OfferList text="Daily Performance Reports" status="active" />
            <OfferList text="Practice Orders (Limit/Market)" status="active" />
            <OfferList text="Standard Support" status="active" />
            <OfferList text="AI Predictions" status="inactive" />
            <OfferList text="F&O Option Chain" status="inactive" />
          </PricingBox>
          <PricingBox
            packageName="Pro"
            price={isMonthly ? "499" : "4999"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Advanced tools for serious traders to refine their strategies."
            onEnroll={() =>
              handleEnroll("Pro", isMonthly ? "499" : "4999")
            }
          >
            <OfferList text="All Free Features" status="active" />
            <OfferList text="Technical Indicators" status="active" />
            <OfferList text="Advanced Charts" status="active" />
            <OfferList text="Stop-loss & Target tools" status="active" />
            <OfferList text="Priority Support" status="active" />
            <OfferList text="Ad-free Experience" status="active" />
          </PricingBox>
          <PricingBox
            packageName="Elite"
            price={isMonthly ? "999" : "9999"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="The ultimate package with AI-driven insights and F&O data."
            onEnroll={() =>
              handleEnroll("Elite", isMonthly ? "999" : "9999")
            }
          >
            <OfferList text="All Pro Features" status="active" />
            <OfferList text="AI Stock Predictions (80-90% accuracy)" status="active" />
            <OfferList text="F&O Option Chain Analysis" status="active" />
            <OfferList text="Neural Network Market Insights" status="active" />
            <OfferList text="Personal Relationship Manager" status="active" />
            <OfferList text="Exclusive Webinars" status="active" />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        planName={selectedPlan.name}
        price={selectedPlan.price}
        duration={isMonthly ? "mo" : "yr"}
        onConfirm={handleConfirmEnroll}
      />
    </section>
  );
};

export default Pricing;
