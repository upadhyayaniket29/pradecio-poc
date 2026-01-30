"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { signup, login as apiLogin, forgotPassword as apiForgotPassword, resetPassword as apiResetPassword, enroll as apiEnroll } from "@/services/apiService";

type AuthView = "signin" | "signup" | "forgot";

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    plan?: string;
    planDuration?: string;
}

interface AuthContextType {
    isModalOpen: boolean;
    view: AuthView;
    user: User | null;
    notification: string | null;
    openModal: (view?: AuthView) => void;
    closeModal: () => void;
    setView: (view: AuthView) => void;
    login: (userData: User, token: string) => void;
    logout: () => void;
    setNotification: (message: string) => void;
    clearNotification: () => void;
    enroll: (planData: { plan: string, price: string, duration: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [view, setView] = useState<AuthView>("signin");
    const [user, setUser] = useState<User | null>(null);
    const [notification, setNotificationState] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const openModal = useCallback((newView: AuthView = "signin") => {
        setView(newView);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const setNotification = useCallback((message: string) => {
        setNotificationState(message);
        // Auto clear after 4 seconds
        setTimeout(() => {
            setNotificationState(null);
        }, 4000);
    }, []);

    const clearNotification = useCallback(() => {
        setNotificationState(null);
    }, []);

    const login = useCallback((userData: User, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setNotification(`Welcome back, ${userData.name}!`);
        closeModal();
    }, [closeModal, setNotification]);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setNotification("You have been signed out.");
        router.push("/");
    }, [router, setNotification]);

    const enroll = useCallback(async (planData: { plan: string, price: string, duration: string }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !user) throw new Error("Please sign in to enroll.");

            const response = await apiEnroll(token, planData);
            if (response.success && response.data) {
                // Update local user state with new plan info
                const updatedUser = { ...user, ...response.data };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist update
            } else {
                throw new Error("Enrollment failed");
            }
        } catch (error: any) {
            console.error("Enrollment error:", error);
            setNotification(error.message || "Failed to enroll. Please try again.");
            throw error; // Re-throw so component can handle it if needed
        }
    }, [user, setNotification]);

    return (
        <AuthContext.Provider
            value={{
                isModalOpen,
                view,
                user,
                notification,
                openModal,
                closeModal,
                setView,
                login,
                logout,
                setNotification,
                clearNotification,
                enroll
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
