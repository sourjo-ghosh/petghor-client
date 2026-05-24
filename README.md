# 🐾 PetGhor — Find Your Forever Friend

[![Next.js Version](https://img.shields.io/badge/Next.js-v16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-v19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![HeroUI](https://img.shields.io/badge/HeroUI-Interactive-FF5A5F?style=for-the-badge)](https://heroui.com/)
[![Deployment Status](https://img.shields.io/badge/Deployment-Vercel-green?style=for-the-badge&logo=vercel)](https://petghor.vercel.app)

Welcome to **PetGhor**, a premium full-stack pet adoption portal engineered using **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. PetGhor simplifies the journey of matching lovable pets (dogs, cats, rabbits, birds, and more) with caring owners, offering secure workflows, high-performance search engine indexing (SEO), and a beautiful glassmorphic dashboard.

---

## 🌟 Key Features

### 🏡 Beautiful Landing Page
*   **Hero Section**: Stunning visual design, call-to-actions, and dynamic page entrances.
*   **Latest Pets Showcase**: Displays the six most recently listed pets fetched dynamically from the database.
*   **Why Adopt Section**: Educative and engaging visual grids detailing the benefits of pet adoption.
*   **Success Stories & Pet Care Tips**: Engaging community reviews and veterinary-approved guides.

### 🔍 Advanced Pet Discovery (`/all-pets`)
*   **Real-time Filters**: Seamlessly filter pets by species (Dog, Cat, Rabbit, Bird, etc.) instantly.
*   **Dynamic Search Bar**: Query pets by name or breed in real-time.
*   **Clean Grid Layouts**: Fully responsive item cards with micro-interactions, displaying essential details like location, age, gender, and price tag.

### 📝 Seamless Adoption Flow (`/all-pets/[id]`)
*   **Rich Profile Views**: Dynamically populated profiles displaying vaccination status, health status, adoption fees, and species categories.
*   **Automated Validation**: Restricts users from submitting adoption requests for their own listed pets.
*   **Pickup Scheduler**: Interactive scheduler selecting custom dates and personal motivations before submission.
*   **Sonner Notifications**: Immediate high-fidelity toast responses detailing status updates.

### 🛡️ Secure Authentication
*   Fully integrated with **Better Auth** using a secure Mongo database adapter.
*   Supports **Google Social OAuth** and traditional **Email/Password credentials**.
*   Session-based routing protection that securely handles backend authorizations.

### 📊 Glassmorphic User Dashboard (`/dashboard`)
*   **My Requests**: Clean layout showing submitted adoption inquiries, pet thumbnails, date schedules, and colorful status badges (`Pending`, `Approved`, `Rejected`).
*   **My Listings**: Comprehensive list of owned pets with active adoption stats.
*   **Manage Adoptions**: Inline control buttons for pet owners to instantly approve or reject incoming requests.
*   **CRUD Operations**: Add a new pet with full detailed listings, edit listings instantly via state-managed modals, and delete listings safely with toast verification.

---

## 🛠️ Technological Stack

*   **Framework**: Next.js 16 (App Router with Server/Client boundary separation)
*   **Frontend Library**: React 19 (Hooks, Suspense, and Server Components)
*   **UI Components**: HeroUI (formerly NextUI) & Lucide Icons
*   **Styling**: Tailwind CSS v4 + PostCSS with native CSS nested syntax
*   **Animation**: Framer Motion (for physics-based smooth page transitions)
*   **Authentication**: Better Auth with standard MongoDB adapter
*   **Notifications**: Sonner Toaster
*   **Backend & DB**: MongoDB Atlas & secure REST APIs

---

## 📁 Project Architecture & Routes

```bash
petghor/
├── public/                 # Static assets (favicons, community images)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── all-pets/       # Browse and Filter pets
│   │   │   ├── [userId]/   # Dynamic Pet Details & Dynamic Metadata
│   │   │   │   └── adopt/  # Interactive Adoption Form
│   │   ├── dashboard/      # Secure Glassmorphic Dashboard
│   │   ├── login/          # Better Auth login flow
│   │   ├── register/       # Secure registration
│   │   ├── lib/            # Shared utilities (auth configs, db-actions, fetchers)
│   │   │   ├── actions.js  # Server/Client mutations (approve/reject/adopt/CRUD)
│   │   │   ├── auth.js     # Better Auth server initialization
│   │   │   ├── auth-client.js # Client-side auth session hook
│   │   │   └── data.js     # Data-fetching wrappers
│   │   ├── layout.js       # App-wide layouts, Google Fonts & custom SEO templates
│   │   └── page.js         # Home page server component
│   └── components/         # Reusable layouts, footers, & showcases
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of the project and populate the following keys:

```env
# Authentication Keys
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000 # Or your deployed Vercel URL
BASE_URL=http://localhost:3000

# Backend Services URL
NEXT_PUBLIC_SERVER_URL=https://petghor-server.vercel.app

# Google OAuth Integration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Database Integration
MONGODB_USER=your_mongo_username
MONGODB_PASS=your_mongo_password
MONGODB_URI=your_complete_mongodb_connection_string
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sourjo-ghosh/petghor-client.git
cd petghor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience **PetGhor**.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📦 Deployment

PetGhor is built to deploy seamlessly on the **Vercel Platform**. 

*   During setup, ensure all `.env` keys listed above are configured in the Vercel Project Settings.
*   Configure the correct server redirect mappings for **Google Cloud Console OAuth credentials** to point to `https://your-domain.vercel.app/api/auth/callback/google`.

---

## 💙 Support & Contribution

If you love this project, please consider giving it a star! For queries, issues, or suggestions, feel free to open a pull request or contact the support shelter team at [PetGhor Support](mailto:support@petghor.com).
