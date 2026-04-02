# Kalpnova Web 3D - Project Documentation

A premium, interactive web experience built with **React**, **Vite**, and **GSAP**, featuring a sophisticated dark-themed design system with 3D-inspired aesthetics.

---

## 🏠 Home Page Breakdown
The Home page serves as the primary landing hub, designed to convert "random looking" brands into "premium looking" identities.

### 1. Hero Section
*   **Visual Logic**: Uses a deep black (`#0B0B0C`) base with orange radial glows to create depth.
*   **Animated Elements**: 
    *   **GSAP Text Entrance**: Smooth upward stagger animation for headers.
    *   **Interactive Lines**: Background line patterns that add a technical, precise feel.
    *   **Subtle Grid**: A low-opacity 60px grid overlay to enhance the "design system" look.
*   **CTAs**: Direct links to WhatsApp ("Chat Now") and a "Get A Quote" action.

### 2. Services Section
*   Displays core business offerings (Web 3D, Branding, etc.) using a clean, high-contrast layout.

### 3. Testimonials & Clients
*   **Social Proof**: Dedicated sections to showcase client logos and feedback, building trust through minimal yet elegant typography.

### 4. Contact Section
*   A direct engagement point featuring a custom contact form and direct contact details.

---

## 📂 Portfolio Page Breakdown
The Portfolio is designed as a "digital archive," utilizing a unique physical-metaphor UI.

### 1. Work Portfolio Grid (`workportfolio.jsx`)
*   **Folder-Style UI**: Each project is housed in a "dark folder" container.
    *   **Folder Tab**: A visual handle at the top of each card.
    *   **Folder Body**: The main project thumbnail with a deep border and glow.
*   **Hover Interaction**:
    *   Card lifts vertically (`translate-y-1`).
    *   Image zooms slightly.
    *   "View Case Study" overlay fades in with an orange accent (`#ff6b2b`).

### 2. Project Detail View (`ProjectDetail.jsx`)
*   **Sticky Back Header**: A floating navigation bar that allows users to return to the collection easily.
*   **Narrative Flow**: 
    *   **The Challenge**: Contextual background on the problem.
    *   **The Strategy & Solution**: Detailed breakdown of our approach.
*   **Stats Dashboard**: A dedicated "Measurable Impact" section displaying key performance indicators (KPIs).
*   **Side Info Bar**: Sticky sidebar listing specific **Deliverables** (tags) and the **Industry**.
*   **Visual Identity Gallery**: A multi-layout grid showcasing high-resolution project assets and interfaces.

---

## 🏗 Core Layout & Components
These elements are persistent across the application to ensure a unified user experience.

| Component | Description |
| :--- | :--- |
| **Navbar** | A glassmorphism-inspired navigation bar with smooth link transitions and a mobile menu. |
| **Footer** | A structured site map with secondary CTA buttons and quick contact access. |
| **Grain Overlay** | A global pixel-noise layer that gives the site a "cinematic" and tactile film texture. |
| **ScrollToTop** | A utility component that ensures the browser scroll resets to the top on every route change. |

---

## 🛠 Tech Stack
*   **Frontend**: React.js (Hooks, Router)
*   **Styling**: Tailwind CSS
*   **Animations**: GSAP (GreenSock Animation Platform)
*   **Build Tool**: Vite
*   **Icons/Assets**: Lucid Icons & Custom SVG components.
