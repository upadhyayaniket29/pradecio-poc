"use client";

import { useAuth } from "@/context/AuthContext";
import AuthModal from "./index";

export default function GlobalAuthModal() {
    const { isModalOpen, closeModal, view } = useAuth();

    return (
        <AuthModal
            isOpen={isModalOpen}
            onClose={closeModal}
            initialView={view}
        />
    );
}
