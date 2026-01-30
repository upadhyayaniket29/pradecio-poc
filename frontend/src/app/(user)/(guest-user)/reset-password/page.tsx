"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/services/apiService";
import Link from "next/link";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (!token) {
            setMessage({ type: "error", text: "Invalid or missing reset token." });
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await resetPassword(token, password);
            if (res.success) {
                setMessage({ type: "success", text: "Password has been reset successfully. You can now sign in." });
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                setMessage({ type: "error", text: res.message || "Failed to reset password." });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[500px] rounded-lg bg-white shadow-2xl px-8 py-10 sm:p-12 dark:bg-dark">
                            <h3 className="mb-3 text-center text-3xl font-bold text-black dark:text-white">
                                Reset Your Password
                            </h3>
                            <p className="mb-10 text-center text-base font-medium text-body-color">
                                Enter your new password below.
                            </p>

                            {message.text && (
                                <div className={`mb-8 rounded-lg border px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                                    {message.text}
                                </div>
                            )}

                            {token && message.type !== "success" && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="password"
                                            className="mb-2.5 block text-sm font-medium text-dark dark:text-white"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your new password"
                                            required
                                            className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="confirm-password"
                                            className="mb-2.5 block text-sm font-medium text-dark dark:text-white"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your new password"
                                            required
                                            className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex w-full items-center justify-center rounded-lg bg-primary px-9 py-4 text-base font-bold text-white shadow-submit transition-all duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-50"
                                    >
                                        {loading ? "Resetting..." : "Reset Password"}
                                    </button>
                                </form>
                            )}

                            <div className="mt-8 text-center text-sm font-medium">
                                <Link href="/" className="text-primary hover:underline">Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
