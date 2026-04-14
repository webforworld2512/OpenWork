# OpenWork - Anonymous Employee Feedback Platform

## Overview
OpenWork is an internal organizational platform where employees submit anonymous, structured feedback about their managers and business units. Leadership/Admin sees aggregated insights, and Managers receive personalized growth-focused development plans — all powered by AI.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **State**: React Context + localStorage (prototype)
- **Auth**: MOCKED with localStorage

## Demo Credentials
- **Leadership/Admin**: `admin@openwork.io` (any password)
- **Employee**: `employee@openwork.io` (any password)
- **Manager**: `manager@openwork.io` (any password)

## Three Roles
### Employee
- Browse business units and initiatives
- Submit anonymous feedback with star ratings (1-5) and free text
- Privacy-first: no employee identifiers stored with feedback

### Manager (NEW)
- View aggregated development insights from team feedback
- Development summaries, strengths, growth opportunities, behavioral insights
- Personalized 30-60-90 day growth plan with learning resources
- All data fully aggregated and anonymized (threshold enforced)
- Framed as learning & development tool, not evaluation

### Leadership (Admin)
- Aggregated dashboard with metrics, trend charts, rating distributions
- Manager Insights with per-manager aggregated data + AI summaries
- Business Unit Insights with per-unit aggregated data
- CRUD for Business Units, Initiatives, Managers, Users (role assignment)

## Terminology
- "Domain" → "Business Units" (Engineering, HR, Accounting & Finance, Sales, Marketing, Operations, Design, Data Science)
- "Projects" → "Initiatives" (Digital Transformation, HR Process Automation, etc.)

## Seed Data
- 8 business units (including non-technical: HR, Accounting, Sales)
- 14 initiatives (large-scale, cross-functional)
- 12 managers, 7 users, ~180 feedback rows

## Important Notes
- **Authentication is MOCKED** - uses localStorage, not a real auth provider
- **AI summaries are MOCKED** - pre-generated content, no real AI API calls
- **Data persistence is MOCKED** - uses localStorage, not a real database
