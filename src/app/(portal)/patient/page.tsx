"use client";

import { Calendar, MessageSquare, History, User } from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-lg shadow-primary/20">
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Jambo, Patient</h1>
                        <p className="text-blue-100">How are you feeling today?</p>
                    </div>
                </div>
            </div>

            {/* Main Actions - Big Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/patient/book"
                    className="group relative h-48 bg-white dark:bg-card rounded-2xl shadow-sm border border-border p-6 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-200"
                >
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">Book Appointment</h3>
                        <p className="text-sm text-muted-foreground mt-1">Schedule a visit with a doctor</p>
                    </div>
                </Link>

                <Link
                    href="/patient/chat"
                    className="group relative h-48 bg-white dark:bg-card rounded-2xl shadow-sm border border-border p-6 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-200"
                >
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:text-white" />
                    </div>
                    <div className="absolute top-6 right-6">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">AI Ready</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-green-600 transition-colors">Ask AI Assistant</h3>
                        <p className="text-sm text-muted-foreground mt-1">Get instant triage advice</p>
                    </div>
                </Link>

                <Link
                    href="/patient/history"
                    className="group relative h-48 bg-white dark:bg-card rounded-2xl shadow-sm border border-border p-6 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-200"
                >
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <History className="h-6 w-6 text-purple-600 dark:text-purple-400 group-hover:text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-purple-600 transition-colors">My History</h3>
                        <p className="text-sm text-muted-foreground mt-1">View past visits and prescriptions</p>
                    </div>
                </Link>
            </div>

            {/* Quick Tips / Health Info */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-lg mb-2">Health Tip</h3>
                <p className="text-muted-foreground">
                    Drink at least 8 glasses of water today. Staying hydrated helps maintain your energy levels and brain function.
                </p>
            </div>
        </div>
    );
}
