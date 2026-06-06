# BSP IT Risk Compliance Checker

A web-based compliance assessment tool built around **BSP Circular 1140** (Technology Risk Management Framework). Designed to help IT auditors, risk officers, and compliance teams systematically evaluate an institution's adherence to the Bangko Sentral ng Pilipinas' technology risk requirements.

---

## Features

- **24 built-in controls** mapped directly to BSP Circular 1140, grouped across six IT risk domains
- **Compliance dashboard** — live stats for total controls, compliant count, non-compliant count, and not-assessed count, with an animated progress bar showing overall compliance score
- **Domain-grouped checklist** — collapsible sections for IT Governance, Cybersecurity, Business Continuity, IT Operations, Third-Party Risk, and Data Management
- **Per-control status tracking** — mark each control as Compliant, Non-Compliant, or Not Applicable with a single click; toggle off to clear
- **Risk level badges** — each control is tagged High, Medium, or Low risk for prioritization
- **Remarks input** — free-text field per control for audit findings, observations, and remediation notes
- **Export to TXT** — generates a formatted compliance report (date, score, non-compliant items with remarks) and downloads it as a `.txt` file

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Plain CSS with CSS custom properties |
| Language | JavaScript (ES2022+) |
| Package Manager | npm |

No UI libraries, no CSS frameworks. All styles are handwritten.

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bsp-compliance-checker.git
cd bsp-compliance-checker

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to be served as a static site.

---

## Project Structure

```
src/
├── data/
│   └── controls.js      # 24 BSP Circular 1140 controls with metadata
├── App.jsx              # Main application component
├── App.css              # Component styles
└── index.css            # Global reset and design tokens
```

---

## BSP Circular 1140 Coverage

The tool covers the following domains from the BSP Technology Risk Management Framework:

| Domain | Controls | Key Topics |
|---|---|---|
| IT Governance | 4 | Strategic alignment, risk framework, roles, reporting |
| Cybersecurity | 8 | Access control, patching, incident response, MFA, encryption |
| Business Continuity | 4 | BCP, DRP, backups, business impact analysis |
| IT Operations | 3 | Change management, asset inventory, audit logging |
| Third-Party Risk | 3 | Vendor assessment, SLA management, ongoing monitoring |
| Data Management | 2 | Data classification, customer data protection |

> **Disclaimer:** This tool is intended as a self-assessment aid and study reference. It does not constitute official BSP examination findings. Always refer to the latest BSP issuances for authoritative compliance guidance.

---

## About This Project

This project was built as part of a **cybersecurity portfolio** targeting roles in the Philippine banking sector — specifically positions in IT audit, technology risk management, and information security governance.

BSP Circular 1140 is the primary regulatory framework governing technology risk management for Bangko Sentral ng Pilipinas-supervised financial institutions. Familiarity with its requirements — and the ability to build practical tooling around them — reflects the kind of domain knowledge expected of IT risk and security professionals in this sector.

The goal was to demonstrate three things:

1. **Regulatory fluency** — understanding what BSP Circular 1140 actually requires, not just that it exists
2. **Practical engineering** — translating regulatory controls into a usable assessment workflow
3. **Product thinking** — designing for a real user (an IT auditor working through a checklist) rather than a toy demo

This is a client-side, zero-dependency tool intentionally kept simple: no backend, no database, no authentication. Assessment data lives in the browser session. A production version would integrate with a document management system, support multi-user workflows, and persist findings across sessions.

---

## License

MIT
