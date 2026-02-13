'use client';

import { Sidebar } from './sidebar';
import { Header } from './header';

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 md:pl-64 transition-all duration-300">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
