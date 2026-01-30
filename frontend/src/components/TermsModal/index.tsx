"use client";

import { useState, useEffect } from "react";

export default function TermsModal() {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (window.location.search.includes("resetTerms=true")) {
            localStorage.removeItem("termsAccepted");
            console.log("Terms reset via URL flag");
        }

        const hasAccepted = localStorage.getItem("termsAccepted");
        const force = window.location.search.includes("forceTerms=true");

        console.log("TermsModal Mounted. hasAccepted:", hasAccepted, "force:", force);

        if (!hasAccepted || force) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleAccept = () => {
        if (agreed) {
            localStorage.setItem("termsAccepted", "true");
            setIsOpen(false);
            document.body.style.overflow = "auto";
            console.log("Terms Accepted and Modal Closed");
        }
    };

    if (!mounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[90vh] w-full max-w-[850px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn dark:bg-[#151b23]">

                {/* Header - Fixed */}
                <div className="shrink-0 border-b border-gray-100 p-5 text-center dark:border-white/5">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-2xl font-extrabold leading-tight text-black dark:text-white">Praedico</h2>
                            <p className="mt-0.5 text-xs font-bold tracking-[0.2em] text-primary uppercase">Global Research Pvt Ltd</p>
                        </div>
                    </div>
                </div>

                {/* Banner - Fixed */}
                <div className="shrink-0 bg-primary/10 py-2.5 text-center dark:bg-primary/20">
                    <p className="text-sm font-semibold text-primary dark:text-white">Please review the terms of service below</p>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar hover:overflow-y-auto">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Educational Purpose */}
                        <div className="group rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/30 dark:border-white/5 dark:bg-white/5 dark:hover:border-primary/30 dark:hover:bg-primary/5">
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-md bg-blue-100/50 p-1.5 text-blue-600 dark:bg-primary/20 dark:text-primary">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </div>
                                <h4 className="text-sm font-bold text-gray-800 dark:text-white">Educational Purpose</h4>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                This virtual simulator is for training purposes only using simulated currency. No real money or actual market risk is involved.
                            </p>
                        </div>

                        {/* Risk Disclosure */}
                        <div className="group rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-yellow-200 hover:bg-yellow-50/30 dark:border-white/5 dark:bg-white/5 dark:hover:border-yellow-500/30 dark:hover:bg-yellow-500/5">
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-md bg-yellow-100/50 p-1.5 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-500">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <h4 className="text-sm font-bold text-gray-800 dark:text-white">Risk Disclosure</h4>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                AI-driven insights and data are simulated. We assume no responsibility for financial decisions made outside this platform.
                            </p>
                        </div>

                        {/* No Liability */}
                        <div className="group rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-red-200 hover:bg-red-50/30 dark:border-white/5 dark:bg-white/5 dark:hover:border-red-500/30 dark:hover:bg-red-500/5">
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-md bg-red-100/50 p-1.5 text-red-600 dark:bg-red-500/20 dark:text-red-500">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <h4 className="text-sm font-bold text-gray-800 dark:text-white">No Liability</h4>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                Consult licensed professionals for real investments. The developers are not liable for any real-world trading outcomes.
                            </p>
                        </div>

                        {/* Code of Conduct */}
                        <div className="group rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-green-200 hover:bg-green-50/30 dark:border-white/5 dark:bg-white/5 dark:hover:border-green-500/30 dark:hover:bg-green-500/5">
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-md bg-green-100/50 p-1.5 text-green-600 dark:bg-green-500/20 dark:text-green-500">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <h4 className="text-sm font-bold text-gray-800 dark:text-white">Code of Conduct</h4>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                Use the platform ethically. Exploitation or unrealistic simulation behavior may result in account termination.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex gap-2">
                            <div className="shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Agreement: </span>
                                All trading is simulated. Usage data is collected anonymously for service improvement. No personal financial data is stored.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer - Fixed */}
                <div className="shrink-0 border-t border-gray-100 bg-gray-50/50 p-5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <label className="flex cursor-pointer select-none items-center gap-3 transition-opacity hover:opacity-80">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-primary checked:bg-primary hover:border-primary focus:ring-0 dark:border-gray-600 dark:bg-gray-800"
                                />
                                <svg
                                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                I agree to the <span className="text-gray-900 underline underline-offset-2 dark:text-white">Terms & Conditions</span>
                            </span>
                        </label>

                        <button
                            onClick={handleAccept}
                            disabled={!agreed}
                            className="w-full max-w-sm rounded-[5px] bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40 focus:outline-hidden disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:hover:translate-y-0 dark:disabled:bg-white/10 dark:disabled:text-white/20"
                        >
                            Accept & Enter Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
