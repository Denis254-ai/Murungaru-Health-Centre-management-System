import { Activity, Calendar, MessageSquare, Pill } from 'lucide-react';
import { DaktariChat } from '@/components/functional/daktari-chat';
import { MobileNav } from '@/components/layout/mobile-nav';

export default function PatientDashboard() {
    return (
        <div className="space-y-6 pb-20 md:pb-0">
            <div className="bg-primary p-6 rounded-2xl text-white shadow-lg">
                <h1 className="text-xl font-bold">Jambo, Denis 👋</h1>
                <p className="text-blue-100 text-sm">Last checkup: 12th Feb 2026</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="h-10 w-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Appointments</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                        <Activity className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">My Vitals</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                        <Pill className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Meds</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Ask Daktari</span>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Upcoming</h2>
                <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center min-w-[60px]">
                        <span className="block text-xs font-bold uppercase">Feb</span>
                        <span className="block text-xl font-bold">14</span>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">General Checkup</p>
                        <p className="text-sm text-slate-500">Dr. Mungai • 10:00 AM</p>
                    </div>
                </div>
            </div>

            <DaktariChat />
            <MobileNav />
        </div>
    );
}
