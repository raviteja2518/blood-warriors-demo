# 🩸 Blood Warriors AI — Hackathon Demo

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-1.5%20Flash-blue?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Blood Warriors AI** is an intelligent, real-time donor-patient matching platform designed to eliminate emergency blood shortages through automated geographical matching and multilingual AI outreach.

---

## ✨ Key Features

* 🧠 **AI-Powered Matching Engine**: Instantly filters and ranks compatible blood donors based on exact blood group match, live GPS proximity (distance in km), and historical willingness scores.
* 🌐 **Multilingual Emergency Outreach**: Powered by Google Gemini AI, generating culturally-aware, urgent WhatsApp outreach messages in **English, Hindi, and Telugu** to maximize donor response rates.
* ⚡ **Live Bridge Simulator**: A real-time dispatch dashboard visualizing active donor outreach, live distance tracking, and hospital fulfillment status.
* 📊 **Comprehensive Analytics**: Live metrics tracking total registered donors, active patient requests, fulfillment success rates, and regional distribution.
* 🛡️ **Built-in Hackathon Fallback Engine**: Fully functional with or without live API keys, ensuring zero downtime during live judge demonstrations.

---

## 🏛️ System Architecture

The platform uses a modern, decoupled full-stack architecture:

```
┌────────────────────────────────────────┐         ┌────────────────────────────────────────┐
│           Next.js Frontend             │         │            FastAPI Backend             │
│   (React 19, Tailwind, Framer Motion)  │ ◄─────► │     (Python 3, Uvicorn, Gemini AI)     │
└────────────────────────────────────────┘  REST   └────────────────────────────────────────┘
```

* **Frontend (`/frontend`)**: Server-Side Rendered (SSR) React application built on Next.js 16, featuring a gorgeous dark-mode enabled UI with Shadcn components.
* **Backend (`/backend`)**: High-performance asynchronous Python API built on FastAPI, handling complex AI prompt generation and donor ranking algorithms.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18+)
* Python (v3.9+)

### 1. Start the FastAPI Backend
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*The backend will be live at `http://localhost:8000`.*

### 2. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
*The frontend will be live at `http://localhost:3000`.*

---

## ☁️ Production Deployment

This project is pre-configured for a **Hybrid Deployment** model (Vercel + Render).

### Deploying Backend to Render
1. Create a New Web Service on [Render](https://render.com).
2. Connect your GitHub repository and set **Root Directory** to `backend`.
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
5. *(Optional)* Add `GOOGLE_API_KEY` to Environment Variables.

### Deploying Frontend to Vercel
1. Import your repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   * `NEXT_PUBLIC_API_URL`: `https://your-render-backend-url.onrender.com`
4. Click **Deploy**.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Shadcn UI.
* **Backend**: Python 3, FastAPI, Uvicorn, Pydantic.
* **AI & Data**: Google Generative AI (Gemini 1.5 Flash), Supabase.

---
*Built with ❤️ for the Hackathon.*
