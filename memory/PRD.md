# LeadLens - Anonymous Employee Feedback Platform

## Overview
LeadLens is an internal organizational platform where employees submit anonymous, structured feedback about their managers and domains/projects. Leadership/Admin can view aggregated insights and AI-generated development summaries.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **State**: React Context + localStorage (prototype)
- **Auth**: MOCKED with localStorage (demo credentials below)

## Demo Credentials
- **Leadership/Admin**: `admin@leadlens.io` (any password)
- **Employee**: `employee@leadlens.io` (any password)

## Features
### Employee
- Browse domains and projects
- Submit anonymous feedback with star ratings (1-5) and free text
- Privacy-first: no employee identifiers stored with feedback

### Leadership (Admin)
- Aggregated dashboard with metrics, trend charts, rating distributions
- Manager Insights with per-manager aggregated data
- Domain Insights with per-domain aggregated data
- AI-generated development summaries, strengths, improvements, 30-60-90 plans
- CRUD for Domains, Projects, Managers, Users (role assignment)

### Privacy & Security
- Anonymity threshold (MIN_RESPONSES = 5) - data hidden below threshold
- No raw feedback rows shown in UI - only aggregates
- Role-based access control (Employee vs Leadership)

## Seed Data
- 5 domains, 10 projects, 10 managers, ~150 feedback rows
- Pre-generated AI summaries for demo

## Important Notes
- **Authentication is MOCKED** - uses localStorage, not a real auth provider
- **AI summaries are MOCKED** - pre-generated content, no real AI API calls
- **Data persistence is MOCKED** - uses localStorage, not a real database
- This is a frontend prototype demonstrating the full UX flow
