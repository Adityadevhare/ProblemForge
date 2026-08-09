# Forge Your Path

Build a React + Vite frontend for ProblemForge — a problem statement discovery platform.

## 🔗 API Integration

- Base URL: http://localhost:8000/api

- Endpoints:

  - GET /problems → List with filters (domain, difficulty, tech, duration, limit, offset)

  - GET /problems/{id} → Single problem

  - GET /search?q=... → Search with filters

  - GET /random → Random problem

  - GET /metadata → Stats (domains, difficulties, techs, durations)

## 🎨 Design System

- Background: #0B1120 (deep space)

- Surface: rgba(255,255,255,0.05) with backdrop-filter: blur(12px)

- Border: rgba(255,255,255,0.08)

- Primary: #7C3AED (purple)

- Accent: #06B6D4 (cyan) — use ONLY for interactions/hover

- Text: #FFFFFF (headings), #94A3B8 (body)

- Gradient: linear-gradient(135deg, #7C3AED, #06B6D4)

- Fonts: Space Grotesk (headings) + Inter (body)

## 📱 Components Required

### 1. Navbar (Visible)

- Left: "⚒ ProblemForge" (logo + brand name, purple gradient text)

- Center: Problems | Categories | How It Works

- Right: "Surprise Me" button (purple gradient)

- Mobile: Collapsible hamburger menu

### 2. Hero Section

- Small eyebrow: "PROBLEM DISCOVERY PLATFORM"

- Headline: "Find a problem worth solving." (gradient on "worth solving")

- Subtext: "Explore meaningful problem statements tailored to your skills, interests, and constraints."

- Massive search bar (centered, glassmorphism)

  - Placeholder rotates: "Search 'AI problems for healthcare'" → "Search 'beginner Python projects'" → "Search 'weekend hackathon ideas'"

  - Purple border on focus → Cyan glow transition

  - Submit button with gradient

- Suggestion chips under search: "AI + Healthcare" · "Python + Beginner" · "Weekend Hackathon"

- "Surprise Me" button (secondary, with ⚒ icon)

- Stats (dynamically from /api/metadata):

  - {total_problems}+ Problems

  - {domains_count} Domains

  - {difficulties_count} Difficulty Levels

  - {techs_count} Technologies

### 3. Filter Bar

- Dropdowns: Domain ▼ | Difficulty ▼ | Tech Stack ▼ | Duration ▼

- "Clear Filters" button

- Active filters shown as tags (removable)

- Responsive: dropdowns stack vertically on mobile

### 4. Problem Cards (Glassmorphism Grid)

- Grid: 3 columns (desktop) → 2 (tablet) → 1 (mobile)

- Each card:

  - Domain badge (purple, small)

  - Title (large, Space Grotesk)

  - Summary (2-3 lines, Inter, #94A3B8)

  - Tags (cyan or purple chips)

  - Difficulty + Duration metadata

  - "View Problem →" button (cyan hover)

- On hover: border glow, slight lift, background brightens

### 5. Problem Detail Page (/problems/{id})

- Back button

- Domain badge

- Title

- Difficulty, Tech Stack, Duration (metadata pills)

- Problem Background

- Target Users (list)

- Constraints (list)

- Resources Provided (list)

- Desired Outcomes (list)

- Large "Solve This Problem" CTA (gradient)

### 6. Search Results Page

- Shows query + result count

- Same card grid

- Filter bar above results

### 7. Loading States

- Skeleton loaders for cards

- Loading spinner for search/filter

### 8. Error Handling

- API error toast notifications

- "No results found" empty state

## 🔧 Technical Requirements

- Use React Router DOM for navigation

- Use Axios for API calls

- Create a centralized API client

- Use React Context or Zustand for state (search filters, problems list)

- Tailwind CSS with custom configuration for design tokens

- Mobile-first responsive

## ✅ Important Constraints

- Do NOT add additional primary colors (only purple + cyan)

- Do NOT use stock photos or illustrations

- Do NOT add testimonials, pricing, or login

- The search bar is the HERO — keep it prominent

- All stats must come from /api/metadata (no hardcoding)

- Cards must not be overloaded — keep them clean

## 🚀 Pages to Build

1. Home (/) → Hero + FilterBar + ProblemGrid

2. Problem Detail (/problems/:id)

3. Search Results (/search?q=...)

4. Categories (/categories) — optional

5. How It Works (/how-it-works) — optional

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/179264b2-3bce-4684-9f09-44dcf512e86d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
