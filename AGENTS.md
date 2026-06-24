# Agent Instructions for Carbon App

## Brand and Structure Rules
- Reuse the shared Rural Utility Cost brand identity.
- Keep the master site as the source of truth.
- The Carbon app must clearly feel like part of the Rural Utility Cost ecosystem.
- Professional, authoritative, and clinical tone.
- App name: Carbon (URL: carbon.ruralutilitycost.com)

## Visual & UX Guidance
- Clean, analytical, trustworthy, practical, and modern.
- Mobile-friendly, card-based, structured, and data-first layout.
- Subtle green, charcoal, and blue accents.
- Strong hierarchy with no clutter.
- Maintain a "Technical Dashboard" style with high contrast for readability.

## SEO and Accessibility Constraints
- Maintain mobile-first responsive design.
- Enforce strict Accessibility (WCAG 2.1) guidelines (ARIA labels, alt text, tab indexing).
- Keep the Google Analytics gtag snippet in `index.html`.
- Maintain SEO meta tags and JSON-LD structured data.

## Vibe Coding Standards
### 1. Role & Process Rules
**The PIV Workflow Constraints**
You must strictly follow the Plan-Implement-Validate (PIV) loop for every task:
- **PLAN FIRST**: Before modifying or creating any code, explain your plan in markdown bullet points. List the exact files you will touch. Wait for human approval.
- **IMPLEMENT INCREMENTALLY**: Write clean, modular code. Do not write placeholder comments like `// TODO: implement later`.
- **VALIDATE**: After writing code, output a summary of changes and ask the user to verify or run tests.

**Documentation Maintenance**
- After completing a task, you must automatically update `TASKS.md` to check off the item.
- If you introduce a new architectural pattern, note it in `docs/DECISIONS.md`.

### 2. Project Task Board (`TASKS.md`)
This serves as your agent's Kanban board. It tracks Active Sprints, Future Backlogs, and completed tasks.

### 3. Project Documentation Registry
Priority documentation lives in `/docs/`:
- `PRD.md`: Product Requirements Document
- `SYSTEM_DESIGN.md`: Design System / Style Guide
- `ARCHITECTURE.md`: Site Architecture & URL Map
- `DATA_MODELS.md`: Data Models & Schema
- `API_SPEC.md`: API & Integrations Spec
- `USER_FLOWS.md`: User Flows & Journey Maps
- `SEO_STRATEGY.md`: SEO Strategy Document
- `REVENUE_LOGIC.md`: Revenue & Pricing Logic
- `COMPONENTS.md`: Component Library Spec
- `EMAILS.md`: Email Templates Spec
- `AUTH.md`: Auth & Permissions Matrix
- `RUNBOOK.md`: Admin & Ops Runbook
- `ANALYTICS.md`: Analytics & KPI Spec
- `NFC_SPEC.md`: NFC Implementation Spec
- `CHANGELOG.md`: Changelog
- `BACKLOG.md`: Task Backlog
- `DECISIONS.md`: Known Issues & Decisions Log