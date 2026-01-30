"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
};

export default function Modal({ isOpen, onClose, children, title, maxWidth = "max-w-md" }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm transition-all duration-300">
            <div
                className={`relative w-full ${maxWidth} transform rounded-lg bg-white shadow-2xl transition-all duration-300 dark:bg-gray-dark animate-fadeIn`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-8 pt-8 pb-2">
                    <h3 className="text-2xl font-bold text-black dark:text-white leading-tight">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-body-color hover:bg-gray-100 hover:text-primary dark:text-body-color-dark dark:hover:bg-white/10 dark:hover:text-white transition-all"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="px-8 pb-8 pt-4">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
