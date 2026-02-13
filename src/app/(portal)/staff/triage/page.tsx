"use client";

import { useState, useMemo } from "react";
import { Users, Activity, FileText, CheckCircle, Search } from "lucide-react";
import { clsx } from "clsx";

// Mock Data
const INITIAL_QUEUE = [
    { id: 1, name: "Alice Wambui", age: 28, gender: "F", reason: "Severe headache", status: "waiting", time: "10:00 AM" },
    { id: 2, name: "James Njoroge", age: 45, gender: "M", reason: "Chest pain", status: "waiting", time: "10:15 AM" },
    { id: 3, name: "Sarah Otieno", age: 32, gender: "F", reason: "Fever and chills", status: "waiting", time: "10:30 AM" },
];

export default function NurseTriagePage() {
    const [queue, setQueue] = useState(INITIAL_QUEUE);
    const [selectedPatient, setSelectedPatient] = useState<typeof INITIAL_QUEUE[0] | null>(null);

    // Vitals State
    const [vitals, setVitals] = useState({
        temp: "",
        bpSystolic: "",
        bpDiastolic: "",
        pulse: "",
        weight: "",
        height: "",
        notes: ""
    });

    // Derived BMI
    const bmi = useMemo(() => {
        const w = parseFloat(vitals.weight);
        const h = parseFloat(vitals.height) / 100; // cm to m
        if (!w || !h) return null;
        return (w / (h * h)).toFixed(1);
    }, [vitals.weight, vitals.height]);

    const handleVitalsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVitals(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPatient) return;

        // TODO: Send to Supabase
        alert(`Triage submitted for ${selectedPatient.name}. BMI: ${bmi}`);

        // Remove from queue locally
        setQueue(prev => prev.filter(p => p.id !== selectedPatient.id));
        setSelectedPatient(null);
        setVitals({ temp: "", bpSystolic: "", bpDiastolic: "", pulse: "", weight: "", height: "", notes: "" });
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] gap-6">
            {/* LEFT: Queue List */}
            <div className="w-1/3 flex flex-col bg-white dark:bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                    <h2 className="font-bold flex items-center text-lg">
                        <Users className="mr-2 h-5 w-5 text-primary" />
                        Waiting Queue <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{queue.length}</span>
                    </h2>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            placeholder="Search patient..."
                            className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {queue.map(patient => (
                        <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className={clsx(
                                "p-4 rounded-xl cursor-pointer transition-all border",
                                selectedPatient?.id === patient.id
                                    ? "bg-accent/10 border-accent shadow-sm"
                                    : "bg-background border-transparent hover:bg-muted"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                                    <p className="text-xs text-muted-foreground">{patient.gender}, {patient.age} yrs</p>
                                </div>
                                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">{patient.time}</span>
                            </div>
                            <p className="text-sm mt-2 text-primary font-medium truncate">{patient.reason}</p>
                        </div>
                    ))}
                    {queue.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500 opacity-50" />
                            <p>Queue is empty</p>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: Triage Form */}
            <div className="flex-1 bg-white dark:bg-card rounded-2xl shadow-sm border border-border flex flex-col overflow-hidden">
                {selectedPatient ? (
                    <>
                        <div className="p-6 border-b border-border bg-primary/5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">{selectedPatient.name}</h2>
                                    <p className="text-muted-foreground">ID: #{selectedPatient.id.toString().padStart(4, '0')} • {selectedPatient.gender} • {selectedPatient.age} Years</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-destructive uppercase tracking-wider">Chief Complaint</div>
                                    <div className="text-lg">{selectedPatient.reason}</div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Vitals Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Temperature */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Activity className="h-4 w-4 mr-2 text-destructive" /> Temperature (°C)
                                    </label>
                                    <input
                                        name="temp"
                                        type="number"
                                        step="0.1"
                                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent"
                                        placeholder="36.5"
                                        value={vitals.temp}
                                        onChange={handleVitalsChange}
                                        required
                                    />
                                </div>

                                {/* Pulse */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Activity className="h-4 w-4 mr-2 text-destructive" /> Pulse (bpm)
                                    </label>
                                    <input
                                        name="pulse"
                                        type="number"
                                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent"
                                        placeholder="72"
                                        value={vitals.pulse}
                                        onChange={handleVitalsChange}
                                        required
                                    />
                                </div>

                                {/* BP */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Activity className="h-4 w-4 mr-2 text-destructive" /> BP (mmHg)
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            name="bpSystolic"
                                            type="number"
                                            className="w-1/2 p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent"
                                            placeholder="120"
                                            value={vitals.bpSystolic}
                                            onChange={handleVitalsChange}
                                            required
                                        />
                                        <span className="self-center text-muted-foreground">/</span>
                                        <input
                                            name="bpDiastolic"
                                            type="number"
                                            className="w-1/2 p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent"
                                            placeholder="80"
                                            value={vitals.bpDiastolic}
                                            onChange={handleVitalsChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Weight */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Activity className="h-4 w-4 mr-2 text-blue-500" /> Weight (kg)
                                    </label>
                                    <input
                                        name="weight"
                                        type="number"
                                        step="0.1"
                                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent"
                                        placeholder="70"
                                        value={vitals.weight}
                                        onChange={handleVitalsChange}
                                        required
                                    />
                                </div>

                                {/* Height */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Activity className="h-4 w-4 mr-2 text-blue-500" /> Height (cm)
                                    </label>
                                    <input
                                        name="height"
                                        type="number"
                                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent"
                                        placeholder="175"
                                        value={vitals.height}
                                        onChange={handleVitalsChange}
                                        required
                                    />
                                </div>

                                {/* BMI Display */}
                                <div className="space-y-2 bg-muted/50 p-3 rounded-xl border border-dashed border-border flex flex-col justify-center items-center">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Calculated BMI</label>
                                    <div className="text-2xl font-bold text-primary">
                                        {bmi || "--"} <span className="text-sm font-normal text-muted-foreground">kg/m²</span>
                                    </div>
                                </div>
                            </div>

                            {/* Nurse Notes */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" /> Triage Notes
                                </label>
                                <textarea
                                    name="notes"
                                    className="w-full h-32 p-4 bg-background border border-input rounded-xl focus:ring-2 focus:ring-accent resize-none"
                                    placeholder="Patient appears stable. Complains of..."
                                    value={vitals.notes}
                                    onChange={handleVitalsChange}
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 shadow-lg transition-all"
                                >
                                    Submit to Doctor
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-12 text-center bg-muted/10">
                        <div className="bg-muted p-6 rounded-full mb-4">
                            <Activity className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">No Patient Selected</h3>
                        <p>Select a patient from the queue to start triage.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
