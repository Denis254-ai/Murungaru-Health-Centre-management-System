import { Package, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">Admin & Pharmacy</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Low Stock Alert Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Low Stock</h2>
                        </div>
                        <span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold">3 Critical</span>
                    </div>
                    <ul className="space-y-3">
                        {[
                            { name: 'Paracetamol 500mg', count: '15 Left', status: 'Critical' },
                            { name: 'Amoxicillin Syrup', count: '4 Bottles', status: 'Critical' },
                            { name: 'Gloves (L)', count: '45 Pairs', status: 'Warning' }
                        ].map((item, i) => (
                            <li key={i} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100 group hover:border-red-200 transition-colors">
                                <span className="font-medium text-slate-700 text-sm group-hover:text-slate-900">{item.name}</span>
                                <span className={`font-bold text-xs ${item.status === 'Critical' ? 'text-red-600' : 'text-yellow-600'}`}>{item.count}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full mt-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors">
                        Restock Items
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center mb-6 space-x-3">
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Package className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Inventory Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {['Add Item', 'Stock Take', 'Reports', 'Settings'].map((action) => (
                            <button key={action} className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-all text-left">
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
