"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/apiService";
import { useAuth } from "@/context/AuthContext";

const Signup = ({
    isModal = false,
    onSuccess = () => { },
    onSwitchToSignin = () => { }
}: {
    isModal?: boolean;
    onSuccess?: () => void;
    onSwitchToSignin?: () => void;
}) => {
    const router = useRouter();
    const { login: contextLogin } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const result = await signup(formData);
            if (result.success) {
                setSuccess("Account created successfully! Logging you in...");

                // If the backend returns user and token on signup, log them in immediately
                if (result.data?.user && result.data?.token) {
                    contextLogin(result.data.user, result.data.token);
                }

                setTimeout(() => {
                    if (isModal) {
                        onSuccess();
                    } else {
                        router.push(result.data?.token ? "/" : "/signin");
                    }
                }, 2000);
            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }
        } catch (err: any) {
            setError("Unable to reach the server. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div className={`w-full ${isModal ? "" : "mx-auto max-w-[500px] rounded-sm bg-white shadow-three dark:bg-dark px-6 py-10 sm:p-[60px]"}`}>
            {!isModal && (
                <>
                    <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                        Create your account
                    </h3>
                    <p className="text-body-color mb-11 text-center text-base font-medium">
                        It’s totally free and super easy
                    </p>
                </>
            )}

            {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {success && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative text-sm" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="name" className="mb-2.5 block text-sm font-medium text-dark dark:text-white">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="mb-2.5 block text-sm font-medium text-dark dark:text-white">Work Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Email"
                        className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="mb-2.5 block text-sm font-medium text-dark dark:text-white">Your Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Password"
                        className="w-full rounded-lg border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                    />
                </div>
                <div className="mb-8 flex">
                    <label htmlFor="checkboxLabel" className="flex cursor-pointer select-none text-sm font-medium text-body-color">
                        <div className="relative">
                            <input type="checkbox" id="checkboxLabel" className="sr-only" required />
                            <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]">
                                <span className="opacity-0">
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z" fill="#3056D3" stroke="#3056D3" strokeWidth="0.4" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <span>
                            By creating account means you agree to the{" "}
                            <a href="#0" className="text-primary font-semibold hover:underline">
                                Terms and Conditions
                            </a>
                        </span>
                    </label>
                </div>
                <div className="mb-6">
                    <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-lg bg-primary px-9 py-4 text-base font-bold text-white shadow-submit transition-all duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-50">
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </div>
            </form>
            <p className="text-center text-base font-medium text-body-color">
                Already using Praedico?{" "}
                {isModal ? (
                    <button onClick={onSwitchToSignin} className="text-primary font-semibold hover:underline">Sign in</button>
                ) : (
                    <Link href="/signin" className="text-primary font-semibold hover:underline">Sign in</Link>
                )}
            </p>
        </div>
    );

    if (isModal) return content;

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        {content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
