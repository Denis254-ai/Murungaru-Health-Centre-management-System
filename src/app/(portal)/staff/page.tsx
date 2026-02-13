import { Activity, Users, ClipboardList, Clock } from 'lucide-react';

export default function StaffDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">Clinician Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Waiting Queue', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'In Progress', value: '3', icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { label: 'Completed', value: '28', icon: ClipboardList, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Avg Wait Time', value: '14m', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Triage Queue Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">Waiting Room Queue</h2>
                    <button className="text-sm text-primary font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Patient ID</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Triage Priority</th>
                                <th className="px-6 py-4">Wait Time</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { id: '2024001', name: 'James Kamau', priority: 'High', time: '12m', status: 'critical' },
                                { id: '2024002', name: 'Sarah Wanjiku', priority: 'Medium', time: '25m', status: 'warning' },
                                { id: '2024003', name: 'Peter Omondi', priority: 'Low', time: '5m', status: 'normal' },
                            ].map((patient, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">#{patient.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{patient.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.status === 'critical' ? 'bg-red-100 text-red-800' :
                                                patient.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {patient.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{patient.time}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:text-primary/80 font-medium text-sm">Call In</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
