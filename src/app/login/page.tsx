"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Stethoscope, ClipboardList, Shield, ArrowRight, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type Role = "patient" | "doctor" | "nurse" | "admin";

const roles: { id: Role; label: string; icon: React.ElementType; description: string; color: string; href: string }[] = [
    {
        id: "patient",
        label: "Patient",
        icon: User,
        description: "Access your health records and appointments",
        color: "bg-blue-500",
        href: "/patient"
    },
    {
        id: "nurse",
        label: "Nurse",
        icon: ClipboardList,
        description: "Triage and vitals management",
        color: "bg-green-500",
        href: "/staff/triage"
    },
    {
        id: "doctor",
        label: "Doctor",
        icon: Stethoscope,
        description: "Consultations and prescriptions",
        color: "bg-indigo-500",
        href: "/staff"
    },
    {
        id: "admin",
        label: "Admin",
        icon: Shield,
        description: "System and inventory management",
        color: "bg-slate-600",
        href: "/admin"
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!selectedRole) return;
        setIsLoading(true);

        // Simulate Auth Delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const role = roles.find((r) => r.id === selectedRole);
        if (role) {
            router.push(role.href);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background relative">
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            {/* Brand Section */}
            <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-center p-12 relative overflow-hidden">
                <div className="relative z-10 text-primary-foreground space-y-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Murungaru HMS</h1>
                    </div>
                    <div className="space-y-4 max-w-lg">
                        <h2 className="text-4xl font-extrabold leading-tight">
                            Modern Healthcare for <span className="text-accent">Everyone.</span>
                        </h2>
                        <p className="text-lg text-blue-100/90">
                            A bio-digital minimalist platform designed for efficiency and care.
                            Experience the future of hospital management.
                        </p>
                    </div>
                </div>

                {/* Abstract Background Element */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute top-24 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Login Section */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Select your role to access the portal
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-8">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={clsx(
                                    "relative group flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left",
                                    selectedRole === role.id
                                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                                        : "border-border hover:border-accent/50 hover:bg-muted/50"
                                )}
                            >
                                <div
                                    className={clsx(
                                        "flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center transition-colors",
                                        selectedRole === role.id ? "bg-accent text-white" : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                                    )}
                                >
                                    <role.icon className="h-6 w-6" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className={clsx("font-semibold", selectedRole === role.id ? "text-accent" : "text-foreground")}>
                                        {role.label}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">{role.description}</p>
                                </div>
                                {selectedRole === role.id && (
                                    <div className="absolute right-4 animate-in fade-in slide-in-from-left-2">
                                        <div className="h-4 w-4 rounded-full bg-accent"></div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={!selectedRole || isLoading}
                        className={clsx(
                            "w-full flex items-center justify-center py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg",
                            !selectedRole || isLoading
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-primary/25"
                        )}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                Continue as {selectedRole ? roles.find((r) => r.id === selectedRole)?.label : "User"}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-muted-foreground mt-8">
                        &copy; 2024 Murungaru Health Centre. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
