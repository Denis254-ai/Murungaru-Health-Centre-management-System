# Master Blueprint: Murungaru HMS

## 1. System Architecture
**Type:** Full-Stack Web Application (PWA capabilities).
**Framework:** Next.js 14+ (App Router).
**Language:** TypeScript (Strict Mode).
**Styling:** Tailwind CSS + "Bio-Digital Minimalism" Design System.
**State:** React Query (Server), Zustand (Client - minimal).

## 2. Directory Structure
```
src/
├── app/
│   ├── (auth)/             # Authentication Routes
│   │   └── login/
│   ├── (portal)/           # Protected Portals
│   │   ├── patient/        # Mobile-first Patient Dashboard
│   │   ├── staff/          # Desktop-optimized Clinician Dashboard
│   │   └── admin/          # Inventory & Stats
│   ├── api/                # Next.js API Routes (Gemini Proxy)
│   └── layout.tsx
├── components/
│   ├── ui/                 # Atomic UI Components (Buttons, Inputs)
│   ├── functional/         # Business Logic Components (TriageForm, VitalsChart)
│   └── layout/             # Sidebars, Headers
├── lib/
│   ├── supabase/           # Client & Server Clients
│   ├── gemini/             # AI Logic
│   └── utils.ts            # Helpers
└── styles/
    └── globals.css         # Tailwind directives + Custom Fonts
```

## 3. Data Flow Strategy
1.  **Frontend**: React Query fetches data from Supabase via Client SDK.
2.  **Backend (Supabase)**:
    *   **Auth**: Phone Number OTP.
    *   **Database**: PostgreSQL with RLS.
    *   **RLS Policies**:
        *   `patients`: Select/Update own rows.
        *   `staff`: Select/Insert/Update all rows (based on role).
3.  **AI Layer**:
    *   Route: `/api/triage`
    *   Input: Symptoms, Vitals.
    *   Process: Gemini Flash 1.5.
    *   Output: `DaktariAI_Response` (JSON).

## 4. Portals Breakdown

### Patient Portal (`/patient`)
*   **Focus**: Simplicity, Speed, Mobile-first.
*   **Features**:
    *   AI Chat (Floating Action Button).
    *   Medical History Card.
    *   Upcoming Appointments.
    *   Prescriptions View.

### Staff Portal (`/staff`)
*   **Focus**: Efficiency, Data Density.
*   **Features**:
    *   Queue Management (Triage List).
    *   Patient Lookup.
    *   Consultation Mode (Vitals + Notes input).
    *   MCH Vitals Tracker.

### Admin Portal (`/admin`)
*   **Focus**: Oversight.
*   **Features**:
    *   Inventory Table (CRUD).
    *   Facility Statistics (Charts).
    *   User Management (Staff Roles).

## 5. Security & Compliance
*   **RLS**: Enabled on ALL tables.
*   **Validation**: Zod schemas for all inputs.
*   **Audit**: `updated_at` triggers on all tables.
