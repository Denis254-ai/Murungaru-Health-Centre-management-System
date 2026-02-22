"use client";

import { useState } from "react";
import { Users, FileText, Clipboard, Plus, Trash2, Pill } from "lucide-react";

// Mock Data
const PATIENTS = [
    { id: 1, name: "Alice Wambui", age: 28, gender: "F", reason: "Severe headache", status: "triaged", bmi: "22.5", bp: "120/80" },
    { id: 2, name: "James Njoroge", age: 45, gender: "M", reason: "Chest pain", status: "triaged", bmi: "28.1", bp: "140/90" },
];

const INVENTORY = [
    { id: 1, name: "Paracetamol 500mg", stock: 150 },
    { id: 2, name: "Amoxicillin 250mg", stock: 80 },
    { id: 3, name: "Ibuprofen 400mg", stock: 0 }, // Out of stock
    { id: 4, name: "Metformin 500mg", stock: 200 },
];

const HISTORY = [
    { date: "2024-01-15", diagnosis: "Acute Migraine", treatment: "Rest and hydration" },
    { date: "2023-11-20", diagnosis: "Malaria", treatment: "Coartem course" },
];

export default function DoctorDashboard() {
    const [selectedPatient, setSelectedPatient] = useState<typeof PATIENTS[0] | null>(null);
    const [prescriptions, setPrescriptions] = useState<{ id: number; drugId: string; dosage: string }[]>([]);

    // Form State
    const [notes, setNotes] = useState("");
    const [diagnosis, setDiagnosis] = useState("");

    const addPrescription = () => {
        setPrescriptions([...prescriptions, { id: Date.now(), drugId: "", dosage: "" }]);
    };

    const removePrescription = (id: number) => {
        setPrescriptions(prescriptions.filter(p => p.id !== id));
    };

    const updatePrescription = (id: number, field: string, value: string) => {
        setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleFinish = () => {
        if (!selectedPatient) return;
        alert(`Consultation finalized for ${selectedPatient.name}. Prescriptions: ${prescriptions.length}`);
        setSelectedPatient(null);
        setPrescriptions([]);
        setNotes("");
        setDiagnosis("");
    };

    if (!selectedPatient) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold flex items-center">
                    <Users className="mr-2 h-6 w-6 text-primary" />
                    Assigned Patients
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PATIENTS.map(patient => (
                        <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className="p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border hover:border-accent hover:shadow-md cursor-pointer transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{patient.name}</h3>
                                    <p className="text-sm text-muted-foreground">{patient.gender}, {patient.age} yrs</p>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Ready</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">BP:</span>
                                    <span className="font-mono">{patient.bp}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">BMI:</span>
                                    <span className="font-mono">{patient.bmi}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border">
                                    <span className="text-destructive font-medium">{patient.reason}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] -mt-4 -mx-4 overflow-hidden">
            {/* Top Bar */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md z-10">
                <div>
                    <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                    <p className="text-sm text-blue-200">{selectedPatient.gender}, {selectedPatient.age} yrs • BP: {selectedPatient.bp}</p>
                </div>
                <button
                    onClick={() => setSelectedPatient(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                >
                    Back to List
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* LEFT: History */}
                <div className="w-1/3 bg-muted/30 border-r border-border overflow-y-auto p-4 space-y-4">
                    <h3 className="font-bold text-muted-foreground uppercase text-xs tracking-wider mb-2">Patient History</h3>
                    {HISTORY.map((record, i) => (
                        <div key={i} className="p-4 bg-background rounded-xl border border-border">
                            <div className="text-xs text-muted-foreground mb-1">{record.date}</div>
                            <div className="font-semibold text-primary">{record.diagnosis}</div>
                            <p className="text-sm mt-1">{record.treatment}</p>
                        </div>
                    ))}
                </div>

                {/* RIGHT: Consultation Form */}
                <div className="flex-1 overflow-y-auto p-6 bg-background space-y-6">
                    {/* Clinical Notes */}
                    <div className="space-y-2">
                        <label className="font-semibold flex items-center">
                            <FileText className="h-4 w-4 mr-2" /> Clinical Notes
                        </label>
                        <textarea
                            className="w-full h-40 p-4 bg-card border border-input rounded-xl focus:ring-2 focus:ring-accent resize-none shadow-sm"
                            placeholder="Patient findings, symptoms, and observations..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    {/* Diagnosis */}
                    <div className="space-y-2">
                        <label className="font-semibold flex items-center">
                            <Clipboard className="h-4 w-4 mr-2" /> Diagnosis
                        </label>
                        <input
                            type="text"
                            className="w-full p-4 bg-card border border-input rounded-xl focus:ring-2 focus:ring-accent shadow-sm"
                            placeholder="e.g. Acute Bacterial Sinusitis"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        />
                    </div>

                    {/* Prescription */}
                    <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold flex items-center">
                                <Pill className="h-4 w-4 mr-2" /> Prescription
                            </label>
                            <button
                                onClick={addPrescription}
                                className="flex items-center text-accent hover:text-accent/80 text-sm font-bold"
                            >
                                <Plus className="h-4 w-4 mr-1" /> Add Drug
                            </button>
                        </div>

                        <div className="space-y-3">
                            {prescriptions.map((p) => (
                                <div key={p.id} className="flex gap-4 items-start animate-in fade-in slide-in-from-top-2">
                                    <select
                                        className="flex-1 p-3 bg-card border border-input rounded-lg focus:ring-2 focus:ring-accent"
                                        value={p.drugId}
                                        onChange={(e) => updatePrescription(p.id, 'drugId', e.target.value)}
                                    >
                                        <option value="">Select Medication...</option>
                                        {INVENTORY.map(drug => (
                                            <option key={drug.id} value={drug.id.toString()} disabled={drug.stock === 0}>
                                                {drug.name} {drug.stock === 0 ? "(Out of Stock)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        placeholder="Dosage (e.g. 1x3 5 days)"
                                        className="w-1/3 p-3 bg-card border border-input rounded-lg focus:ring-2 focus:ring-accent"
                                        value={p.dosage}
                                        onChange={(e) => updatePrescription(p.id, 'dosage', e.target.value)}
                                    />
                                    <button
                                        onClick={() => removePrescription(p.id)}
                                        className="p-3 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            {prescriptions.length === 0 && (
                                <div className="text-center p-6 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
                                    No medications prescribed yet.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-8 mb-20">
                        <button
                            onClick={handleFinish}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 shadow-lg transition-transform active:scale-[0.99]"
                        >
                            Finalize Consultation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
