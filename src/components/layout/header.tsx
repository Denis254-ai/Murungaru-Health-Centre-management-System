'use client';

import { Bell, Search, User } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:ml-64 sticky top-0 z-10">
            <div className="flex items-center md:hidden">
                <span className="text-lg font-bold text-primary">Murungaru HMS</span>
            </div>

            <div className="hidden md:flex items-center bg-slate-50 rounded-lg px-3 py-2 w-96">
                <Search className="h-4 w-4 text-slate-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search patients, records..."
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 placeholder-slate-400"
                />
            </div>

            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-700">Dr. Mungai</p>
                        <p className="text-xs text-slate-500">Clinical Officer</p>
                    </div>
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        DM
                    </div>
                </div>
            </div>
        </header>
    );
}
