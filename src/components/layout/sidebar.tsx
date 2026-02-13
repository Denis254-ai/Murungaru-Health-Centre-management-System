'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// FIXED: Switched to 'Cog' because 'Settings' can cause version conflicts
import { Home, Users, ClipboardList, Package, Cog, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
    { name: 'Dashboard', href: '/staff', icon: Home },
    { name: 'Triage Queue', href: '/staff/triage', icon: ClipboardList },
    { name: 'Patients', href: '/staff/patients', icon: Users },
    { name: 'Inventory', href: '/admin/inventory', icon: Package },
    // FIXED: Using Cog icon here
    { name: 'Settings', href: '/settings', icon: Cog },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-xl font-bold text-primary">Murungaru HMS</h1>
                <p className="text-xs text-slate-500">Staff Portal</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                isActive
                                    ? 'bg-primary/5 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            )}
                        >
                            <item.icon className={clsx('mr-3 h-5 w-5', isActive ? 'text-primary' : 'text-slate-400')} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center px-4 py-3 text-sm font-medium text-destructive hover:bg-red-50 rounded-lg w-full transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
