'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, User, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
    { name: 'Home', href: '/patient', icon: Home },
    { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
    { name: 'Chat', href: '/patient/chat', icon: MessageSquare },
    { name: 'Profile', href: '/patient/profile', icon: User },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-40">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center space-y-1 p-2"
                    >
                        <div className={clsx(
                            "p-1.5 rounded-xl transition-colors",
                            isActive ? "bg-primary/10 text-primary" : "text-slate-400"
                        )}>
                            <item.icon className="h-6 w-6" />
                        </div>
                        <span className={clsx(
                            "text-[10px] font-medium",
                            isActive ? "text-primary" : "text-slate-400"
                        )}>
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
