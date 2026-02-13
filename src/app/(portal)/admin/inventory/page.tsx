"use client";

import { useState } from "react";
import { Package, Plus, Search, Filter, AlertTriangle } from "lucide-react";

const INVENTORY = [
    { id: 1, name: "Paracetamol 500mg", category: "Analgesic", stock: 150, unit: "Tablets", status: "In Stock" },
    { id: 2, name: "Amoxicillin 250mg", category: "Antibiotic", stock: 80, unit: "Capsules", status: "In Stock" },
    { id: 3, name: "Ibuprofen 400mg", category: "NSAID", stock: 5, unit: "Tablets", status: "Low Stock" },
    { id: 4, name: "Surgical Gloves (M)", category: "Consumable", stock: 0, unit: "Pairs", status: "Out of Stock" },
];

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <Package className="mr-2 h-6 w-6 text-primary" />
                        Medical Inventory
                    </h1>
                    <p className="text-muted-foreground">Track stock levels and manage orders.</p>
                </div>
                <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md flex items-center">
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-border">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="Search inventory..."
                        className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium flex items-center">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Item Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Stock Level</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {INVENTORY.map((item) => (
                            <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                                <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                                <td className="px-6 py-4 font-mono">
                                    {item.stock} <span className="text-xs text-muted-foreground">{item.unit}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center ${item.status === "In Stock" ? "bg-green-100 text-green-700" :
                                            item.status === "Low Stock" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        {item.status === "Low Stock" || item.status === "Out of Stock" ? <AlertTriangle className="h-3 w-3 mr-1" /> : null}
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-accent hover:underline font-medium">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
