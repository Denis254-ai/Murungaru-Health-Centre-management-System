"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Users,
    ClipboardList,
    Package,
    Settings as Cog, // Alias to avoid confusion if needed, though Lucide exports it as Settings
    LogOut,
    Calendar,
    MessageSquare,
    History,
    Activity,
    Shield,
    LayoutDashboard
} from "lucide-react";
import { clsx } from "clsx";

export function Sidebar() {
    const pathname = usePathname();

    // Determine Role based on Path
    const isPatient = pathname.startsWith("/patient");
    const isAdmin = pathname.startsWith("/admin");
    const isStaff = pathname.startsWith("/staff");

    let navItems = [];
    let portalName = "Murungaru HMS";
    let portalSubtitle = "Portal";

    if (isPatient) {
        portalName = "Patient Portal";
        portalSubtitle = "My Health";
        navItems = [
            { name: "Home", href: "/patient", icon: Home },
            { name: "Book Appointment", href: "/patient/book", icon: Calendar },
            { name: "AI Assistant", href: "/patient/chat", icon: MessageSquare },
            { name: "My History", href: "/patient/history", icon: History },
            { name: "Settings", href: "/settings", icon: Cog },
        ];
    } else if (isAdmin) {
        portalName = "Admin Portal";
        portalSubtitle = "System Management";
        navItems = [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Inventory", href: "/admin/inventory", icon: Package },
            { name: "Staff", href: "/admin", icon: Users }, // Links to dashboard for now
            { name: "Settings", href: "/settings", icon: Cog },
        ];
    } else {
        // Default to Staff (Doctor/Nurse)
        portalName = "Staff Portal";
        portalSubtitle = "Medical Staff";
        navItems = [
            { name: "Dashboard", href: "/staff", icon: Home },
            { name: "Triage Queue", href: "/staff/triage", icon: ClipboardList },
            { name: "Patients", href: "/staff/patients", icon: Users },
            { name: "Settings", href: "/settings", icon: Cog },
        ];
    }

    return (
        <div className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen fixed left-0 top-0 z-40 transition-colors">
            <div className="p-6 border-b border-border bg-muted/10">
                <h1 className="text-xl font-bold text-primary">{portalName}</h1>
                <p className="text-xs text-muted-foreground">{portalSubtitle}</p>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/settings" && pathname.startsWith(item.href) && item.href !== "/patient" && item.href !== "/admin" && item.href !== "/staff");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "mr-3 h-5 w-5 transition-colors",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border bg-muted/10">
                <Link href="/login" className="flex items-center px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg w-full transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </Link>
            </div>
        </div>
    );
}
