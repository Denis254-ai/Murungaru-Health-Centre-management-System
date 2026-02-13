# Findings & Research

## Discovery Phase
## Discovery Phase
### 1. North Star
- **Outcome:** High-fidelity, user-friendly Hospital Management System (HMS) for Murungaru Health Centre (Level 3 KEPH).
- **Core Problem:** Replace manual records with digital Triage, MCH, and Inventory.
- **Users:** Developers, Doctors, Nurses, Rural Patients (mobile-first).

### 2. Integrations
- **AI:** Google Gemini API ("Daktari AI" logic).
- **Infra:** GitHub, Vercel.
- **Auth:** Supabase Auth (Phone Number).

### 3. Source of Truth
- **Data:** Supabase (PostgreSQL).
- **Strategy:** Manual Mode (Generate `supabase_schema.sql` -> User runs in SQL Editor).

### 4. Delivery Payload
- **Patient Portal:** Mobile-first React dashboard + AI Chat.
- **Staff Portal:** Desktop-optimized (Triage/Consults).
- **Admin/Pharmacy Portal:** Inventory & Stats.

### 5. Behavioral Rules
- **Identity:** Principal Software Engineer (Google Standard).
- **Compliance:** MoH Kenya standards, RLS (Row Level Security).
- **Tone:** Bio-Digital Minimalism (Professional, Medical, Minimalist).
- **Tech Rules:** TypeScript (Strict), React-Query.
