# OpenWork  
### AI-Enabled Employee Feedback Platform for Managerial Development  

---

## Project Overview  

OpenWork is an AI-enabled, privacy-first employee feedback platform designed to transform anonymous employee voice into **actionable managerial development insights**.

Traditional feedback systems focus on collecting data but fail to translate it into meaningful action. OpenWork addresses this gap by acting as a **translation mechanism**, converting feedback into structured development summaries, behavioral insights, and personalized learning plans.

---

## Objective  

The goal of this project is to:

- Enable **anonymous, psychologically safe feedback**
- Transform feedback into **actionable insights using AI**
- Support **managerial development (not evaluation)**
- Bridge the gap between **feedback collection → organizational learning**

---

## System Architecture  

The system follows a structured pipeline:

1. **Input Layer**
   - Anonymous employee feedback (ratings + qualitative input)

2. **Processing Layer**
   - Aggregation (minimum threshold)
   - Anonymization (no PII stored)

3. **AI Interpretation Layer**
   - Theme extraction
   - Pattern detection
   - Insight generation

4. **Output Layer**
   - Manager view → Development insights & learning plans  
   - Leadership view → Aggregated analytics  

5. **Learning Loop**
   - Feedback → Insights → Manager action → Improved experience

---

## Technology Stack  

- **Frontend:** React / Next.js  
- **Backend:** Node.js  
- **Database:** PostgreSQL  
- **AI Engine:** Claude API (or mock AI outputs)  
- **Auth:** JWT + Role-Based Access Control (RBAC)  

---

## User Roles  

### Employee
- Submit anonymous feedback  
- Provide ratings + qualitative input  

### Manager
- View AI-generated insights:
  - Strengths  
  - Growth areas  
  - Learning plans  

Managers cannot see raw feedback or identities  

### Leadership
- View aggregated insights  
- Analyze trends across teams  

---

## Key Workflows  

### 1. Feedback Submission
- Employee submits feedback  
- Data stored anonymously  

### 2. Data Processing
- Feedback aggregated (threshold ≥ N)  
- PII removed  

### 3. AI Insight Generation
- Themes extracted  
- Insights generated  
- Development plans created  

### 4. Manager View
- Manager receives structured insights  
- Uses them for improvement  

---

## Validation & Testing  

This system was validated through user walkthroughs and expert feedback.

### ✔ Test Cases

**Test 1: Anonymous Feedback**
- Input: Employee feedback  
- Output: No identity stored  
- Result: Passed  

**Test 2: Aggregation Threshold**
- Input: Less than required responses  
- Output: No insights shown  
- Result: Passed  

**Test 3: AI Insight Generation**
- Input: Aggregated feedback  
- Output: Development insights + plans  
- Result: Passed  

**Test 4: Role-Based Access**
- Employee → Cannot view insights  
- Manager → Cannot view raw feedback  
- Leadership → Only aggregated data  
- Result: Passed  

---

## Key Findings  

- AI-generated insights are more useful than numerical metrics  
- Trust and anonymity are critical for adoption  
- Users want **feedback-to-action visibility**  
- Development-focused feedback improves engagement  

---

## Repository Structure  
/frontend → UI components
/backend → API logic
/database → schema
/ai → AI processing logic
/docs → screenshots & diagrams
/tests → validation scenarios


---

## How to Run  

1. Clone the repository  
2. Install dependencies  
3. Set environment variables (DB + API keys)  
4. Run frontend and backend  

---

## Demo & Evidence  

- Prototype walkthrough: [Add Video Link]  
- Screenshots: `/docs` folder or Appendix A  
- Data analysis: See Appendix C in report  

---

## Ethical Considerations  

- No PII stored  
- Aggregated reporting only  
- AI used for development, not evaluation  
- Human review recommended  

---

## Contribution  

OpenWork demonstrates how feedback systems can evolve from **measurement tools → learning systems**, enabling organizations to convert employee voice into actionable managerial development.

---

## Author  

Surabhi Chavan  
MIS 790 – Culminating Experience  

---
