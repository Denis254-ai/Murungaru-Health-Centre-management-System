# Murungaru Health Care Management System

![Project Banner](public/banner-placeholder.png) <!-- Replace with actual banner if available, or remove -->

> **A Bio-Digital Minimalist Hospital Management System (HMS) tailored for Level 3 Health Centres.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 📋 Overview

The **Murungaru Health Care Management System** is a modern, high-performance digital solution designed to streamline the operations of Murungaru Health Centre. Built with a "Bio-Digital Minimalism" aesthetic, it focuses on clarity, efficiency, and clinical precision.

This system replaces manual paper records with a secure, cloud-based platform for Triage, Maternal & Child Health (MCH), Inventory Management, and Patient Records.

## ✨ Key Features

-   **🏥 Bio-Digital Minimalist UI**: A clean, distraction-free interface designed for high-stress medical environments.
-   **🤖 Daktari AI Integration**: Powered by Google Gemini, providing intelligent triage assistance and symptom analysis.
-   **🔐 Role-Based Access Control**: Secure portals for Admins, Doctors, Nurses, and Pharmacists.
-   **📱 Mobile-First Design**: Fully responsive architecture ensuring accessibility on tablets and mobile devices in the field.
-   **⚡ Real-Time Data**: Powered by Supabase for instant updates on patient status and inventory levels.

## 🛠️ Technology Stack

-   **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Icons)
-   **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime)
-   **AI Engine**: [Google Gemini API](https://deepmind.google/technologies/gemini/)

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.17.0 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A [Supabase](https://supabase.com/) account
-   A [Google Cloud](https://console.cloud.google.com/) account (for Gemini API)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Denis254-ai/Murungaru-Health-Centre-management-System.git
    cd Murungaru-Health-Centre-management-System
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env.local` file in the root directory and add your credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key
    ```

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── src/
│   ├── app/                 # Next.js App Router pages & layouts
│   ├── components/          # Reusable UI components
│   │   ├── functional/      # Logic-heavy components (e.g., Chat, Charts)
│   │   ├── layout/          # Layout components (Header, Sidebar)
│   │   └── ui/              # Primitive UI elements (Buttons, Cards)
│   ├── types/               # TypeScript type definitions
│   └── lib/                 # Utility functions and shared logic
├── public/                  # Static assets
└── tools/                   # Helper scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Denis254-ai**
-   Email: denisngotho70@gmail.com
-   GitHub: [@Denis254-ai](https://github.com/Denis254-ai)

---

*Built with ❤️ for Murungaru Health Centre.*
