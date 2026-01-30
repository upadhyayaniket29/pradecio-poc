"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            // If no user, redirect to home after a short delay or immediately
            // For now, let's just let the UI handle the "not logged in" state
        }
    }, [user, router]);

    if (!user) {
        return (
            <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[500px] rounded-lg bg-white shadow-three dark:bg-dark px-8 py-10 sm:p-12 text-center">
                                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                                    Access Denied
                                </h3>
                                <p className="mb-8 text-base text-body-color">
                                    Please sign in to view your profile.
                                </p>
                                <Link
                                    href="/"
                                    className="rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/80"
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[600px] rounded-lg bg-white shadow-three dark:bg-dark px-8 py-10 sm:p-12 border border-stroke dark:border-white/10">
                            <div className="mb-10 text-center">
                                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary text-4xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="text-3xl font-bold text-black dark:text-white">
                                    User Profile
                                </h3>
                                <p className="text-base text-body-color dark:text-body-color-dark">
                                    Your personal information
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                        Full Name
                                    </label>
                                    <div className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark">
                                        {user.name}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                        Email Address
                                    </label>
                                    <div className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark">
                                        {user.email}
                                    </div>
                                </div>

                                {user.role && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                            Account Type
                                        </label>
                                        <div className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark capitalize">
                                            {user.role}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-12 flex justify-center border-t border-stroke pt-8 dark:border-white/10">
                                <Link
                                    href="/"
                                    className="text-base font-semibold text-primary transition-all hover:underline"
                                >
                                    Back to Marketplace
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
