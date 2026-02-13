"use client";

import { User, Bell, Shield, Moon, Sun, Smartphone } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { clsx } from "clsx";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-border pb-6">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account settings and preferences.
                </p>
            </div>

            {/* Theme Settings */}
            <section className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center">
                        <Sun className="h-5 w-5 mr-2 text-primary" /> Appearance
                    </h2>
                    <p className="text-sm text-muted-foreground">Customize how the application looks on your device.</p>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="font-medium">Theme Mode</div>
                            <div className="text-sm text-muted-foreground">Select your preferred color scheme</div>
                        </div>
                        <div className="flex items-center space-x-2 bg-muted p-1 rounded-full border border-border">
                            <button
                                onClick={() => setTheme("light")}
                                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all", theme === 'light' ? "bg-white text-primary shadow-sm" : "hover:text-primary")}
                            >
                                Light
                            </button>
                            <button
                                onClick={() => setTheme("dark")}
                                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all", theme === 'dark' ? "bg-blue-900 text-white shadow-sm" : "hover:text-primary")}
                            >
                                Dark
                            </button>
                            <button
                                onClick={() => setTheme("system")}
                                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all", theme === 'system' ? "bg-white dark:bg-slate-700 shadow-sm" : "hover:text-primary")}
                            >
                                System
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Account Settings */}
            <section className="bg-card rounded-2xl border border-border overflow-hidden opacity-80 cursor-not-allowed">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" /> Profile Settings
                    </h2>
                    <p className="text-sm text-muted-foreground">Update your personal information (Coming Soon).</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input disabled className="w-full p-2 bg-muted border border-input rounded-md" value="Dr. Demo User" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input disabled className="w-full p-2 bg-muted border border-input rounded-md" value="demo@murungaru.hms" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Notifications */}
            <section className="bg-card rounded-2xl border border-border overflow-hidden opacity-80">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-primary" /> Notifications
                    </h2>
                    <p className="text-sm text-muted-foreground">Manage your alert preferences.</p>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <span>Enable Email Notifications</span>
                        <div className="h-6 w-11 bg-primary rounded-full relative">
                            <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
