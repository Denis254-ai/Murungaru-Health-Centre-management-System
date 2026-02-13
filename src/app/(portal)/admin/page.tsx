"use client";

import { Users, Activity, Package, DollarSign, UserPlus, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const STATS = [
    { label: "Total Patients", value: "1,240", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/50" },
    { label: "Consultations Today", value: "48", change: "+5%", icon: Activity, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/50" },
    { label: "Low Stock Items", value: "3", change: "-2", icon: Package, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/50" },
    { label: "Revenue (Today)", value: "KES 45k", change: "+8%", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/50" },
];

const STAFF = [
    { id: 1, name: "Dr. Sarah Kimani", role: "Chief Medical Officer", department: "General", status: "Active" },
    { id: 2, name: "Nurse John Mwangi", role: "Senior Nurse", department: "Triage", status: "Active" },
    { id: 3, name: "Dr. Peter Otieno", role: "Pediatrician", department: "Pediatrics", status: "On Leave" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Overview of hospital performance and resource management.</p>
                </div>
                <div className="flex space-x-4">
                    <Link href="/admin/inventory" className="px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all shadow-sm">
                        Manage Inventory
                    </Link>
                    <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm flex items-center">
                        <UserPlus className="h-4 w-4 mr-2" /> Add Staff
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border flex items-center justify-between hover:border-accent hover:shadow-md transition-all">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full mt-2 inline-block">
                                {stat.change} from yesterday
                            </span>
                        </div>
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Staff Management Section */}
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-lg font-bold">Staff Directory</h2>
                    <div className="flex space-x-2">
                        <input
                            placeholder="Search staff..."
                            className="px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {STAFF.map((staff) => (
                                <tr key={staff.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{staff.name}</td>
                                    <td className="px-6 py-4">{staff.role}</td>
                                    <td className="px-6 py-4">{staff.department}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${staff.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
                                            }`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-muted rounded-full">
                                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                        </button>
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
