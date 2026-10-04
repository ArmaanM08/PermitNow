# PermitNow | Municipal Building-Plan Approval System

An official single-window municipal e-governance web platform for streamlined building plan approvals, multi-department statutory scrutiny, deficiency tracking, online fee payments, and verifiable permit sanction orders.

Built entirely with standard **HTML5, CSS3, and Vanilla JavaScript** with **no backend, no database, and no external frameworks required**. All application state, role preferences, timeline audits, and scrutiny workflows are persisted dynamically in the browser's `localStorage`.

---

## 🏛️ Key Features & Screens

1. **Official Landing Page**
   - Municipal Corporation branding, tricolor identity, and citizen charter notice.
   - **30-Day Statutory SLA Metric**: Real-time counter and indicator tracking the 90% benchmark compliance.
   - **Quick Track Widget**: Instant lookup by application ID (e.g., `PN-2026-0041`, `PN-2026-0089`) with direct file access.
   - Highlights for 6 integrated municipal departments, byelaw rules, and citizen helpline.

2. **Login & Persona Role Switcher**
   - Instant 1-click switcher between 3 simulated government stakeholders:
     - **Applicant / Architect** (`Rajesh Sharma, CoA CA/2018/98421`)
     - **Department Scrutiny Officer** (Selectable across 6 statutory departments)
     - **Municipal Administrator** (`Municipal Commissioner / Chief Town Planner`)

3. **Applicant & Architect Dashboard**
   - Real-time status cards: **Draft**, **Submitted**, **Under Scrutiny**, **Deficiency Raised**, **Approved**, and **Rejected** with live filtering.
   - Search table by application ID, plot number, or ward.
   - Quick action shortcuts for editing drafts, paying fees, and downloading permits.

4. **Multi-Step Building Plan Application Form (6 Steps)**
   - **Step 1: Applicant & Landowner Details** (Ownership classification, identity, contact).
   - **Step 2: Property & Site Particulars** (Ward, plot number, survey number, plot area, road width, zoning).
   - **Step 3: Proposed Building Specifications & Rule Calculation** (Live mathematical calculation of Floor Area Ratio / FAR, Ground Coverage %, and estimated municipal scrutiny fee).
   - **Step 4: Licensed Professional Particulars** (Council of Architecture registration and structural license details).
   - **Step 5: Document & CAD Drawing Uploads** (Simulated upload and validation of site plans, architectural drawings, and title deeds).
   - **Step 6: Review Summary & Legal Affirmation** (Comprehensive review table and statutory legal declaration checkbox).
   - Save as Draft or Submit into municipal queue with instant ID generation.

5. **Detailed Scrutiny File & Status Tracker**
   - Visual 30-day statutory SLA countdown bar (e.g., *Day 12 of 30*).
   - **6-Department Scrutiny Matrix**:
     1. Town Planning & Zoning
     2. Fire & Life Safety
     3. Structural Safety Cell
     4. Environmental & Sanitation
     5. Water Supply & Drainage
     6. Traffic & Police Clearance
   - **Deficiency Resolution Workflow**: When an objection is raised, applicants view specific line-item officer remarks and submit a response with revised drawings.
   - **Municipal Fee Breakdown & Payment Simulation**: Itemized calculation (Scrutiny, Infrastructure Cess, Betterment) with a simulated Treasury Cyber-Challan / UPI payment gateway that instantly issues receipt numbers.
   - **Site Inspection Schedule**: Ward inspector assignment, inspection date, and field verification notes.
   - **Official Sanction Order Certificate**: Available only when approved. Formatted with municipal crest, cryptographic permit ID, verification QR code mock, conditions of approval, and print/PDF support.

6. **Department Officer Console**
   - Active department switcher (Town Planning, Fire Safety, Structural, Environmental, Water, Traffic).
   - Scrutiny queue with filters by SLA age (`<10 days`, `10-20 days`, `>20 days SLA critical`), status, and search.
   - **Official Scrutiny Review Dialog**: Inspect drawings, enter statutory remarks, and record decisions: *Grant Clearance (Approved)*, *Raise Deficiency (Send Back)*, or *Reject Application*. Status cascades across the application life-cycle.

7. **Municipal Administrator Executive Oversight**
   - **Statutory 30-Day Target Gauge** (SVG circular chart measuring performance against the 90.0% mandate).
   - Summary KPIs across all municipal zones.
   - **Department Turnaround Comparison Chart** (SVG bar chart comparing clearance days against statutory 7-day departmental thresholds).
   - **Application Status Distribution Chart** (CSS segmented distribution stack).
   - **Critical SLA Escalation Queue** with *Nudge Cell* priority reminders.
   - Directory of department heads and active queue volume.

8. **Accessibility & Global Features**
   - Text size controls (`A-`, `A`, `A+`) with site-wide real-time proportional scaling and saved user preferences.
   - Screen reader skip navigation link (`Skip to main content`).
   - Global notification drawer with unread counter.
   - Animated toast notifications for system actions.
   - Demo data reset button to restore default scenarios at any time.

---

## 📂 File Structure

```text
PermitNow/Website/
├── index.html        # Semantic, accessible HTML5 structure & views
├── style.css         # Minimalistic government design system, responsive styles & print CSS
├── script.js         # Vanilla JavaScript application engine, state store & workflow logic
└── README.md         # Documentation and local execution instructions
```

---

## 🚀 How to Run Locally

Because PermitNow is built purely with vanilla HTML5, CSS3, and JavaScript, **no installation, build step, or Node.js server is required**.

### Option 1: Direct File Open (Quickest)
1. Navigate to the project directory:
   ```bash
   cd /Users/armaanmulani/Desktop/PermitNow/Website
   ```
2. Double-click `index.html` to open it directly in Google Chrome, Safari, Firefox, or Microsoft Edge.
   *Or open via terminal:*
   ```bash
   open index.html   # On macOS
   ```

### Option 2: Local HTTP Server (Recommended)
Running through a lightweight local web server ensures complete browser storage reliability:

- **Using Python 3:**
  ```bash
  cd /Users/armaanmulani/Desktop/PermitNow/Website
  python3 -m http.server 8080
  ```
  Then open [http://localhost:8080](http://localhost:8080) in your web browser.

- **Using Node `npx serve`:**
  ```bash
  cd /Users/armaanmulani/Desktop/PermitNow/Website
  npx serve .
  ```

---

## 🧪 Demo Test Scenarios

The portal comes pre-loaded with realistic municipal applications to test every possible workflow:

| Application ID | Status | Demo Scenario / Actions to Test |
| :--- | :--- | :--- |
| **`PN-2026-0041`** | **Approved** | Commercial complex in Ward 12. All 6 departments have granted clearance. Click **Permit** to view and print the official **Municipal Sanction Order Certificate** with QR code and seal. |
| **`PN-2026-0089`** | **Deficiency Raised** | Fire and Structural cells raised objections for staircase width (<1.5m) and missing soil test. Open the file to view the **Citizen Resubmission Form**, write compliance notes, attach revised drawings, and resume scrutiny! |
| **`PN-2026-0104`** | **Under Scrutiny** | Mixed-use project in Ward 03. Switch role to **Fire & Life Safety Officer**, find this application in the queue, open the review dialog, and grant clearance. |
| **`PN-2026-0118`** | **Submitted** | Residential Villa in Ward 15. Fee is pending. Click **Pay Fee** to test the Treasury Cyber-Challan payment simulation and generate an official receipt. |
| **`PN-2026-0022`** | **Rejected** | Industrial warehouse proposal encroaching on a canal green buffer. View statutory citations under Master Plan Section 14(2). |
| **`PN-2026-0135`** | **Draft** | Incomplete draft saved by architect. Click **Edit Draft** to resume filling out the wizard from where it was left. |

---

## 🎨 Design Principles
- **Trustworthy Government Service**: Clean white and light slate backgrounds (`#f4f6f9`), accessible deep navy accents (`#0c2340`, `#133d6d`), legible Inter typography, and restrained icons.
- **Strictly Non-Corporate**: Avoids excessive marketing gradients, glassmorphism, or startup styling in favor of authoritative municipal clarity.
- **Mobile-First & Responsive**: Adapts seamlessly to 360px mobile viewports up to large desktop monitors.
