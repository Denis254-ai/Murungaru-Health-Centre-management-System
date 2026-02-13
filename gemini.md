# Project Constitution: Murungaru HealthCare Management System

## 1. Data Schema (The Project Law)
*Schema is defined here. Code must match this structure.*

### Core Entities (SQL Tables)

#### `patients`
- `id`: UUID (Primary Key)
- `phone`: String (Unique, Auth)
- `full_name`: String
- `dob`: Date
- `gender`: String
- `created_at`: Timestamptz

#### `vitals` (Triage)
- `id`: UUID
- `patient_id`: UUID (FK)
- `systolic`: Int
- `diastolic`: Int
- `heart_rate`: Int
- `temperature`: Float
- `sp_o2`: Int
- `recorded_at`: Timestamptz
- `staff_id`: UUID (FK)

#### `consultations`
- `id`: UUID
- `patient_id`: UUID (FK)
- `doctor_id`: UUID (FK)
- `mch_notes`: Text (Nullable, for Maternal Child Health)
- `clinical_notes`: Text
- `diagnosis`: Text
- `status`: Enum ('waiting', 'in_progress', 'completed')

#### `inventory`
- `id`: UUID
- `item_name`: String
- `category`: String (e.g., 'Medicine', 'Equipment')
- `stock_level`: Int
- `reorder_point`: Int
- `unit`: String

### JSON Payloads (API/AI)

#### `DaktariAI_Response`
```json
{
  "triage_analysis": "String",
  "recommendation": "String",
  "urgency_level": "low|medium|high|critical"
}
```

## 2. Behavioral Rules
- **Protocol:** B.L.A.S.T.
- **Architecture:** A.N.T. (3-Layer).
- **Identity:** Principal Software Engineer.
- **Privacy:** Row Level Security (RLS) is MANDATORY for all patient data.
- **UI Tone:** "Bio-Digital Minimalism". Clean, medical, professional.
- **Tech Stack:** Next.js, Supabase, Tailwind, React Query, Gemini API.

## 3. Architectural Invariants
- **Auth:** Supabase Phone Auth.
- **State Management:** React Query (Server State) + Zustand (Client State if needed).
- **Styling:** Tailwind CSS. Font: Poppins (from reference). COLORS: Deep Blue/Medical Green (from reference).
- **AI:** Gemini Flash for Triage analysis.

## 4. Maintenance Log
- [Init] Project initialized. Waiting for Discovery.
