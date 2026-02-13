"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function AppointmentBookingPage() {
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [reason, setReason] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Mock time slots
    const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "04:30 PM"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // TODO: Verify against Supabase in next iteration
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-2rem)] p-6 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Booking Confirmed!</h2>
                <p className="text-muted-foreground max-w-sm">
                    Your appointment has been scheduled for <span className="font-bold text-primary">{date}</span> at <span className="font-bold text-primary">{time}</span>.
                </p>
                <Link
                    href="/patient"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
                >
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <Link href="/patient" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6 text-foreground" />
                </Link>
                <h1 className="text-2xl font-bold">Book an Appointment</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                {/* Date Selection */}
                <div className="space-y-4">
                    <label className="flex items-center space-x-2 font-semibold text-foreground">
                        <CalendarIcon className="h-5 w-5 text-accent" />
                        <span>Select Date</span>
                    </label>
                    <input
                        type="date"
                        required
                        className="w-full p-4 bg-background border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-input transition-all"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                    <label className="flex items-center space-x-2 font-semibold text-foreground">
                        <Clock className="h-5 w-5 text-accent" />
                        <span>Select Time</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => setTime(slot)}
                                className={clsx(
                                    "p-3 rounded-lg border text-sm font-medium transition-all",
                                    time === slot
                                        ? "bg-accent text-accent-foreground border-accent shadow-md"
                                        : "bg-background border-input hover:border-accent hover:bg-accent/5"
                                )}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reason */}
                <div className="space-y-4">
                    <label className="font-semibold text-foreground block">
                        Reason for Visit (Optional)
                    </label>
                    <textarea
                        className="w-full p-4 bg-background border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-input transition-all resize-none h-32"
                        placeholder="Briefly describe your symptoms..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!date || !time}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg mt-4"
                >
                    Confirm Appointment
                </button>
            </form>
        </div>
    );
}
