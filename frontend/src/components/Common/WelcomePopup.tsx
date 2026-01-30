"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function WelcomePopup() {
    const { notification, clearNotification } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // We don't necessarily need to clear it here if the context handles it,
                // but it's good for the animation.
            }, 3500);
            return () => {
                // cleanup if needed
            };
        } else {
            setIsVisible(false);
        }
    }, [notification]);

    if (!notification && !isVisible) return null;

    return (
        <div
            className={`fixed bottom-10 right-10 z-[100] transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
        >
            <div className="bg-white dark:bg-gray-dark border border-primary/20 shadow-2xl rounded-2xl p-6 flex items-center gap-4 max-w-sm">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-dark dark:text-white text-lg">Success</h4>
                    <p className="text-body-color dark:text-body-color-dark text-sm leading-relaxed">
                        {notification}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(clearNotification, 500);
                    }}
                    className="text-body-color hover:text-dark dark:hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
