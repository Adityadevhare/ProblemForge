# ⚡ ProblemForge

> **Discover. Explore. Build.**
>
> A modern problem-statement discovery platform designed to help students, developers, and hackathon participants find meaningful problems to solve.

ProblemForge transforms the process of finding project and hackathon ideas into a structured, searchable experience.

Instead of endlessly searching through random websites, students can explore curated problem statements, filter them by domain, difficulty, technology, and duration, and instantly dive into the details of a problem that interests them.

---

## 🚀 Why ProblemForge?

Finding a good project idea is often harder than building the project itself.

Students frequently face questions like:

- 💭 *What should I build?*
- 🎯 *Which domain should I work in?*
- 🧠 *Is this problem suitable for my skill level?*
- 🛠️ *What technologies can I use?*
- ⏱️ *Can I realistically complete it within my available time?*

**ProblemForge is built to solve exactly that problem.**

It provides a centralized platform where users can discover and evaluate problem statements based on their interests, skills, and constraints.

---

# ✨ Features

### 🔎 Smart Problem Discovery

Search through problem statements using keywords and instantly find relevant ideas.

### 🎯 Advanced Filtering

Filter problems based on:

- Domain
- Difficulty
- Technology / Tech Stack
- Duration
- Tags

Filters can also be combined to narrow down the results.

### 🎲 Surprise Me

Not sure what to build?

Let ProblemForge randomly select a problem for you.

### 📄 Detailed Problem Pages

Every problem provides structured information including:

- Problem description
- Domain
- Difficulty
- Technology stack
- Expected duration
- Tags
- Objectives
- Deliverables

### 📊 Platform Metadata

The backend dynamically provides metadata such as:

- Available domains
- Difficulty levels
- Technologies
- Durations
- Tags

This allows the frontend to build its filtering and statistics UI dynamically.

### 📱 Responsive UI

Designed to work across:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

### 🌌 Modern Glassmorphism Design

ProblemForge uses a modern dark interface with:

- Deep-space background
- Glassmorphism cards
- Purple primary accents
- Cyan interaction accents
- Smooth transitions
- Minimal visual clutter

---

# 🧩 Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Development & build tooling |
| TypeScript | Type-safe frontend development |
| TanStack Router | File-based routing |
| TanStack Query | Server-state & API management |
| Zustand | Client-side state management |
| Axios | HTTP communication |
| Tailwind CSS | Styling |
| Shadcn/UI | Reusable UI components |

## Backend

| Technology | Purpose |
|---|---|
| Python 3.12 | Backend language |
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| Pydantic | Data validation |
| JSON | Initial problem dataset |

---

# 🏗️ Architecture

ProblemForge follows a simple frontend/backend architecture:

```text
                         ┌─────────────────────┐
                         │      User           │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │      + Vite         │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    FastAPI API      │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Problem Service    │
                         │  Search / Filters   │
                         │  Random / Metadata  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   problems.json     │
                         │   Problem Dataset   │
                         └─────────────────────┘
