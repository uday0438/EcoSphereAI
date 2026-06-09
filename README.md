# EcoSphere AI 🌍 — Climate Operating System & Eco Arcade

EcoSphere AI is a premium, Gen Z-inspired carbon footprint simulator, AI sustainability coach, and gamified climate action hub. Tailored for India's environmental landscape and powered by Google Gemini (Vertex AI), it transforms daily habits and sustainability education into a high-fidelity interactive experience.

---

## 🚀 Chosen Vertical: Environmental & Sustainability Assistant

EcoSphere AI targets personal carbon footprint management, lifestyle optimization, and sustainability education. It gamifies habit formation to help users align with the United Nations Sustainable Development Goals (SDGs) and India's official **Mission LiFE (Lifestyle for Environment)** campaign.

---

## 🎨 Design Philosophy
- **Rich Aesthetics**: Tailored dark-mode UI utilizing harmony palettes, HSL glows, glassmorphism accents, and smooth hover scales.
- **Dynamic Feedback**: Viewport-triggered progress loaders, custom HSL border states, and fluid micro-animations using Framer Motion.
- **Premium UX**: Standardized for global sustainability presentations (investor, corporate, or institutional showcases).

---

## 🛠️ Architecture & Core Features

### 1. AI Sustainability Coach (Powered by Gemini)
- Connects to a backend Express app forwarding prompts to the **Gemini 2.5 Flash** model.
- Instructed with a specialized system prompt enforcing **hyper-localized Indian recommendations** (Delhi/Namma Metro, solar rooftop subsidies, Swachh Bharat recycling, and local e-waste services).
- Integrates prompt-injection heuristics and input validation to guarantee secure and reliable responses.

### 2. Indian Impact Simulator
- Customized carbon math engine based on official Indian emissions metrics:
  - **Grid Electricity**: CEA grid intensity of `0.82 kg CO2/kWh` (coal-heavy grid baseline).
  - **Private Transit**: Petrol/CNG cars at `0.143 kg CO2/km`, two-wheelers at `0.044 kg CO2/km`.
  - **Public Transit**: CNG Auto-rickshaws at `0.065 kg CO2/km`, Delhi/Namma Metro at extremely low baselines.
- Calculates carbon output relative to the average urban Indian baseline footprint of **2.8 Tons CO₂/year**.
- Integrates mocks for local utility providers (e.g., BESCOM, Tata Power) and wearable fitness sync.

### 3. Eco Arcade (20 Premium Mini-Games)
An interactive hub with 20 distinct games teaching climate literacy, resource conservation, and waste management:
- **Shuffled Layout**: The games order randomly shuffles upon load, and users can manually re-shuffle the grid using the **🔀 Shuffle List** button in the header.
- **Gameplay Randomization**: Logic for questions, options, scenarios, and matching cards is randomized at runtime in key games (e.g., *Climate Quiz Arena, Sustainable Shopping, Green Transport, Carbon Footprint Match, and Crisis Manager*) to ensure replayability.
- **State Persistence**: Completed games, unlocked badges, and session XP are stored persistently in the browser's `localStorage` across page reloads.
- **Visual Celebrations**: Features five distinct particle and overlay animation presets (e.g., *Floating Leaves, Forest Burst, Ocean Waves, Energy Pulse, Earth Glow*) triggered dynamically upon game completion.

### 4. UN Sustainable Development Goals Impact
- Renders alignment metrics showcasing the platform's contribution to:
  - **SDG 13 (Primary)**: Climate Action (87% alignment)
  - **SDG 12**: Responsible Consumption & Production (74% alignment)
  - **SDG 11**: Sustainable Cities & Communities (68% alignment)
  - **SDG 7**: Affordable & Clean Energy (81% alignment)
  - **SDG 4**: Quality Education (92% alignment)
  - **SDG 3**: Good Health & Well-Being (78% alignment)
- Includes progress bars that animate from 0% on scroll and a detailed visual **SDG Impact Dashboard**.

### 5. Eco Scan (Integrated ScanGreen)
- **Intelligent Product Scanner**: Analyzes product photos to determine plastic load, calculate an Eco-Score (0-100), identify synthetic components, and suggest eco-friendly alternatives.
- **Environment/Room Audit**: A 7-point multi-modal computer vision scanner that evaluates any room image:
  - *Polymer Heatmap*: Highlights and labels synthetic vs organic items.
  - *Ghost Carbon*: Lifecycle CO₂ footprint of items in view.
  - *Decomposition*: Breakdown lifespan comparison vs organic benchmarks.
  - *Toxin Detective*: Health risk and VOC alert rating.
  - *Faux-Natural Buster*: Identifies greenwashed synthetic materials.
  - *Circular Economy*: Recyclability index.
  - *Ocean Impact*: Equivalent plastic straws marine burden.
- **"Greeny" Voice Assistant**: A floating AI bot utilizing native Web Speech APIs (STT / TTS) for hands-free conversational sustainability coaching.

---

## ⚙️ How it Works & Assumptions Made
- **Grid Carbon Baseline**: Average Indian grid emissions average ~0.82 kg CO₂ per kWh consumed, which is significantly higher than western countries due to coal heavy grids. Reducing home electricity usage yields a much larger relative impact.
- **Diet Emissions**: Replaces beef/mutton dishes with millet-based or organic vegetarian dishes, reducing individual meal carbon footprints from `4.5 kg CO2` down to under `0.5 kg CO2`.
- **Active Commutes**: Active walking or cycling emits `0.0 kg CO2/km` and yields a health stats multiplier.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/uday0438/EcoSphereAI.git
   cd EcoSphereAI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your API Key in a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## ☁️ Vercel Deployment Ready

This repository contains a Vercel routing configuration (`vercel.json`) that enables a serverless full-stack Vite + Node/Express deployment:
- All static files are built and served dynamically by Vercel's global CDN.
- The Node/Express API routes `/api/*` are handled by a serverless function defined at `api/index.ts`.

### How to Deploy
1. Click **New Project** in Vercel.
2. Connect your GitHub repository: `https://github.com/uday0438/EcoSphereAI.git`.
3. Vercel will automatically detect the Vite template.
4. **Environment Variables**: Add your `GEMINI_API_KEY` in the Environment Variables section.
5. Click **Deploy**. Vercel will build the frontend and serve the backend API serverlessly.
