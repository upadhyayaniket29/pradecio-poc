"use client";

import { useEffect, useRef, useState } from "react";

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    price: string;
    duration: string;
    onConfirm: () => void;
}

const EnrollmentModal = ({
    isOpen,
    onClose,
    planName,
    price,
    duration,
    onConfirm,
}: EnrollmentModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = "auto";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`fixed inset-0 z-[120000] flex items-center justify-center bg-black/70 p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
        >
            <div
                ref={modalRef}
                className={`relative w-full max-w-[500px] overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 dark:bg-[#151b23] ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                        Confirm Enrollment
                    </h3>
                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                        You are about to enroll in the <span className="font-bold text-primary">{planName}</span> plan.
                    </p>

                    <div className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5">
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-3xl font-bold text-black dark:text-white">${price}</span>
                            <span className="mb-1 text-gray-500">/{duration}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-200 bg-transparent py-3 font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 rounded-lg bg-primary py-3 font-semibold text-white shadow-lg transition hover:bg-primary/90"
                        >
                            Confirm Enrollment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentModal;
