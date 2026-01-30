"use client";

import { useState, useEffect } from "react";
import Modal from "../Common/Modal";
import Signin from "../Signin";
import Signup from "../Signup";
import { forgotPassword } from "@/services/apiService";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialView?: "signin" | "signup" | "forgot";
};

export default function AuthModal({ isOpen, onClose, initialView = "signin" }: AuthModalProps) {
    const [view, setView] = useState<"signin" | "signup" | "forgot">(initialView);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [initialView, isOpen]);

    const handleForgotSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await forgotPassword(email);
            if (res.success) {
                setMessage({ type: "success", text: "Password reset instructions sent to your email." });
            } else {
                setMessage({ type: "error", text: res.message || "Failed to process request." });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={view === "signin" ? "Sign In" : view === "signup" ? "Sign Up" : "Forgot Password"}
            maxWidth="max-w-[500px]"
        >
            {view === "signin" && (
                <>
                    <div className="flex flex-col">
                        <Signin isModal={true} onSuccess={onClose} onSwitchToSignup={() => setView("signup")} onSwitchToForgot={() => setView("forgot")} />
                    </div>
                </>
            )}

            {view === "signup" && (
                <>
                    <div className="flex flex-col">
                        <Signup isModal={true} onSuccess={() => setView("signin")} onSwitchToSignin={() => setView("signin")} />
                    </div>
                </>
            )}

            {view === "forgot" && (
                <div className="flex flex-col">
                    <p className="mb-8 text-center text-base font-medium text-body-color">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    {message.text && (
                        <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${message.type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleForgotSubmit}>
                        <div className="mb-6">
                            <label htmlFor="forgot-email" className="mb-2.5 block text-sm font-medium text-dark dark:text-white">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="forgot-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email"
                                required
                                className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-primary px-9 py-4 text-base font-bold text-white shadow-submit transition-all duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Send Reset Link"}
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setView("signin")}
                            className="text-base font-semibold text-primary hover:underline"
                        >
                            Back to Sign In
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}
