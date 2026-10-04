/**
 * PermitNow - Municipal Building-Plan Approval System
 * Vanilla JavaScript Single-Page Application (SPA) Engine
 * Powered by browser localStorage with realistic government simulation workflows.
 */

// ============================================================================
// 1. DATA INITIALIZATION & CONSTANTS
// ============================================================================

const STORAGE_KEYS = {
  APPLICATIONS: 'permitnow_applications_v1',
  USER_ROLE: 'permitnow_current_role_v1',
  NOTIFICATIONS: 'permitnow_notifications_v1',
  USER_PREFS: 'permitnow_user_prefs_v1'
};

const DEPARTMENTS = [
  { id: 'town_planning', name: 'Town Planning & Zoning', icon: '🏛️', standardTurnaround: 5.8 },
  { id: 'fire_safety', name: 'Fire & Life Safety', icon: '🔥', standardTurnaround: 7.2 },
  { id: 'structural', name: 'Structural Safety Cell', icon: '🏗️', standardTurnaround: 4.5 },
  { id: 'environmental', name: 'Environmental & Sanitation', icon: '🌱', standardTurnaround: 6.1 },
  { id: 'water_sewerage', name: 'Water Supply & Drainage', icon: '💧', standardTurnaround: 3.9 },
  { id: 'traffic', name: 'Traffic & Police Clearance', icon: '🚦', standardTurnaround: 5.1 }
];

/**
 * Baseline Realistic Preloaded Demo Applications
 */
const DEFAULT_APPLICATIONS = [
  {
    id: 'PN-2026-0041',
    submissionDate: '2026-02-10',
    applicantName: 'Vikramaditya Singhania',
    ownershipType: 'Corporate / Partnership Firm',
    email: 'v.singhania@apexrealty.demo',
    mobile: '9820014521',
    govId: 'AAACR1294K',
    postalAddress: '402, Apex Towers, Brigade Road, Municipal Zone 12',
    ward: 'Ward 12 - South Zone',
    plotNo: 'Plot 88-A, Commercial Hub',
    surveyNo: 'Sy. No. 412/1B',
    plotArea: 650,
    roadWidth: 18.0,
    zoning: 'Commercial C-2 (Central Business)',
    occupancy: 'Commercial Office / Retail',
    floors: 'G+4 (Ground + 4 Upper)',
    heightMeters: 16.8,
    groundCoverage: 320,
    builtupArea: 1120,
    parkingSlots: 14,
    far: 1.72,
    coveragePercent: 49.2,
    architectName: 'Rajesh Sharma',
    architectReg: 'CA/2018/98421',
    engineerName: 'Dr. Arvind V. Kulkarni',
    engineerLic: 'STR-ENG-2015-0412',
    status: 'Approved',
    slaDaysElapsed: 22,
    feeStatus: 'Paid',
    feeAmount: 163650,
    feeReceipt: 'MNC-REC-2026-88412',
    permitNo: 'MNC/BP/2026/0412',
    sanctionDate: '2026-03-04',
    siteInspection: {
      status: 'Passed',
      officer: 'Er. Sandeep Joshi, Ward Inspector',
      inspectionDate: '2026-02-18',
      remarks: 'Setbacks and abutting 18m road width verified on ground. Boundary stones aligned with survey record.'
    },
    documents: [
      { name: 'Site_Plan_Rev2.pdf', size: '1.8 MB', date: '2026-02-10', type: 'Site Plan' },
      { name: 'Architectural_Full_Set.dwg', size: '4.2 MB', date: '2026-02-10', type: 'Architectural Drawings' },
      { name: 'Registered_SaleDeed_Signed.pdf', size: '3.1 MB', date: '2026-02-10', type: 'Title Deed' },
      { name: 'Structural_Safety_Certificate.pdf', size: '1.2 MB', date: '2026-02-10', type: 'Structural Certificate' },
      { name: 'Fire_Life_Safety_Drawings.pdf', size: '2.5 MB', date: '2026-02-10', type: 'Fire NOC Drawings' }
    ],
    scrutiny: {
      town_planning: { status: 'Approved', officer: 'Er. Sudhir Deshmukh', date: '2026-02-14', remarks: 'FAR 1.72 is within permissible 2.25. Setbacks compliant.' },
      fire_safety: { status: 'Approved', officer: 'CFO Meenakshi Iyer', date: '2026-02-19', remarks: 'Staircase width 1.8m provided with dual fire escape exits. Clearances satisfied.' },
      structural: { status: 'Approved', officer: 'Er. Harish Chandra', date: '2026-02-16', remarks: 'Seismic Zone III compliance verified with soil bearing capacity 180 kN/sq.m.' },
      environmental: { status: 'Approved', officer: 'Dr. Kavita Nambiar', date: '2026-02-21', remarks: 'Rainwater harvesting tank capacity 40kL adequate.' },
      water_sewerage: { status: 'Approved', officer: 'Er. A. K. Banerjee', date: '2026-02-22', remarks: '150mm municipal sewer connection approved.' },
      traffic: { status: 'Approved', officer: 'ACP Pradeep Rane', date: '2026-02-24', remarks: '14 ECS off-street parking meets required quota. Ingress/egress clear.' }
    },
    timeline: [
      { title: 'Application Submitted Online', date: '10-Feb-2026 11:30 AM', note: 'All architectural drawings and statutory documents submitted.' },
      { title: 'Municipal Scrutiny Fees Paid', date: '11-Feb-2026 03:15 PM', note: 'Online Treasury Challan payment received (₹1,63,650).' },
      { title: 'Parallel Department Scrutiny Initiated', date: '12-Feb-2026 10:00 AM', note: 'File routed simultaneously to all 6 statutory scrutiny desks.' },
      { title: 'Site Inspection Conducted', date: '18-Feb-2026 02:30 PM', note: 'Physical verification completed and boundary coordinates verified.' },
      { title: 'All 6 Department Clearances Granted', date: '24-Feb-2026 05:00 PM', note: 'Final clearance from Traffic Police and Chief Town Planner registered.' },
      { title: 'Building Sanction Order Issued', date: '04-Mar-2026 10:45 AM', note: 'Digitally signed permit MNC/BP/2026/0412 available for download.' }
    ]
  },
  {
    id: 'PN-2026-0089',
    submissionDate: '2026-02-18',
    applicantName: 'Smt. Ananya Deshpande',
    ownershipType: 'Individual Freehold',
    email: 'ananya.deshpande@mail.demo',
    mobile: '9845012789',
    govId: 'BPKPD8819M',
    postalAddress: 'B-14, Mayur Greens, Ward 07, Central Zone',
    ward: 'Ward 07 - Central Zone',
    plotNo: 'Plot No. 19/C, Shivaji Nagar',
    surveyNo: 'Sy. No. 89/4',
    plotArea: 420,
    roadWidth: 12.0,
    zoning: 'Residential R-2 (High Density)',
    occupancy: 'Residential (Multi-Family Apartment)',
    floors: 'G+3 (Ground + 3 Upper)',
    heightMeters: 13.5,
    groundCoverage: 210,
    builtupArea: 760,
    parkingSlots: 8,
    far: 1.81,
    coveragePercent: 50.0,
    architectName: 'Rajesh Sharma',
    architectReg: 'CA/2018/98421',
    engineerName: 'Er. M. S. Venkatesh',
    engineerLic: 'STR-ENG-2019-0114',
    status: 'Deficiency Raised',
    slaDaysElapsed: 15,
    feeStatus: 'Paid',
    feeAmount: 110100,
    feeReceipt: 'MNC-REC-2026-89104',
    permitNo: '',
    sanctionDate: '',
    siteInspection: {
      status: 'Scheduled',
      officer: 'Ward Engineer - Central Zone',
      inspectionDate: '2026-03-08',
      remarks: 'Scheduled after applicant rectification of staircase width deficiency.'
    },
    documents: [
      { name: 'Site_Plan_Plot19.pdf', size: '1.4 MB', date: '2026-02-18', type: 'Site Plan' },
      { name: 'Architectural_Gplus3.pdf', size: '3.8 MB', date: '2026-02-18', type: 'Architectural Drawings' },
      { name: 'Sale_Deed_Registered.pdf', size: '2.9 MB', date: '2026-02-18', type: 'Title Deed' },
      { name: 'Structural_Cert_Venkatesh.pdf', size: '1.1 MB', date: '2026-02-18', type: 'Structural Certificate' }
    ],
    scrutiny: {
      town_planning: { status: 'Approved', officer: 'Er. Sudhir Deshmukh', date: '2026-02-23', remarks: 'Ground coverage 50% and height 13.5m compliant with R-2 norms.' },
      fire_safety: { status: 'Deficiency', officer: 'CFO Meenakshi Iyer', date: '2026-02-26', remarks: 'Main fire escape staircase width shown as 1.25m. Minimum required width for multi-family G+3 is 1.50m under NBC Part 4 Table 7.' },
      structural: { status: 'Deficiency', officer: 'Er. Harish Chandra', date: '2026-02-25', remarks: 'Soil geotechnical bore-log test report missing. Provide N-value depth chart.' },
      environmental: { status: 'Approved', officer: 'Dr. Kavita Nambiar', date: '2026-02-28', remarks: 'RWH pit design satisfactory.' },
      water_sewerage: { status: 'Approved', officer: 'Er. A. K. Banerjee', date: '2026-02-27', remarks: 'Water meter chamber location approved.' },
      traffic: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'Awaiting revised driveway ramp details.' }
    },
    timeline: [
      { title: 'Application Submitted Online', date: '18-Feb-2026 02:40 PM', note: 'Application registered and reference ID generated.' },
      { title: 'Fee Payment Verified', date: '19-Feb-2026 11:10 AM', note: 'Scrutiny fee ₹1,10,100 acknowledged.' },
      { title: 'Town Planning Cleared', date: '23-Feb-2026 04:15 PM', note: 'Zoning and FAR verification completed without objection.' },
      { title: 'Deficiencies Raised by Fire & Structural', date: '26-Feb-2026 03:20 PM', note: 'Statutory 30-day clock paused. Applicant notified to upload rectified drawings.' }
    ]
  },
  {
    id: 'PN-2026-0104',
    submissionDate: '2026-02-25',
    applicantName: 'Kunal & Associates Developers',
    ownershipType: 'Corporate / Partnership Firm',
    email: 'projects@kunalassoc.demo',
    mobile: '9822345610',
    govId: 'AABCK9921E',
    postalAddress: 'Plot 5, North Avenue, Ward 03, North Zone',
    ward: 'Ward 03 - North Zone',
    plotNo: 'Plot No. 12/A, North Avenue',
    surveyNo: 'Sy. No. 204/2',
    plotArea: 520,
    roadWidth: 15.0,
    zoning: 'Commercial C-1 (Local Retail)',
    occupancy: 'Mixed Use (Commercial + Residential)',
    floors: 'G+2 (Ground + 2 Upper)',
    heightMeters: 10.8,
    groundCoverage: 280,
    builtupArea: 720,
    parkingSlots: 10,
    far: 1.38,
    coveragePercent: 53.8,
    architectName: 'Priya N. Mehta',
    architectReg: 'CA/2012/55120',
    engineerName: 'Dr. Arvind V. Kulkarni',
    engineerLic: 'STR-ENG-2015-0412',
    status: 'Under Scrutiny',
    slaDaysElapsed: 8,
    feeStatus: 'Paid',
    feeAmount: 109800,
    feeReceipt: 'MNC-REC-2026-90411',
    permitNo: '',
    sanctionDate: '',
    siteInspection: {
      status: 'Scheduled',
      officer: 'Er. Rajesh Patil, Ward Inspector',
      inspectionDate: '2026-03-06',
      remarks: 'Notice dispatched to applicant for site boundary verification.'
    },
    documents: [
      { name: 'NorthAve_SitePlan.pdf', size: '2.1 MB', date: '2026-02-25', type: 'Site Plan' },
      { name: 'MixedUse_FloorDrawings.dwg', size: '5.1 MB', date: '2026-02-25', type: 'Architectural Drawings' },
      { name: 'Partnership_Deed_Title.pdf', size: '3.4 MB', date: '2026-02-25', type: 'Title Deed' },
      { name: 'Structural_Stability_Doc.pdf', size: '1.5 MB', date: '2026-02-25', type: 'Structural Certificate' }
    ],
    scrutiny: {
      town_planning: { status: 'Approved', officer: 'Er. Sudhir Deshmukh', date: '2026-03-01', remarks: 'Commercial ground floor + residential upper floors compliant with mixed-use byelaw.' },
      fire_safety: { status: 'Pending', officer: 'CFO Meenakshi Iyer', date: '', remarks: 'Active scrutiny in progress.' },
      structural: { status: 'Approved', officer: 'Er. Harish Chandra', date: '2026-03-02', remarks: 'Column spacing and foundation depth adequate.' },
      environmental: { status: 'Pending', officer: 'Dr. Kavita Nambiar', date: '', remarks: 'Solid waste management layout undergoing check.' },
      water_sewerage: { status: 'Pending', officer: 'Er. A. K. Banerjee', date: '', remarks: 'Hydraulic head calculation verification in queue.' },
      traffic: { status: 'Pending', officer: 'ACP Pradeep Rane', date: '', remarks: 'Queue position 4.' }
    },
    timeline: [
      { title: 'Application Submitted Online', date: '25-Feb-2026 10:15 AM', note: 'Mixed-use plan submitted with online documents.' },
      { title: 'Fee Payment Verified', date: '25-Feb-2026 01:45 PM', note: 'Treasury challan ₹1,09,800 validated.' },
      { title: 'Town Planning Clearance Granted', date: '01-Mar-2026 11:20 AM', note: 'FAR 1.38 approved.' },
      { title: 'Structural Clearance Granted', date: '02-Mar-2026 04:30 PM', note: 'Foundation and framing drawings cleared.' }
    ]
  },
  {
    id: 'PN-2026-0118',
    submissionDate: '2026-03-01',
    applicantName: 'Dr. Suresh V. Nair',
    ownershipType: 'Individual Freehold',
    email: 'suresh.nair@doc.demo',
    mobile: '9819876543',
    govId: 'AVBPN1209L',
    postalAddress: 'House 88, Palm Meadows, Ward 15, West Zone',
    ward: 'Ward 15 - West Zone',
    plotNo: 'Plot No. 45, Palm Meadows',
    surveyNo: 'Sy. No. 310/7',
    plotArea: 350,
    roadWidth: 9.0,
    zoning: 'Residential R-1 (Low Density)',
    occupancy: 'Residential (Single Family)',
    floors: 'G+1 (Ground + 1 Upper)',
    heightMeters: 7.2,
    groundCoverage: 160,
    builtupArea: 290,
    parkingSlots: 2,
    far: 0.83,
    coveragePercent: 45.7,
    architectName: 'Rajesh Sharma',
    architectReg: 'CA/2018/98421',
    engineerName: 'Dr. Arvind V. Kulkarni',
    engineerLic: 'STR-ENG-2015-0412',
    status: 'Submitted',
    slaDaysElapsed: 3,
    feeStatus: 'Pending',
    feeAmount: 50550,
    feeReceipt: '',
    permitNo: '',
    sanctionDate: '',
    siteInspection: {
      status: 'Awaiting Fee Payment',
      officer: 'Ward 15 Scrutiny Cell',
      inspectionDate: 'Pending fee clearance',
      remarks: 'Site inspection will be assigned post fee confirmation.'
    },
    documents: [
      { name: 'Villa_Site_Plan.pdf', size: '1.2 MB', date: '2026-03-01', type: 'Site Plan' },
      { name: 'SingleFamily_Architectural.pdf', size: '2.4 MB', date: '2026-03-01', type: 'Architectural Drawings' },
      { name: 'Sale_Deed_Nair.pdf', size: '2.1 MB', date: '2026-03-01', type: 'Title Deed' },
      { name: 'Structural_Cert_Kulkarni.pdf', size: '0.9 MB', date: '2026-03-01', type: 'Structural Certificate' }
    ],
    scrutiny: {
      town_planning: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'Initial queue.' },
      fire_safety: { status: 'Approved', officer: 'Automated Rule Engine', date: '2026-03-01', remarks: 'Low-rise single family (<15m) exempt from detailed Fire NOC under Byelaw 8.2.' },
      structural: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'Awaiting fee clearance.' },
      environmental: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'Awaiting fee clearance.' },
      water_sewerage: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'Awaiting fee clearance.' },
      traffic: { status: 'Approved', officer: 'Automated Rule Engine', date: '2026-03-01', remarks: '2 ECS parking provided on 9m road compliant for R-1.' }
    },
    timeline: [
      { title: 'Application Submitted Online', date: '01-Mar-2026 09:20 AM', note: 'Application form and CAD drawings accepted.' },
      { title: 'Fee Payment Demand Generated', date: '01-Mar-2026 09:25 AM', note: 'Municipal Scrutiny Fee ₹50,550 payable by applicant.' }
    ]
  },
  {
    id: 'PN-2026-0022',
    submissionDate: '2026-01-20',
    applicantName: 'Continental Logistics & Warehousing LLP',
    ownershipType: 'Corporate / Partnership Firm',
    email: 'info@continentallogistics.demo',
    mobile: '9820129087',
    govId: 'AACFC9012J',
    postalAddress: 'Gate 4, State Highway 10, Industrial Belt',
    ward: 'Ward 28 - Industrial Belt',
    plotNo: 'Plot No. 102/B, Highway Node',
    surveyNo: 'Sy. No. 511/3',
    plotArea: 2400,
    roadWidth: 24.0,
    zoning: 'Industrial Light (I-1)',
    occupancy: 'Industrial Light',
    floors: 'G+1 (Ground + 1 Upper)',
    heightMeters: 14.0,
    groundCoverage: 1450,
    builtupArea: 2200,
    parkingSlots: 18,
    far: 0.91,
    coveragePercent: 60.4,
    architectName: 'Priya N. Mehta',
    architectReg: 'CA/2012/55120',
    engineerName: 'Dr. Arvind V. Kulkarni',
    engineerLic: 'STR-ENG-2015-0412',
    status: 'Rejected',
    slaDaysElapsed: 28,
    feeStatus: 'Paid',
    feeAmount: 372000,
    feeReceipt: 'MNC-REC-2026-77821',
    permitNo: '',
    sanctionDate: '',
    siteInspection: {
      status: 'Violations Noted',
      officer: 'Er. Sudhir Deshmukh, Chief Town Planner',
      inspectionDate: '2026-02-05',
      remarks: 'Plot infringes into the notified Green Buffer Zone along Highway canal. Encroachment of 12m into water-body buffer.'
    },
    documents: [
      { name: 'Industrial_SitePlan.pdf', size: '2.5 MB', date: '2026-01-20', type: 'Site Plan' },
      { name: 'Warehouse_Plans.dwg', size: '6.2 MB', date: '2026-01-20', type: 'Architectural Drawings' },
      { name: 'Title_Documents.pdf', size: '4.1 MB', date: '2026-01-20', type: 'Title Deed' }
    ],
    scrutiny: {
      town_planning: { status: 'Rejected', officer: 'Er. Sudhir Deshmukh', date: '2026-02-12', remarks: 'Statutory Rejection under Master Plan Sec 14(2): Proposed construction encroaches within 30m non-developable ecological buffer of natural storm water stream.' },
      fire_safety: { status: 'Approved', officer: 'CFO Meenakshi Iyer', date: '2026-02-08', remarks: 'Industrial hydrant layout compliant.' },
      structural: { status: 'Approved', officer: 'Er. Harish Chandra', date: '2026-02-04', remarks: 'PEB steel structure designs checked.' },
      environmental: { status: 'Rejected', officer: 'Dr. Kavita Nambiar', date: '2026-02-10', remarks: 'Ecological drainage violation confirmed.' },
      water_sewerage: { status: 'Pending', officer: 'Er. A. K. Banerjee', date: '', remarks: 'Review terminated due to zoning rejection.' },
      traffic: { status: 'Approved', officer: 'ACP Pradeep Rane', date: '2026-02-06', remarks: 'Truck maneuvering turning radius satisfied.' }
    },
    timeline: [
      { title: 'Application Submitted Online', date: '20-Jan-2026 11:00 AM', note: 'Industrial warehouse proposal submitted.' },
      { title: 'Site Inspection Conducted', date: '05-Feb-2026 02:00 PM', note: 'Ecological buffer encroachment identified.' },
      { title: 'Statutory Rejection Issued', date: '12-Feb-2026 04:30 PM', note: 'Rejected under Master Plan Section 14(2) and Environmental Protection Act.' }
    ]
  },
  {
    id: 'PN-2026-0135',
    submissionDate: '',
    applicantName: 'M/s Green Horizons Housing',
    ownershipType: 'Registered Society / Trust',
    email: 'info@greenhorizons.demo',
    mobile: '9823098711',
    govId: 'TRU771249K',
    postalAddress: 'Site Office, Sector 4, East Zone',
    ward: 'Ward 21 - East Zone',
    plotNo: 'Plot No. 7, Sector 4',
    surveyNo: 'Sy. No. 19/1',
    plotArea: 800,
    roadWidth: 12.0,
    zoning: 'Residential R-2 (High Density)',
    occupancy: 'Residential (Multi-Family Apartment)',
    floors: 'G+3 (Ground + 3 Upper)',
    heightMeters: 13.2,
    groundCoverage: 380,
    builtupArea: 1350,
    parkingSlots: 12,
    far: 1.68,
    coveragePercent: 47.5,
    architectName: 'Rajesh Sharma',
    architectReg: 'CA/2018/98421',
    engineerName: 'Dr. Arvind V. Kulkarni',
    engineerLic: 'STR-ENG-2015-0412',
    status: 'Draft',
    slaDaysElapsed: 0,
    feeStatus: 'Unpaid',
    feeAmount: 198000,
    feeReceipt: '',
    permitNo: '',
    sanctionDate: '',
    siteInspection: {
      status: 'Draft',
      officer: 'Unassigned',
      inspectionDate: 'N/A',
      remarks: 'Application saved in draft mode.'
    },
    documents: [
      { name: 'Draft_SitePlan_Rev1.pdf', size: '1.6 MB', date: '2026-03-02', type: 'Site Plan' }
    ],
    scrutiny: {
      town_planning: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
      fire_safety: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
      structural: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
      environmental: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
      water_sewerage: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
      traffic: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' }
    },
    timeline: [
      { title: 'Draft Application Saved', date: '02-Mar-2026 05:15 PM', note: 'Draft saved by architect Rajesh Sharma.' }
    ]
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Deficiency Raised on PN-2026-0089',
    message: 'Fire Safety and Structural cells have requested revised drawings for staircase width.',
    time: '2 hours ago',
    read: false,
    appId: 'PN-2026-0089'
  },
  {
    id: 'notif-2',
    title: 'Sanction Order Issued for PN-2026-0041',
    message: 'Digitally signed permit MNC/BP/2026/0412 has been issued and is available for download.',
    time: '1 day ago',
    read: false,
    appId: 'PN-2026-0041'
  },
  {
    id: 'notif-3',
    title: 'Site Inspection Scheduled for PN-2026-0104',
    message: 'Ward inspector assigned physical site verification for Plot 12/A North Avenue.',
    time: '2 days ago',
    read: true,
    appId: 'PN-2026-0104'
  }
];

// ============================================================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ============================================================================

class PermitNowStore {
  static getApplications() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : this.initDefaultApplications();
    } catch (e) {
      console.error('Error loading applications from localStorage', e);
      return DEFAULT_APPLICATIONS;
    }
  }

  static saveApplications(apps) {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch (e) {
      console.error('Error saving applications to localStorage', e);
    }
  }

  static initDefaultApplications() {
    this.saveApplications(DEFAULT_APPLICATIONS);
    return DEFAULT_APPLICATIONS;
  }

  static getApplicationById(id) {
    const apps = this.getApplications();
    return apps.find(app => app.id.toUpperCase() === id.trim().toUpperCase());
  }

  static saveOrUpdateApplication(app) {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === app.id);
    if (index >= 0) {
      apps[index] = app;
    } else {
      apps.unshift(app);
    }
    this.saveApplications(apps);
    return app;
  }

  static getCurrentRole() {
    const defaultRole = { type: 'applicant', dept: 'town_planning', name: 'Rajesh Sharma (Architect)' };
    try {
      const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
      return role ? JSON.parse(role) : defaultRole;
    } catch (e) {
      return defaultRole;
    }
  }

  static setCurrentRole(roleObj) {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, JSON.stringify(roleObj));
  }

  static getNotifications() {
    try {
      const notifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return notifs ? JSON.parse(notifs) : this.initNotifications();
    } catch (e) {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  static saveNotifications(notifs) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  static initNotifications() {
    this.saveNotifications(DEFAULT_NOTIFICATIONS);
    return DEFAULT_NOTIFICATIONS;
  }

  static addNotification(title, message, appId = '') {
    const notifs = this.getNotifications();
    notifs.unshift({
      id: 'notif-' + Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      appId
    });
    this.saveNotifications(notifs);
  }

  static resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    this.initDefaultApplications();
    this.initNotifications();
  }
}

// ============================================================================
// 3. UI CONTROLLER & VIEW ROUTING
// ============================================================================

class AppUI {
  constructor() {
    this.currentView = 'landing';
    this.currentRole = PermitNowStore.getCurrentRole();
    this.activeApplicationId = null;
    this.formCurrentStep = 1;
    this.applicantFilter = 'all';
    this.officerDepartment = this.currentRole.dept || 'town_planning';
    this.officerReviewApp = null;
  }

  init() {
    this.bindGlobalNavigation();
    this.bindAccessibilityControls();
    this.bindRoleSwitcher();
    this.bindNotifications();
    this.bindLandingQuickTrack();
    this.bindApplicantDashboard();
    this.bindFormWizard();
    this.bindApplicationDetails();
    this.bindOfficerDashboard();
    this.bindAdminDashboard();
    this.bindModals();

    // Set initial view and role badge
    this.updateRoleDisplay();
    this.updateNotificationsUI();
    this.showView('landing');
  }

  // --------------------------------------------------------------------------
  // Navigation & View Switching
  // --------------------------------------------------------------------------
  showView(viewName, params = {}) {
    // Hide all views
    document.querySelectorAll('.portal-view').forEach(v => {
      v.classList.remove('active');
      v.classList.add('hidden');
    });

    // Update nav links active state
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      targetView.classList.add('active');
      this.currentView = viewName;
      window.scrollTo(0, 0);

      // Trigger view-specific renderers
      switch (viewName) {
        case 'applicant-dashboard':
          this.renderApplicantDashboard();
          break;
        case 'officer-dashboard':
          this.renderOfficerDashboard();
          break;
        case 'admin-dashboard':
          this.renderAdminDashboard();
          break;
        case 'application-details':
          if (params.id) {
            this.activeApplicationId = params.id;
          }
          this.renderApplicationDetails(this.activeApplicationId);
          break;
        case 'application-form':
          this.resetOrLoadForm(params.editId);
          break;
        case 'landing':
          this.updateLandingMetrics();
          break;
      }
    }

    // Close mobile nav drawer if open
    const primaryNav = document.getElementById('primary-nav');
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    if (primaryNav && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  bindGlobalNavigation() {
    // Mobile navigation hamburger
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    if (toggleBtn && primaryNav) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Logo click
    document.getElementById('nav-brand-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showView('landing');
    });

    // Links with data-view attribute
    document.querySelectorAll('[data-view]').forEach(elem => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        const view = elem.getAttribute('data-view');
        this.showView(view);
      });
    });

    // Quick track anchor link
    document.getElementById('nav-track')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showView('landing');
      setTimeout(() => {
        const trackSec = document.getElementById('quick-track-section');
        if (trackSec) {
          trackSec.scrollIntoView({ behavior: 'smooth' });
          document.getElementById('input-track-id')?.focus();
        }
      }, 100);
    });

    // Reset demo data button in landing page
    document.getElementById('btn-reset-demo-data')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all demo data to initial factory state? Any newly created applications will be cleared.')) {
        PermitNowStore.resetAllData();
        this.showToast('Demo Data Reset', 'Default mock applications and clearances have been restored.', 'info');
        this.showView(this.currentView);
        this.updateNotificationsUI();
      }
    });

    // Landing Hero Call-to-Actions
    document.getElementById('btn-hero-apply')?.addEventListener('click', () => {
      this.currentRole = { type: 'applicant', dept: 'town_planning', name: 'Rajesh Sharma (Architect)' };
      PermitNowStore.setCurrentRole(this.currentRole);
      this.updateRoleDisplay();
      this.showView('application-form');
    });

    document.getElementById('btn-hero-login')?.addEventListener('click', () => {
      this.showView('login');
    });
  }

  // --------------------------------------------------------------------------
  // Accessibility Controls (A-, A, A+ Site-Wide Text Size Adjust)
  // --------------------------------------------------------------------------
  bindAccessibilityControls() {
    const btnDecrease = document.getElementById('btn-font-decrease');
    const btnNormal = document.getElementById('btn-font-normal');
    const btnIncrease = document.getElementById('btn-font-increase');

    const applyFontSize = (size) => {
      document.documentElement.classList.remove('font-small', 'font-normal', 'font-large');
      if (size === 'small') {
        document.documentElement.classList.add('font-small');
        if (btnDecrease) this.setActiveFontBtn(btnDecrease);
      } else if (size === 'large') {
        document.documentElement.classList.add('font-large');
        if (btnIncrease) this.setActiveFontBtn(btnIncrease);
      } else {
        document.documentElement.classList.add('font-normal');
        if (btnNormal) this.setActiveFontBtn(btnNormal);
      }
      try {
        localStorage.setItem('permitnow_font_size_pref', size);
      } catch (e) {
        // ignore
      }
    };

    btnDecrease?.addEventListener('click', () => {
      applyFontSize('small');
      this.showToast('Text Size', 'Decreased base text size (A-)', 'info');
    });

    btnNormal?.addEventListener('click', () => {
      applyFontSize('normal');
      this.showToast('Text Size', 'Reset to standard text size (A)', 'info');
    });

    btnIncrease?.addEventListener('click', () => {
      applyFontSize('large');
      this.showToast('Text Size', 'Increased base text size (A+)', 'info');
    });

    // Restore saved user preference on load
    try {
      const savedPref = localStorage.getItem('permitnow_font_size_pref') || 'normal';
      applyFontSize(savedPref);
    } catch (e) {
      applyFontSize('normal');
    }
  }

  setActiveFontBtn(activeBtn) {
    document.querySelectorAll('.btn-text-size').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  // --------------------------------------------------------------------------
  // Role Switcher & Persona Logic
  // --------------------------------------------------------------------------
  bindRoleSwitcher() {
    document.getElementById('btn-role-modal-open')?.addEventListener('click', () => {
      this.showView('login');
    });

    // Persona cards in login view
    document.querySelectorAll('.btn-select-persona').forEach(btn => {
      btn.addEventListener('click', () => {
        const roleType = btn.getAttribute('data-role');
        let roleObj = { type: roleType };

        if (roleType === 'applicant') {
          roleObj.name = 'Rajesh Sharma (Architect)';
          roleObj.dept = 'town_planning';
          PermitNowStore.setCurrentRole(roleObj);
          this.currentRole = roleObj;
          this.updateRoleDisplay();
          this.showToast('Role Switched', 'Signed in as Citizen / Architect', 'success');
          this.showView('applicant-dashboard');
        } else if (roleType === 'officer') {
          const deptSelect = document.getElementById('login-dept-select');
          const dept = deptSelect ? deptSelect.value : 'town_planning';
          const deptInfo = DEPARTMENTS.find(d => d.id === dept) || DEPARTMENTS[0];
          roleObj.dept = dept;
          roleObj.name = `Officer (${deptInfo.name})`;
          PermitNowStore.setCurrentRole(roleObj);
          this.currentRole = roleObj;
          this.officerDepartment = dept;
          this.updateRoleDisplay();
          this.showToast('Role Switched', `Logged into ${deptInfo.name} scrutiny console`, 'success');
          this.showView('officer-dashboard');
        } else if (roleType === 'admin') {
          roleObj.name = 'Municipal Commissioner / Admin';
          roleObj.dept = 'all';
          PermitNowStore.setCurrentRole(roleObj);
          this.currentRole = roleObj;
          this.updateRoleDisplay();
          this.showToast('Role Switched', 'Logged in as Municipal Administrator', 'success');
          this.showView('admin-dashboard');
        }
      });
    });
  }

  updateRoleDisplay() {
    const badge = document.getElementById('current-role-badge');
    if (!badge) return;

    if (this.currentRole.type === 'applicant') {
      badge.textContent = 'Role: Applicant / Architect';
    } else if (this.currentRole.type === 'officer') {
      const deptObj = DEPARTMENTS.find(d => d.id === this.currentRole.dept);
      badge.textContent = `Role: Officer (${deptObj ? deptObj.name.split(' ')[0] : 'Scrutiny'})`;
    } else if (this.currentRole.type === 'admin') {
      badge.textContent = 'Role: Administrator';
    }
  }

  // --------------------------------------------------------------------------
  // Notifications System
  // --------------------------------------------------------------------------
  bindNotifications() {
    const bellBtn = document.getElementById('btn-notification-bell');
    const dropdown = document.getElementById('notification-dropdown');
    const markReadBtn = document.getElementById('btn-mark-all-read');

    bellBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown?.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown?.contains(e.target) && !bellBtn?.contains(e.target)) {
        dropdown?.classList.add('hidden');
      }
    });

    markReadBtn?.addEventListener('click', () => {
      const notifs = PermitNowStore.getNotifications();
      notifs.forEach(n => n.read = true);
      PermitNowStore.saveNotifications(notifs);
      this.updateNotificationsUI();
      this.showToast('Notifications', 'All notifications marked as read', 'info');
    });
  }

  updateNotificationsUI() {
    const notifs = PermitNowStore.getNotifications();
    const countBadge = document.getElementById('notification-count');
    const listElem = document.getElementById('notification-list');
    if (!countBadge || !listElem) return;

    const unreadCount = notifs.filter(n => !n.read).length;
    countBadge.textContent = unreadCount;
    countBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';

    listElem.innerHTML = '';
    if (notifs.length === 0) {
      listElem.innerHTML = '<li class="notification-item" style="color:var(--color-text-muted);">No new notifications</li>';
      return;
    }

    notifs.forEach(n => {
      const li = document.createElement('li');
      li.className = `notification-item ${n.read ? '' : 'unread'}`;
      li.innerHTML = `
        <strong>${n.title}</strong>
        <p>${n.message}</p>
        <span class="notification-time">${n.time}</span>
      `;
      li.addEventListener('click', () => {
        n.read = true;
        PermitNowStore.saveNotifications(notifs);
        this.updateNotificationsUI();
        document.getElementById('notification-dropdown')?.classList.add('hidden');
        if (n.appId) {
          this.showView('application-details', { id: n.appId });
        }
      });
      listElem.appendChild(li);
    });
  }

  // --------------------------------------------------------------------------
  // Landing Page Quick Track
  // --------------------------------------------------------------------------
  bindLandingQuickTrack() {
    const form = document.getElementById('form-quick-track');
    const input = document.getElementById('input-track-id');
    const resultBox = document.getElementById('quick-track-result');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryId = input.value.trim();
      if (!queryId) return;

      const app = PermitNowStore.getApplicationById(queryId);
      resultBox.classList.remove('hidden', 'found', 'not-found');

      if (app) {
        resultBox.classList.add('found');
        resultBox.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
            <strong>${app.id} - ${app.applicantName}</strong>
            <span class="status-badge ${this.getStatusBadgeClass(app.status)}">${app.status}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:0.75rem;">
            ${app.occupancy} &bull; ${app.ward} &bull; 30-Day SLA: <strong>Day ${app.slaDaysElapsed} of 30</strong>
          </p>
          <button type="button" class="btn btn-primary btn-small" id="btn-quick-view-app">
            Open Full Scrutiny File &rarr;
          </button>
        `;
        document.getElementById('btn-quick-view-app')?.addEventListener('click', () => {
          this.showView('application-details', { id: app.id });
        });
      } else {
        resultBox.classList.add('not-found');
        resultBox.innerHTML = `
          <strong>No record found for "${queryId}"</strong>
          <p style="font-size:0.8rem; margin-top:0.25rem;">Please check the reference ID format (e.g. PN-2026-0041). For testing, try one of the demo references shown below.</p>
        `;
      }
    });
  }

  updateLandingMetrics() {
    const apps = PermitNowStore.getApplications().filter(a => a.status !== 'Draft');
    const approvedOnTime = apps.filter(a => a.status === 'Approved' && a.slaDaysElapsed <= 30).length;
    const totalDisposed = apps.filter(a => a.status === 'Approved' || a.status === 'Rejected').length;

    let slaRate = 89.4;
    if (totalDisposed > 0) {
      slaRate = ((approvedOnTime / totalDisposed) * 100).toFixed(1);
    }
    const rateElem = document.getElementById('landing-sla-rate');
    if (rateElem) rateElem.textContent = `${slaRate}%`;
  }

  // --------------------------------------------------------------------------
  // Applicant Dashboard Logic
  // --------------------------------------------------------------------------
  bindApplicantDashboard() {
    // "Start New Application" button
    document.getElementById('btn-start-new-application')?.addEventListener('click', () => {
      this.showView('application-form');
    });

    // Stat cards filtering
    document.querySelectorAll('.stat-card[data-filter]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.stat-card[data-filter]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const filterVal = card.getAttribute('data-filter');
        this.applicantFilter = filterVal;
        const select = document.getElementById('applicant-status-select');
        if (select) select.value = filterVal;
        this.renderApplicantTable();
      });
    });

    // Status dropdown filter
    document.getElementById('applicant-status-select')?.addEventListener('change', (e) => {
      this.applicantFilter = e.target.value;
      document.querySelectorAll('.stat-card[data-filter]').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-filter') === this.applicantFilter);
      });
      this.renderApplicantTable();
    });

    // Search input
    document.getElementById('applicant-search-input')?.addEventListener('input', () => {
      this.renderApplicantTable();
    });

    // Clear filter
    document.getElementById('btn-clear-applicant-filter')?.addEventListener('click', () => {
      this.applicantFilter = 'all';
      const search = document.getElementById('applicant-search-input');
      const select = document.getElementById('applicant-status-select');
      if (search) search.value = '';
      if (select) select.value = 'all';
      document.querySelectorAll('.stat-card[data-filter]').forEach(c => c.classList.toggle('active', c.getAttribute('data-filter') === 'all'));
      this.renderApplicantTable();
    });
  }

  renderApplicantDashboard() {
    const apps = PermitNowStore.getApplications();

    // Compute summary card numbers
    const totalCount = apps.length;
    const draftCount = apps.filter(a => a.status === 'Draft').length;
    const submittedCount = apps.filter(a => a.status === 'Submitted').length;
    const scrutinyCount = apps.filter(a => a.status === 'Under Scrutiny').length;
    const defCount = apps.filter(a => a.status === 'Deficiency Raised').length;
    const approvedCount = apps.filter(a => a.status === 'Approved').length;
    const rejectedCount = apps.filter(a => a.status === 'Rejected').length;

    document.getElementById('stat-applicant-total').textContent = totalCount;
    document.getElementById('stat-applicant-draft').textContent = draftCount;
    document.getElementById('stat-applicant-submitted').textContent = submittedCount;
    document.getElementById('stat-applicant-scrutiny').textContent = scrutinyCount;
    document.getElementById('stat-applicant-deficiency').textContent = defCount;
    document.getElementById('stat-applicant-approved').textContent = approvedCount;
    document.getElementById('stat-applicant-rejected').textContent = rejectedCount;

    this.renderApplicantTable();
  }

  renderApplicantTable() {
    const apps = PermitNowStore.getApplications();
    const tbody = document.getElementById('applicant-table-body');
    const emptyState = document.getElementById('applicant-empty-state');
    const filterBadge = document.getElementById('applicant-active-filter-text');
    const searchVal = (document.getElementById('applicant-search-input')?.value || '').toLowerCase().trim();

    if (!tbody) return;

    let filtered = apps;

    if (this.applicantFilter !== 'all') {
      filtered = filtered.filter(a => a.status === this.applicantFilter);
      if (filterBadge) filterBadge.textContent = `Showing: ${this.applicantFilter}`;
    } else {
      if (filterBadge) filterBadge.textContent = 'Showing: All Applications';
    }

    if (searchVal) {
      filtered = filtered.filter(a =>
        a.id.toLowerCase().includes(searchVal) ||
        a.plotNo.toLowerCase().includes(searchVal) ||
        a.ward.toLowerCase().includes(searchVal) ||
        a.applicantName.toLowerCase().includes(searchVal)
      );
    }

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      tbody.classList.add('hidden');
      emptyState?.classList.remove('hidden');
      return;
    }

    tbody.classList.remove('hidden');
    emptyState?.classList.add('hidden');

    filtered.forEach(app => {
      const tr = document.createElement('tr');
      const ageClass = this.getSlaAgeClass(app.slaDaysElapsed);

      tr.innerHTML = `
        <td>
          <a href="#" class="app-id-link" data-id="${app.id}"><strong>${app.id}</strong></a>
        </td>
        <td>
          <strong>${app.occupancy}</strong>
          <div style="font-size:0.75rem; color:var(--color-text-light);">${app.builtupArea} sq.m Built-up (${app.floors})</div>
        </td>
        <td>
          ${app.ward.split('-')[0]}
          <div style="font-size:0.75rem; color:var(--color-text-light);">${app.plotNo}</div>
        </td>
        <td>${app.submissionDate ? this.formatDate(app.submissionDate) : '<span style="color:var(--color-text-light);">Unsubmitted</span>'}</td>
        <td>
          <span class="status-badge ${this.getStatusBadgeClass(app.status)}">${app.status}</span>
        </td>
        <td>
          <span class="sla-age-badge ${ageClass}">
            <span class="age-days">Day ${app.slaDaysElapsed}</span>
            <span>of 30 Days</span>
          </span>
        </td>
        <td class="text-right">
          ${this.renderApplicantActionButtons(app)}
        </td>
      `;

      // Bind action clicks
      tr.querySelector('.app-id-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.showView('application-details', { id: app.id });
      });

      tr.querySelector('.btn-view-details')?.addEventListener('click', () => {
        this.showView('application-details', { id: app.id });
      });

      tr.querySelector('.btn-edit-draft')?.addEventListener('click', () => {
        this.showView('application-form', { editId: app.id });
      });

      tr.querySelector('.btn-pay-action')?.addEventListener('click', () => {
        this.openPaymentModal(app.id);
      });

      tr.querySelector('.btn-permit-action')?.addEventListener('click', () => {
        this.openSanctionModal(app.id);
      });

      tbody.appendChild(tr);
    });
  }

  renderApplicantActionButtons(app) {
    if (app.status === 'Draft') {
      return `
        <button type="button" class="btn btn-secondary btn-small btn-edit-draft" title="Continue Editing Form">
          Edit Draft
        </button>
      `;
    }
    if (app.status === 'Approved') {
      return `
        <div style="display:inline-flex; gap:0.35rem;">
          <button type="button" class="btn btn-success btn-small btn-permit-action" title="Download Official Sanction Letter">
            Permit
          </button>
          <button type="button" class="btn btn-outline btn-small btn-view-details">
            View
          </button>
        </div>
      `;
    }
    if (app.feeStatus === 'Pending') {
      return `
        <div style="display:inline-flex; gap:0.35rem;">
          <button type="button" class="btn btn-primary btn-small btn-pay-action" title="Pay Municipal Scrutiny Fee">
            Pay Fee
          </button>
          <button type="button" class="btn btn-outline btn-small btn-view-details">
            View
          </button>
        </div>
      `;
    }
    return `
      <button type="button" class="btn btn-outline btn-small btn-view-details">
        View Scrutiny
      </button>
    `;
  }

  // --------------------------------------------------------------------------
  // Multi-Step Form Wizard Logic
  // --------------------------------------------------------------------------
  bindFormWizard() {
    const nextBtn = document.getElementById('btn-wizard-next');
    const prevBtn = document.getElementById('btn-wizard-prev');
    const draftBtn = document.getElementById('btn-wizard-draft');
    const cancelBtn = document.getElementById('btn-wizard-cancel');
    const submitBtn = document.getElementById('btn-wizard-submit');
    const form = document.getElementById('building-permit-form');

    // Stepper header node clicks
    document.querySelectorAll('.step-node').forEach(node => {
      node.addEventListener('click', () => {
        const targetStep = parseInt(node.getAttribute('data-step'), 10);
        if (targetStep < this.formCurrentStep) {
          this.goToFormStep(targetStep);
        } else if (this.validateCurrentStep()) {
          this.goToFormStep(targetStep);
        }
      });
    });

    nextBtn?.addEventListener('click', () => {
      if (this.validateCurrentStep()) {
        this.goToFormStep(this.formCurrentStep + 1);
      }
    });

    prevBtn?.addEventListener('click', () => {
      if (this.formCurrentStep > 1) {
        this.goToFormStep(this.formCurrentStep - 1);
      }
    });

    cancelBtn?.addEventListener('click', () => {
      if (confirm('Discard changes and return to citizen dashboard?')) {
        this.showView('applicant-dashboard');
      }
    });

    draftBtn?.addEventListener('click', () => {
      this.saveApplicationDraft();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateCurrentStep()) {
        this.submitFinalApplication();
      }
    });

    // Mathematical FAR & Fee recalculation on input
    const plotAreaInput = document.getElementById('prop-plot-area');
    const builtupInput = document.getElementById('bldg-builtup-area');
    const coverageInput = document.getElementById('bldg-ground-coverage');

    [plotAreaInput, builtupInput, coverageInput].forEach(inp => {
      inp?.addEventListener('input', () => this.recalculateSpecs());
    });

    // File input change simulation
    ['siteplan', 'arch', 'deed', 'structural', 'fire'].forEach(key => {
      const fileInp = document.getElementById(`file-${key}`);
      const nameElem = document.getElementById(`name-file-${key}`);
      fileInp?.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
          if (nameElem) nameElem.textContent = `${file.name} (${sizeMb} MB)`;
        }
      });
    });
  }

  recalculateSpecs() {
    const plotArea = parseFloat(document.getElementById('prop-plot-area')?.value) || 0;
    const builtup = parseFloat(document.getElementById('bldg-builtup-area')?.value) || 0;
    const coverage = parseFloat(document.getElementById('bldg-ground-coverage')?.value) || 0;

    const farValElem = document.getElementById('calc-far-value');
    const farStatusElem = document.getElementById('calc-far-status');
    const covValElem = document.getElementById('calc-coverage-value');
    const covStatusElem = document.getElementById('calc-coverage-status');
    const feeElem = document.getElementById('calc-fee-estimate');

    if (plotArea > 0) {
      const far = (builtup / plotArea).toFixed(2);
      const covPercent = ((coverage / plotArea) * 100).toFixed(1);
      const estFee = Math.round((plotArea * 45) + (builtup * 120));

      if (farValElem) farValElem.textContent = far;
      if (covValElem) covValElem.textContent = `${covPercent}%`;
      if (feeElem) feeElem.innerHTML = `&#8377; ${estFee.toLocaleString('en-IN')}`;

      // Permissible FAR check (2.25 max standard)
      if (far > 2.25) {
        if (farStatusElem) {
          farStatusElem.textContent = 'Exceeds Permissible FAR (Max 2.25)';
          farStatusElem.className = 'calc-status badge-danger';
        }
      } else {
        if (farStatusElem) {
          farStatusElem.textContent = 'Within Permissible Limit (Max 2.25)';
          farStatusElem.className = 'calc-status badge-success';
        }
      }

      // Ground Coverage check (60% max standard)
      if (covPercent > 60.0) {
        if (covStatusElem) {
          covStatusElem.textContent = 'Exceeds Permissible 60%';
          covStatusElem.className = 'calc-status badge-danger';
        }
      } else {
        if (covStatusElem) {
          covStatusElem.textContent = 'Within Permissible 60%';
          covStatusElem.className = 'calc-status badge-success';
        }
      }
    }
  }

  goToFormStep(stepNum) {
    if (stepNum < 1 || stepNum > 6) return;

    // Toggle panels
    document.querySelectorAll('.wizard-step-panel').forEach(p => {
      p.classList.remove('active');
      p.classList.add('hidden');
    });
    const targetPanel = document.getElementById(`wizard-step-${stepNum}`);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
      targetPanel.classList.add('active');
    }

    // Toggle stepper buttons
    document.querySelectorAll('.step-node').forEach(node => {
      const s = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('active', 'completed');
      if (s === stepNum) {
        node.classList.add('active');
        node.setAttribute('aria-selected', 'true');
      } else if (s < stepNum) {
        node.classList.add('completed');
        node.setAttribute('aria-selected', 'false');
      } else {
        node.setAttribute('aria-selected', 'false');
      }
    });

    this.formCurrentStep = stepNum;

    // Button states
    const prevBtn = document.getElementById('btn-wizard-prev');
    const nextBtn = document.getElementById('btn-wizard-next');
    const submitBtn = document.getElementById('btn-wizard-submit');

    if (stepNum === 1) {
      prevBtn?.classList.add('hidden');
    } else {
      prevBtn?.classList.remove('hidden');
    }

    if (stepNum === 6) {
      nextBtn?.classList.add('hidden');
      submitBtn?.classList.remove('hidden');
      this.populateReviewSummary();
    } else {
      nextBtn?.classList.remove('hidden');
      submitBtn?.classList.add('hidden');
    }

    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  validateCurrentStep() {
    const currentPanel = document.getElementById(`wizard-step-${this.formCurrentStep}`);
    if (!currentPanel) return true;

    let isValid = true;
    const inputs = currentPanel.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!isValid) {
      this.showToast('Validation Error', 'Please complete all required fields with valid values.', 'danger');
    }

    return isValid;
  }

  populateReviewSummary() {
    const summaryContainer = document.getElementById('review-summary-content');
    if (!summaryContainer) return;

    const fullName = document.getElementById('app-full-name')?.value || 'N/A';
    const ownership = document.getElementById('app-ownership-type')?.value || 'N/A';
    const email = document.getElementById('app-email')?.value || 'N/A';
    const mobile = document.getElementById('app-mobile')?.value || 'N/A';
    const ward = document.getElementById('prop-ward')?.value || 'N/A';
    const plotNo = document.getElementById('prop-plot-no')?.value || 'N/A';
    const plotArea = document.getElementById('prop-plot-area')?.value || '0';
    const zoning = document.getElementById('prop-zoning')?.value || 'N/A';
    const occupancy = document.getElementById('bldg-occupancy')?.value || 'N/A';
    const floors = document.getElementById('bldg-floors')?.value || 'N/A';
    const builtup = document.getElementById('bldg-builtup-area')?.value || '0';
    const archName = document.getElementById('arch-name')?.value || 'N/A';
    const archReg = document.getElementById('arch-reg-no')?.value || 'N/A';

    const far = (parseFloat(builtup) / parseFloat(plotArea)).toFixed(2);
    const estFee = Math.round((parseFloat(plotArea) * 45) + (parseFloat(builtup) * 120));

    summaryContainer.innerHTML = `
      <div class="review-block">
        <h4>1. Applicant &amp; Ownership Particulars</h4>
        <table class="review-table">
          <tr><td>Full Name:</td><td><strong>${fullName}</strong></td></tr>
          <tr><td>Ownership:</td><td>${ownership}</td></tr>
          <tr><td>Contact:</td><td>${email} | ${mobile}</td></tr>
        </table>
      </div>
      <div class="review-block">
        <h4>2. Property &amp; Site Details</h4>
        <table class="review-table">
          <tr><td>Municipal Ward:</td><td><strong>${ward}</strong></td></tr>
          <tr><td>Plot Reference:</td><td>${plotNo}</td></tr>
          <tr><td>Plot Area:</td><td>${plotArea} sq. meters</td></tr>
          <tr><td>Land-Use Zoning:</td><td>${zoning}</td></tr>
        </table>
      </div>
      <div class="review-block">
        <h4>3. Proposed Building Specifications</h4>
        <table class="review-table">
          <tr><td>Occupancy:</td><td><strong>${occupancy}</strong></td></tr>
          <tr><td>Floors &amp; Height:</td><td>${floors}</td></tr>
          <tr><td>Total Built-up:</td><td>${builtup} sq. meters (Calculated FAR: ${far})</td></tr>
          <tr><td>Estimated Fee:</td><td><strong>&#8377; ${estFee.toLocaleString('en-IN')}</strong></td></tr>
        </table>
      </div>
      <div class="review-block">
        <h4>4. Architect &amp; Professional Endorsement</h4>
        <table class="review-table">
          <tr><td>Supervising Architect:</td><td>${archName} (CoA: ${archReg})</td></tr>
        </table>
      </div>
    `;
  }

  resetOrLoadForm(editId = null) {
    const form = document.getElementById('building-permit-form');
    if (form) form.reset();
    document.getElementById('form-editing-id').value = editId || '';

    if (editId) {
      const app = PermitNowStore.getApplicationById(editId);
      if (app) {
        document.getElementById('app-full-name').value = app.applicantName || '';
        document.getElementById('app-ownership-type').value = app.ownershipType || '';
        document.getElementById('app-email').value = app.email || '';
        document.getElementById('app-mobile').value = app.mobile || '';
        document.getElementById('app-gov-id').value = app.govId || '';
        document.getElementById('app-postal-address').value = app.postalAddress || '';
        document.getElementById('prop-ward').value = app.ward || '';
        document.getElementById('prop-plot-no').value = app.plotNo || '';
        document.getElementById('prop-survey-no').value = app.surveyNo || '';
        document.getElementById('prop-plot-area').value = app.plotArea || '';
        document.getElementById('prop-road-width').value = app.roadWidth || '';
        document.getElementById('prop-zoning').value = app.zoning || '';
        document.getElementById('bldg-occupancy').value = app.occupancy || '';
        document.getElementById('bldg-floors').value = app.floors || '';
        document.getElementById('bldg-height-meters').value = app.heightMeters || '';
        document.getElementById('bldg-ground-coverage').value = app.groundCoverage || '';
        document.getElementById('bldg-builtup-area').value = app.builtupArea || '';
        document.getElementById('bldg-parking-slots').value = app.parkingSlots || '';
        document.getElementById('arch-name').value = app.architectName || '';
        document.getElementById('arch-reg-no').value = app.architectReg || '';
      }
    }

    this.recalculateSpecs();
    this.goToFormStep(1);
  }

  saveApplicationDraft() {
    const editId = document.getElementById('form-editing-id')?.value;
    const newId = editId || `PN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const plotArea = parseFloat(document.getElementById('prop-plot-area')?.value) || 300;
    const builtup = parseFloat(document.getElementById('bldg-builtup-area')?.value) || 450;
    const coverage = parseFloat(document.getElementById('bldg-ground-coverage')?.value) || 180;
    const estFee = Math.round((plotArea * 45) + (builtup * 120));

    const draftApp = {
      id: newId,
      submissionDate: '',
      applicantName: document.getElementById('app-full-name')?.value || 'Draft Applicant',
      ownershipType: document.getElementById('app-ownership-type')?.value || 'Individual Freehold',
      email: document.getElementById('app-email')?.value || 'draft@mail.demo',
      mobile: document.getElementById('app-mobile')?.value || '9800000000',
      govId: document.getElementById('app-gov-id')?.value || 'ABCD1234E',
      postalAddress: document.getElementById('app-postal-address')?.value || 'Municipal jurisdiction',
      ward: document.getElementById('prop-ward')?.value || 'Ward 03 - North Zone',
      plotNo: document.getElementById('prop-plot-no')?.value || 'Plot in progress',
      surveyNo: document.getElementById('prop-survey-no')?.value || 'Sy. Pending',
      plotArea,
      roadWidth: parseFloat(document.getElementById('prop-road-width')?.value) || 9.0,
      zoning: document.getElementById('prop-zoning')?.value || 'Residential R-1 (Low Density)',
      occupancy: document.getElementById('bldg-occupancy')?.value || 'Residential (Single Family)',
      floors: document.getElementById('bldg-floors')?.value || 'G+1 (Ground + 1 Upper)',
      heightMeters: parseFloat(document.getElementById('bldg-height-meters')?.value) || 7.5,
      groundCoverage: coverage,
      builtupArea: builtup,
      parkingSlots: parseInt(document.getElementById('bldg-parking-slots')?.value, 10) || 2,
      far: (builtup / plotArea).toFixed(2),
      coveragePercent: ((coverage / plotArea) * 100).toFixed(1),
      architectName: document.getElementById('arch-name')?.value || 'Rajesh Sharma',
      architectReg: document.getElementById('arch-reg-no')?.value || 'CA/2018/98421',
      engineerName: document.getElementById('eng-name')?.value || 'Dr. Arvind V. Kulkarni',
      engineerLic: document.getElementById('eng-lic-no')?.value || 'STR-ENG-2015-0412',
      status: 'Draft',
      slaDaysElapsed: 0,
      feeStatus: 'Unpaid',
      feeAmount: estFee,
      feeReceipt: '',
      permitNo: '',
      sanctionDate: '',
      siteInspection: {
        status: 'Draft Saved',
        officer: 'Unassigned',
        inspectionDate: 'N/A',
        remarks: 'Application saved as draft.'
      },
      documents: [
        { name: 'Uploaded_SitePlan.pdf', size: '1.5 MB', date: 'Today', type: 'Site Plan' }
      ],
      scrutiny: {
        town_planning: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
        fire_safety: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
        structural: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
        environmental: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
        water_sewerage: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' },
        traffic: { status: 'Draft', officer: 'Unassigned', date: '', remarks: 'Draft state.' }
      },
      timeline: [
        { title: 'Application Draft Saved', date: 'Just now', note: 'Saved in local draft store.' }
      ]
    };

    PermitNowStore.saveOrUpdateApplication(draftApp);
    this.showToast('Draft Saved', `Application ${newId} saved as draft successfully.`, 'success');
    this.showView('applicant-dashboard');
  }

  submitFinalApplication() {
    const editId = document.getElementById('form-editing-id')?.value;
    const newId = editId || `PN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const plotArea = parseFloat(document.getElementById('prop-plot-area')?.value) || 300;
    const builtup = parseFloat(document.getElementById('bldg-builtup-area')?.value) || 450;
    const coverage = parseFloat(document.getElementById('bldg-ground-coverage')?.value) || 180;
    const estFee = Math.round((plotArea * 45) + (builtup * 120));
    const todayStr = new Date().toISOString().split('T')[0];

    const submittedApp = {
      id: newId,
      submissionDate: todayStr,
      applicantName: document.getElementById('app-full-name').value,
      ownershipType: document.getElementById('app-ownership-type').value,
      email: document.getElementById('app-email').value,
      mobile: document.getElementById('app-mobile').value,
      govId: document.getElementById('app-gov-id').value,
      postalAddress: document.getElementById('app-postal-address').value,
      ward: document.getElementById('prop-ward').value,
      plotNo: document.getElementById('prop-plot-no').value,
      surveyNo: document.getElementById('prop-survey-no').value,
      plotArea,
      roadWidth: parseFloat(document.getElementById('prop-road-width').value),
      zoning: document.getElementById('prop-zoning').value,
      occupancy: document.getElementById('bldg-occupancy').value,
      floors: document.getElementById('bldg-floors').value,
      heightMeters: parseFloat(document.getElementById('bldg-height-meters').value),
      groundCoverage: coverage,
      builtupArea: builtup,
      parkingSlots: parseInt(document.getElementById('bldg-parking-slots').value, 10),
      far: (builtup / plotArea).toFixed(2),
      coveragePercent: ((coverage / plotArea) * 100).toFixed(1),
      architectName: document.getElementById('arch-name').value,
      architectReg: document.getElementById('arch-reg-no').value,
      engineerName: document.getElementById('eng-name').value,
      engineerLic: document.getElementById('eng-lic-no').value,
      status: 'Submitted',
      slaDaysElapsed: 1,
      feeStatus: 'Pending',
      feeAmount: estFee,
      feeReceipt: '',
      permitNo: '',
      sanctionDate: '',
      siteInspection: {
        status: 'Scheduled',
        officer: 'Ward Town Planning Cell',
        inspectionDate: 'Will be assigned post fee clearance',
        remarks: 'Physical verification inspection queued.'
      },
      documents: [
        { name: 'Site_Plan_Submission.pdf', size: '1.8 MB', date: todayStr, type: 'Site Plan' },
        { name: 'Architectural_Drawings.dwg', size: '4.2 MB', date: todayStr, type: 'Architectural Set' },
        { name: 'Registered_Sale_Deed.pdf', size: '3.1 MB', date: todayStr, type: 'Title Deed' },
        { name: 'Structural_Stability_Certificate.pdf', size: '1.2 MB', date: todayStr, type: 'Structural Safety' }
      ],
      scrutiny: {
        town_planning: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'File in initial scrutiny queue.' },
        fire_safety: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'File in initial scrutiny queue.' },
        structural: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'File in initial scrutiny queue.' },
        environmental: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'File in initial scrutiny queue.' },
        water_sewerage: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'File in initial scrutiny queue.' },
        traffic: { status: 'Pending', officer: 'Unassigned', date: '', remarks: 'File in initial scrutiny queue.' }
      },
      timeline: [
        { title: 'Application Submitted Online', date: 'Just now', note: 'Successfully filed for single-window scrutiny under Byelaws 2024.' },
        { title: 'Statutory 30-Day Clock Started', date: 'Day 1 of 30', note: 'Disposal SLA tracking initiated.' }
      ]
    };

    PermitNowStore.saveOrUpdateApplication(submittedApp);
    PermitNowStore.addNotification('New Application Submitted', `Application ${newId} submitted for ${submittedApp.ward}.`, newId);
    this.updateNotificationsUI();

    this.showToast('Application Submitted!', `Application ${newId} has been successfully filed into municipal queue.`, 'success');
    this.showView('application-details', { id: newId });
  }

  // --------------------------------------------------------------------------
  // Application Details Page Logic
  // --------------------------------------------------------------------------
  bindApplicationDetails() {
    document.getElementById('btn-back-to-dashboard')?.addEventListener('click', () => {
      if (this.currentRole.type === 'officer') {
        this.showView('officer-dashboard');
      } else if (this.currentRole.type === 'admin') {
        this.showView('admin-dashboard');
      } else {
        this.showView('applicant-dashboard');
      }
    });

    document.getElementById('btn-pay-fees-online')?.addEventListener('click', () => {
      if (this.activeApplicationId) {
        this.openPaymentModal(this.activeApplicationId);
      }
    });

    document.getElementById('btn-download-sanction-letter')?.addEventListener('click', () => {
      if (this.activeApplicationId) {
        this.openSanctionModal(this.activeApplicationId);
      }
    });

    // Deficiency resubmission form
    const formResubmit = document.getElementById('form-resubmit-deficiency');
    formResubmit?.addEventListener('submit', (e) => {
      e.preventDefault();
      const remarks = document.getElementById('resubmit-remarks')?.value.trim();
      const fileInput = document.getElementById('resubmit-file');

      if (!remarks || remarks.length < 10) {
        this.showToast('Validation Error', 'Please enter a detailed explanation of rectifications.', 'danger');
        return;
      }

      const app = PermitNowStore.getApplicationById(this.activeApplicationId);
      if (!app) return;

      // Update app status back to Under Scrutiny
      app.status = 'Under Scrutiny';

      // Reset any deficiency in depts back to Pending
      Object.keys(app.scrutiny).forEach(deptKey => {
        if (app.scrutiny[deptKey].status === 'Deficiency') {
          app.scrutiny[deptKey].status = 'Pending';
          app.scrutiny[deptKey].remarks = `Resubmitted by citizen: "${remarks}" - Awaiting re-inspection.`;
        }
      });

      // Add attached document
      const fileName = (fileInput?.files && fileInput.files[0]) ? fileInput.files[0].name : 'Rectified_Drawings_Rev3.pdf';
      app.documents.push({
        name: fileName,
        size: '2.8 MB',
        date: new Date().toISOString().split('T')[0],
        type: 'Citizen Rectified Drawing'
      });

      // Append timeline entry
      app.timeline.unshift({
        title: 'Deficiency Rectification Submitted',
        date: 'Just now',
        note: `Applicant submitted revised drawings and explanation: "${remarks}". 30-day scrutiny resumed.`
      });

      PermitNowStore.saveOrUpdateApplication(app);
      PermitNowStore.addNotification('Deficiency Rectified', `Applicant resubmitted compliance for ${app.id}.`, app.id);
      this.updateNotificationsUI();

      this.showToast('Compliance Submitted', 'Rectified drawings registered. Scrutiny has resumed.', 'success');
      this.renderApplicationDetails(app.id);
    });
  }

  renderApplicationDetails(appId) {
    const app = PermitNowStore.getApplicationById(appId);
    if (!app) {
      this.showToast('Not Found', `Application ${appId} could not be located.`, 'danger');
      this.showView('applicant-dashboard');
      return;
    }

    this.activeApplicationId = app.id;

    // Header Meta
    document.getElementById('details-breadcrumb-id').textContent = app.id;
    document.getElementById('details-heading').textContent = `Application: ${app.id}`;

    const badge = document.getElementById('details-status-badge');
    badge.textContent = app.status;
    badge.className = `status-badge ${this.getStatusBadgeClass(app.status)}`;

    document.getElementById('details-meta-line').textContent =
      `Submitted: ${app.submissionDate ? this.formatDate(app.submissionDate) : 'Draft'} • Applicant: ${app.applicantName} • ${app.ward}`;

    // Conditional Action Buttons
    const btnSanction = document.getElementById('btn-download-sanction-letter');
    const btnPay = document.getElementById('btn-pay-fees-online');

    if (app.status === 'Approved') {
      btnSanction?.classList.remove('hidden');
    } else {
      btnSanction?.classList.add('hidden');
    }

    if (app.feeStatus === 'Pending') {
      btnPay?.classList.remove('hidden');
    } else {
      btnPay?.classList.add('hidden');
    }

    // 30-Day SLA Progress
    const slaDays = app.slaDaysElapsed || 1;
    const progressPercent = Math.min(100, Math.round((slaDays / 30) * 100));
    document.getElementById('details-sla-title').textContent = `Statutory SLA Progress: Day ${slaDays} of 30`;
    document.getElementById('details-sla-fill').style.width = `${progressPercent}%`;

    const slaSub = document.getElementById('details-sla-sub');
    if (slaDays > 30) {
      slaSub.textContent = `Breached statutory 30-day limit by ${slaDays - 30} days`;
      slaSub.style.color = 'var(--color-danger)';
    } else {
      slaSub.textContent = `${30 - slaDays} working days remaining for statutory municipal disposal`;
      slaSub.style.color = 'var(--color-text-muted)';
    }

    // Deficiency Panel Visibility
    const defPanel = document.getElementById('deficiency-action-panel');
    const defList = document.getElementById('details-deficiency-list');
    if (app.status === 'Deficiency Raised') {
      defPanel?.classList.remove('hidden');
      if (defList) {
        defList.innerHTML = '';
        Object.entries(app.scrutiny).forEach(([deptKey, val]) => {
          if (val.status === 'Deficiency') {
            const deptObj = DEPARTMENTS.find(d => d.id === deptKey);
            const item = document.createElement('div');
            item.className = 'def-item';
            item.innerHTML = `
              <span class="def-dept-tag">${deptObj ? deptObj.name : deptKey}:</span>
              <span>${val.remarks || 'Corrections requested.'}</span>
              <span style="font-size:0.75rem; color:var(--color-text-light); display:block;">Raised on: ${val.date || 'Recent'} by ${val.officer || 'Officer'}</span>
            `;
            defList.appendChild(item);
          }
        });
      }
    } else {
      defPanel?.classList.add('hidden');
    }

    // 6-Department Scrutiny Matrix
    const matrixContainer = document.getElementById('details-scrutiny-matrix');
    const deptCountBadge = document.getElementById('details-dept-count-badge');
    if (matrixContainer) {
      matrixContainer.innerHTML = '';
      let clearedCount = 0;

      DEPARTMENTS.forEach(dept => {
        const itemData = app.scrutiny[dept.id] || { status: 'Pending', officer: 'Unassigned', date: '', remarks: '' };
        if (itemData.status === 'Approved') clearedCount++;

        const row = document.createElement('div');
        row.className = 'scrutiny-item';
        row.innerHTML = `
          <div class="scrutiny-left">
            <div class="scrutiny-dept-icon">${dept.icon}</div>
            <div class="scrutiny-dept-info">
              <strong>${dept.name}</strong>
              <span>Officer: ${itemData.officer || 'Pending Assignment'}</span>
              ${itemData.remarks ? `<div class="scrutiny-remark-text">Remarks: ${itemData.remarks}</div>` : ''}
            </div>
          </div>
          <div style="text-align:right;">
            <span class="status-badge ${this.getStatusBadgeClass(itemData.status)}">${itemData.status}</span>
            <div style="font-size:0.725rem; color:var(--color-text-light); margin-top:0.25rem;">
              ${itemData.date ? this.formatDate(itemData.date) : 'Turnaround ~' + dept.standardTurnaround + 'd'}
            </div>
          </div>
        `;
        matrixContainer.appendChild(row);
      });

      if (deptCountBadge) {
        deptCountBadge.textContent = `${clearedCount} of 6 Cleared`;
      }
    }

    // Uploaded Documents
    const docContainer = document.getElementById('details-doc-list');
    if (docContainer) {
      docContainer.innerHTML = '';
      app.documents.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'doc-item';
        item.innerHTML = `
          <div>
            <div class="doc-name">${doc.name}</div>
            <div class="doc-meta">${doc.type} &bull; ${doc.size} &bull; Uploaded ${doc.date}</div>
          </div>
          <button type="button" class="btn btn-outline btn-small btn-inspect-doc">
            View / Verify
          </button>
        `;
        item.querySelector('.btn-inspect-doc')?.addEventListener('click', () => {
          this.openDocumentModal(doc);
        });
        docContainer.appendChild(item);
      });
    }

    // Site Inspection
    const siteBody = document.getElementById('details-site-visit-body');
    const siteStatusPill = document.getElementById('details-site-status');
    if (siteBody && app.siteInspection) {
      siteStatusPill.textContent = app.siteInspection.status;
      siteBody.innerHTML = `
        <div class="site-visit-row"><strong>Inspection Officer:</strong> ${app.siteInspection.officer}</div>
        <div class="site-visit-row"><strong>Scheduled / Verified Date:</strong> ${app.siteInspection.inspectionDate}</div>
        <div class="site-visit-row"><strong>Inspection Notes:</strong> ${app.siteInspection.remarks}</div>
      `;
    }

    // Specifications List
    const specsList = document.getElementById('details-specs-list');
    if (specsList) {
      specsList.innerHTML = `
        <dt>Proposed Occupancy</dt>
        <dd>${app.occupancy}</dd>

        <dt>Plot Size &amp; Road Width</dt>
        <dd>${app.plotArea} sq.m &bull; ${app.roadWidth}m abutting road</dd>

        <dt>Built-Up Area &amp; FAR</dt>
        <dd>${app.builtupArea} sq.m (FAR: ${app.far})</dd>

        <dt>Floors &amp; Height</dt>
        <dd>${app.floors} &bull; ${app.heightMeters} meters</dd>

        <dt>Off-Street Parking</dt>
        <dd>${app.parkingSlots} ECS provided</dd>

        <dt>Registered Architect</dt>
        <dd>${app.architectName} (${app.architectReg})</dd>
      `;
    }

    // Fees Card
    const feeBadge = document.getElementById('details-fee-status-badge');
    const feeContent = document.getElementById('details-fee-content');
    if (feeBadge && feeContent) {
      const isPaid = app.feeStatus === 'Paid';
      feeBadge.textContent = isPaid ? 'Fee Paid' : 'Payment Pending';
      feeBadge.className = `fee-badge ${isPaid ? '' : 'pending'}`;

      const totalFee = app.feeAmount || 50000;
      const scrutinyPart = Math.round(totalFee * 0.35);
      const cessPart = Math.round(totalFee * 0.50);
      const bettermentPart = totalFee - scrutinyPart - cessPart;

      feeContent.innerHTML = `
        <div class="fee-line"><span>Scrutiny Fee:</span><strong>&#8377; ${scrutinyPart.toLocaleString('en-IN')}</strong></div>
        <div class="fee-line"><span>Infrastructure Cess:</span><strong>&#8377; ${cessPart.toLocaleString('en-IN')}</strong></div>
        <div class="fee-line"><span>Betterment Levy:</span><strong>&#8377; ${bettermentPart.toLocaleString('en-IN')}</strong></div>
        <div class="fee-line fee-total"><span>Total Municipal Assessment:</span><strong>&#8377; ${totalFee.toLocaleString('en-IN')}</strong></div>
        <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:0.5rem;">
          ${isPaid ? `Payment Acknowledged &bull; Ref: ${app.feeReceipt}` : 'Awaiting online treasury payment from applicant'}
        </div>
      `;
    }

    // Audit Timeline
    const timelineList = document.getElementById('details-audit-timeline');
    if (timelineList) {
      timelineList.innerHTML = '';
      app.timeline.forEach(t => {
        const li = document.createElement('li');
        li.className = 'timeline-entry';
        li.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-title">${t.title}</div>
          <span class="timeline-time">${t.date}</span>
          <div class="timeline-desc">${t.note}</div>
        `;
        timelineList.appendChild(li);
      });
    }
  }

  // --------------------------------------------------------------------------
  // Department Officer Dashboard Logic
  // --------------------------------------------------------------------------
  bindOfficerDashboard() {
    const deptSelect = document.getElementById('officer-active-dept-select');
    deptSelect?.addEventListener('change', (e) => {
      this.officerDepartment = e.target.value;
      this.currentRole.dept = e.target.value;
      PermitNowStore.setCurrentRole(this.currentRole);
      this.updateRoleDisplay();
      this.renderOfficerDashboard();
    });

    // Filters
    document.getElementById('officer-search-input')?.addEventListener('input', () => this.renderOfficerQueue());
    document.getElementById('officer-age-filter')?.addEventListener('change', () => this.renderOfficerQueue());
    document.getElementById('officer-status-filter')?.addEventListener('change', () => this.renderOfficerQueue());

    // Officer Decision Form in Modal
    const decisionForm = document.getElementById('form-officer-decision');
    decisionForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveOfficerDecision();
    });

    document.getElementById('btn-close-review-modal')?.addEventListener('click', () => {
      document.getElementById('modal-officer-review')?.classList.add('hidden');
    });
    document.getElementById('btn-cancel-review')?.addEventListener('click', () => {
      document.getElementById('modal-officer-review')?.classList.add('hidden');
    });
  }

  renderOfficerDashboard() {
    const deptSelect = document.getElementById('officer-active-dept-select');
    if (deptSelect) deptSelect.value = this.officerDepartment;

    const deptObj = DEPARTMENTS.find(d => d.id === this.officerDepartment) || DEPARTMENTS[0];
    document.getElementById('officer-queue-title').textContent = `Assigned Scrutiny Queue (${deptObj.name})`;
    document.getElementById('officer-stat-turnaround').textContent = `${deptObj.standardTurnaround} Days`;

    // Metrics for this department
    const apps = PermitNowStore.getApplications().filter(a => a.status !== 'Draft');
    let pendingCount = 0;
    let defCount = 0;
    let clearedCount = 0;

    apps.forEach(a => {
      const dStatus = a.scrutiny[this.officerDepartment]?.status || 'Pending';
      if (dStatus === 'Pending') pendingCount++;
      if (dStatus === 'Deficiency') defCount++;
      if (dStatus === 'Approved') clearedCount++;
    });

    document.getElementById('officer-stat-pending').textContent = pendingCount;
    document.getElementById('officer-stat-deficiencies').textContent = defCount;
    document.getElementById('officer-stat-cleared').textContent = clearedCount;

    this.renderOfficerQueue();
  }

  renderOfficerQueue() {
    const apps = PermitNowStore.getApplications().filter(a => a.status !== 'Draft');
    const tbody = document.getElementById('officer-queue-tbody');
    const emptyState = document.getElementById('officer-empty-state');
    const searchVal = (document.getElementById('officer-search-input')?.value || '').toLowerCase().trim();
    const ageFilter = document.getElementById('officer-age-filter')?.value || 'all';
    const statusFilter = document.getElementById('officer-status-filter')?.value || 'all';

    if (!tbody) return;

    let filtered = apps.filter(app => {
      const deptStatus = app.scrutiny[this.officerDepartment]?.status || 'Pending';

      // Status filter
      if (statusFilter !== 'all' && deptStatus !== statusFilter) return false;

      // Age filter
      if (ageFilter === 'fresh' && app.slaDaysElapsed >= 10) return false;
      if (ageFilter === 'mid' && (app.slaDaysElapsed < 10 || app.slaDaysElapsed > 20)) return false;
      if (ageFilter === 'critical' && app.slaDaysElapsed <= 20) return false;

      // Search filter
      if (searchVal) {
        const matches = app.id.toLowerCase().includes(searchVal) ||
                        app.applicantName.toLowerCase().includes(searchVal) ||
                        app.ward.toLowerCase().includes(searchVal);
        if (!matches) return false;
      }

      return true;
    });

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      tbody.classList.add('hidden');
      emptyState?.classList.remove('hidden');
      return;
    }

    tbody.classList.remove('hidden');
    emptyState?.classList.add('hidden');

    filtered.forEach(app => {
      const tr = document.createElement('tr');
      const deptData = app.scrutiny[this.officerDepartment] || { status: 'Pending' };
      const ageClass = this.getSlaAgeClass(app.slaDaysElapsed);

      tr.innerHTML = `
        <td>
          <a href="#" class="officer-app-link" data-id="${app.id}"><strong>${app.id}</strong></a>
        </td>
        <td>
          <strong>${app.applicantName}</strong>
          <div style="font-size:0.75rem; color:var(--color-text-light);">${app.occupancy} (${app.floors})</div>
        </td>
        <td>
          ${app.ward}
          <div style="font-size:0.75rem; color:var(--color-text-light);">${app.plotNo}</div>
        </td>
        <td>
          <span class="sla-age-badge ${ageClass}">
            <span class="age-days">Day ${app.slaDaysElapsed}</span>
            <span>of 30 Days</span>
          </span>
        </td>
        <td>
          <span class="status-badge ${this.getStatusBadgeClass(deptData.status)}">${deptData.status}</span>
        </td>
        <td class="text-right">
          <button type="button" class="btn btn-primary btn-small btn-review-queue-item" data-id="${app.id}">
            Review Plan
          </button>
        </td>
      `;

      tr.querySelector('.officer-app-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.showView('application-details', { id: app.id });
      });

      tr.querySelector('.btn-review-queue-item')?.addEventListener('click', () => {
        this.openOfficerReviewModal(app.id);
      });

      tbody.appendChild(tr);
    });
  }

  openOfficerReviewModal(appId) {
    const app = PermitNowStore.getApplicationById(appId);
    if (!app) return;

    this.officerReviewApp = app;
    const modal = document.getElementById('modal-officer-review');
    const deptObj = DEPARTMENTS.find(d => d.id === this.officerDepartment) || DEPARTMENTS[0];

    document.getElementById('modal-review-dept-label').textContent = `${deptObj.name} Scrutiny`;
    document.getElementById('modal-review-app-id').textContent = app.id;

    // Summary brief
    const summaryBox = document.getElementById('modal-review-summary');
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.75rem; font-size:0.8125rem;">
          <div><strong>Applicant:</strong> ${app.applicantName}</div>
          <div><strong>Ward:</strong> ${app.ward}</div>
          <div><strong>Plot Area:</strong> ${app.plotArea} sq.m</div>
          <div><strong>Proposed Built-Up:</strong> ${app.builtupArea} sq.m</div>
          <div><strong>Calculated FAR:</strong> ${app.far}</div>
          <div><strong>30-Day SLA Age:</strong> Day ${app.slaDaysElapsed}</div>
        </div>
      `;
    }

    // Document links
    const docPills = document.getElementById('modal-review-doc-pills');
    if (docPills) {
      docPills.innerHTML = '';
      app.documents.forEach(d => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'doc-pill-btn';
        btn.textContent = `📄 ${d.name} (${d.size})`;
        btn.addEventListener('click', () => this.openDocumentModal(d));
        docPills.appendChild(btn);
      });
    }

    // Pre-populate existing decision if any
    const existing = app.scrutiny[this.officerDepartment];
    const radios = document.getElementsByName('officer_decision_action');
    radios.forEach(r => {
      r.checked = (r.value === existing?.status);
    });

    const remarksElem = document.getElementById('officer-decision-remarks');
    if (remarksElem) {
      remarksElem.value = existing?.remarks || '';
      remarksElem.classList.remove('is-invalid');
    }

    modal?.classList.remove('hidden');
  }

  saveOfficerDecision() {
    if (!this.officerReviewApp) return;

    const actionRadios = document.getElementsByName('officer_decision_action');
    let selectedAction = '';
    actionRadios.forEach(r => {
      if (r.checked) selectedAction = r.value;
    });

    const remarksElem = document.getElementById('officer-decision-remarks');
    const remarks = remarksElem?.value.trim();

    if (!selectedAction) {
      this.showToast('Select Action', 'Please choose Clearance, Deficiency, or Rejection.', 'warning');
      return;
    }

    if (!remarks || remarks.length < 8) {
      remarksElem?.classList.add('is-invalid');
      this.showToast('Validation Error', 'Official remarks with statutory reasoning are mandatory (min 8 chars).', 'danger');
      return;
    }
    remarksElem?.classList.remove('is-invalid');

    const app = this.officerReviewApp;
    const deptKey = this.officerDepartment;
    const deptObj = DEPARTMENTS.find(d => d.id === deptKey);
    const todayStr = new Date().toISOString().split('T')[0];

    // Record department scrutiny
    app.scrutiny[deptKey] = {
      status: selectedAction,
      officer: `Officer (${deptObj?.name})`,
      date: todayStr,
      remarks: remarks
    };

    // Recompute overall application status
    let hasRejection = false;
    let hasDeficiency = false;
    let allApproved = true;

    DEPARTMENTS.forEach(d => {
      const st = app.scrutiny[d.id]?.status;
      if (st === 'Rejected') hasRejection = true;
      if (st === 'Deficiency') hasDeficiency = true;
      if (st !== 'Approved') allApproved = false;
    });

    if (hasRejection) {
      app.status = 'Rejected';
    } else if (hasDeficiency) {
      app.status = 'Deficiency Raised';
    } else if (allApproved) {
      app.status = 'Approved';
      app.permitNo = `MNC/BP/2026/${Math.floor(1000 + Math.random() * 9000)}`;
      app.sanctionDate = todayStr;
    } else {
      app.status = 'Under Scrutiny';
    }

    // Add timeline entry
    app.timeline.unshift({
      title: `${deptObj?.name}: Decision Recorded (${selectedAction})`,
      date: 'Just now',
      note: `Remarks: "${remarks}". Overall statutory status is now ${app.status}.`
    });

    PermitNowStore.saveOrUpdateApplication(app);
    PermitNowStore.addNotification(
      `${deptObj?.name} Clearance Update`,
      `${selectedAction} recorded for ${app.id} (${app.applicantName}).`,
      app.id
    );

    document.getElementById('modal-officer-review')?.classList.add('hidden');
    this.updateNotificationsUI();
    this.showToast('Decision Saved', `${deptObj?.name} clearance recorded as ${selectedAction}.`, 'success');
    this.renderOfficerDashboard();
  }

  // --------------------------------------------------------------------------
  // Administrator Dashboard & Charts
  // --------------------------------------------------------------------------
  bindAdminDashboard() {
    // Escalated table expedite buttons are dynamically generated
  }

  renderAdminDashboard() {
    const apps = PermitNowStore.getApplications().filter(a => a.status !== 'Draft');

    const total = apps.length;
    const approved = apps.filter(a => a.status === 'Approved').length;
    const scrutiny = apps.filter(a => a.status === 'Under Scrutiny').length;
    const deficiencies = apps.filter(a => a.status === 'Deficiency Raised').length;
    const rejected = apps.filter(a => a.status === 'Rejected').length;

    document.getElementById('admin-stat-total').textContent = total;
    document.getElementById('admin-stat-approved').textContent = approved;
    document.getElementById('admin-stat-scrutiny').textContent = scrutiny;
    document.getElementById('admin-stat-deficiencies').textContent = deficiencies;
    document.getElementById('admin-stat-rejected').textContent = rejected;

    // 30-Day SLA Target Compliance Gauge
    const onTimeApproved = apps.filter(a => a.status === 'Approved' && a.slaDaysElapsed <= 30).length;
    const totalDisposed = approved + rejected;
    let slaRate = 89.4;
    if (totalDisposed > 0) {
      slaRate = ((onTimeApproved / totalDisposed) * 100).toFixed(1);
    }

    const circleFill = document.getElementById('admin-sla-circle-fill');
    const circleText = document.getElementById('admin-sla-text');
    if (circleFill && circleText) {
      circleFill.setAttribute('stroke-dasharray', `${slaRate}, 100`);
      circleText.textContent = `${slaRate}%`;
    }

    // Render SVG Bar Chart: Department Turnaround Times
    this.renderAdminDeptBarChart();

    // Render Status Distribution Stack
    this.renderAdminStatusDistribution(apps);

    // Render Escalated Applications Table
    this.renderAdminEscalatedTable(apps);

    // Update Directory Active Queue counts
    DEPARTMENTS.forEach(dept => {
      const qCount = apps.filter(a => a.scrutiny[dept.id]?.status === 'Pending').length;
      let elId = '';
      if (dept.id === 'town_planning') elId = 'cell-tp-queue';
      if (dept.id === 'fire_safety') elId = 'cell-fire-queue';
      if (dept.id === 'structural') elId = 'cell-str-queue';
      if (dept.id === 'environmental') elId = 'cell-env-queue';
      if (dept.id === 'water_sewerage') elId = 'cell-water-queue';
      if (dept.id === 'traffic') elId = 'cell-traffic-queue';
      const cell = document.getElementById(elId);
      if (cell) cell.textContent = `${qCount} Active`;
    });
  }

  renderAdminDeptBarChart() {
    const container = document.getElementById('admin-dept-bar-chart');
    if (!container) return;

    container.innerHTML = '';
    const chartWrap = document.createElement('div');
    chartWrap.className = 'bar-chart-wrap';

    const maxDays = 12; // Visual scale max

    DEPARTMENTS.forEach(d => {
      const days = d.standardTurnaround;
      const pct = Math.min(100, Math.round((days / maxDays) * 100));
      const isWarning = days > 7.0;

      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <span class="bar-label" title="${d.name}">${d.name}</span>
        <div class="bar-track">
          <div class="bar-fill ${isWarning ? 'warning' : ''}" style="width: ${pct}%;"></div>
        </div>
        <span class="bar-val">${days}d</span>
      `;
      chartWrap.appendChild(row);
    });

    container.appendChild(chartWrap);
  }

  renderAdminStatusDistribution(apps) {
    const container = document.getElementById('admin-status-pie-chart');
    if (!container) return;

    const total = apps.length || 1;
    const counts = {
      Approved: apps.filter(a => a.status === 'Approved').length,
      Scrutiny: apps.filter(a => a.status === 'Under Scrutiny').length,
      Deficiency: apps.filter(a => a.status === 'Deficiency Raised').length,
      Rejected: apps.filter(a => a.status === 'Rejected').length,
      Submitted: apps.filter(a => a.status === 'Submitted').length
    };

    const colors = {
      Approved: '#15803d',
      Scrutiny: '#0369a1',
      Deficiency: '#b45309',
      Rejected: '#b91c1c',
      Submitted: '#2563eb'
    };

    container.innerHTML = `
      <div class="dist-stack">
        <div class="dist-segment" style="width: ${(counts.Approved / total) * 100}%; background:${colors.Approved};" title="Approved: ${counts.Approved}"></div>
        <div class="dist-segment" style="width: ${(counts.Scrutiny / total) * 100}%; background:${colors.Scrutiny};" title="Under Scrutiny: ${counts.Scrutiny}"></div>
        <div class="dist-segment" style="width: ${(counts.Deficiency / total) * 100}%; background:${colors.Deficiency};" title="Deficiency: ${counts.Deficiency}"></div>
        <div class="dist-segment" style="width: ${(counts.Submitted / total) * 100}%; background:${colors.Submitted};" title="Submitted: ${counts.Submitted}"></div>
        <div class="dist-segment" style="width: ${(counts.Rejected / total) * 100}%; background:${colors.Rejected};" title="Rejected: ${counts.Rejected}"></div>
      </div>
      <div class="dist-legend">
        <div class="dist-legend-item"><div class="dist-color-box" style="background:${colors.Approved};"></div> Approved (${counts.Approved})</div>
        <div class="dist-legend-item"><div class="dist-color-box" style="background:${colors.Scrutiny};"></div> Under Scrutiny (${counts.Scrutiny})</div>
        <div class="dist-legend-item"><div class="dist-color-box" style="background:${colors.Deficiency};"></div> Deficiency Raised (${counts.Deficiency})</div>
        <div class="dist-legend-item"><div class="dist-color-box" style="background:${colors.Submitted};"></div> Submitted Fresh (${counts.Submitted})</div>
        <div class="dist-legend-item"><div class="dist-color-box" style="background:${colors.Rejected};"></div> Rejected (${counts.Rejected})</div>
      </div>
    `;
  }

  renderAdminEscalatedTable(apps) {
    const tbody = document.getElementById('admin-escalated-tbody');
    const badge = document.getElementById('admin-escalated-count-badge');
    if (!tbody) return;

    // Filter applications with age >= 15 or in deficiency
    const escalated = apps.filter(a => a.slaDaysElapsed >= 15 || a.status === 'Deficiency Raised');
    if (badge) badge.textContent = `${escalated.length} Applications Flagged`;

    tbody.innerHTML = '';
    escalated.forEach(app => {
      const tr = document.createElement('tr');
      const pendingDepts = [];
      Object.keys(app.scrutiny).forEach(dk => {
        if (app.scrutiny[dk].status === 'Pending' || app.scrutiny[dk].status === 'Deficiency') {
          const dObj = DEPARTMENTS.find(d => d.id === dk);
          pendingDepts.push(dObj ? dObj.name.split(' ')[0] : dk);
        }
      });

      const ageClass = this.getSlaAgeClass(app.slaDaysElapsed);

      tr.innerHTML = `
        <td><a href="#" class="admin-app-link" data-id="${app.id}"><strong>${app.id}</strong></a></td>
        <td>${app.applicantName}</td>
        <td>${app.ward.split('-')[0]}</td>
        <td>
          <span class="sla-age-badge ${ageClass}">
            <span class="age-days">${app.slaDaysElapsed} Days</span>
          </span>
        </td>
        <td>${pendingDepts.join(', ') || 'Under final sign-off'}</td>
        <td>
          <span class="status-badge ${this.getStatusBadgeClass(app.status)}">${app.status}</span>
        </td>
        <td class="text-right">
          <button type="button" class="btn btn-secondary btn-small btn-expedite-notice" data-id="${app.id}">
            Nudge Cell
          </button>
        </td>
      `;

      tr.querySelector('.admin-app-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.showView('application-details', { id: app.id });
      });

      tr.querySelector('.btn-expedite-notice')?.addEventListener('click', () => {
        PermitNowStore.addNotification('Executive Priority Notice', `Municipal Commissioner issued expedite notice for ${app.id}.`, app.id);
        this.updateNotificationsUI();
        this.showToast('Priority Notice Issued', `Statutory priority reminder sent to pending scrutiny officers for ${app.id}.`, 'warning');
      });

      tbody.appendChild(tr);
    });
  }

  // --------------------------------------------------------------------------
  // Modals System: Payment, Sanction Order, Document Preview
  // --------------------------------------------------------------------------
  bindModals() {
    // Fee Payment modal
    document.getElementById('btn-close-payment-modal')?.addEventListener('click', () => {
      document.getElementById('modal-fee-payment')?.classList.add('hidden');
    });
    document.getElementById('btn-cancel-payment')?.addEventListener('click', () => {
      document.getElementById('modal-fee-payment')?.classList.add('hidden');
    });

    const paymentForm = document.getElementById('form-simulate-payment');
    paymentForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.completeSimulatedPayment();
    });

    // Sanction Letter modal
    document.getElementById('btn-close-sanction-modal')?.addEventListener('click', () => {
      document.getElementById('modal-sanction-letter')?.classList.add('hidden');
    });

    document.getElementById('btn-print-sanction')?.addEventListener('click', () => {
      window.print();
    });

    // Document Preview modal
    document.getElementById('btn-close-doc-modal')?.addEventListener('click', () => {
      document.getElementById('modal-doc-preview')?.classList.add('hidden');
    });
  }

  openPaymentModal(appId) {
    const app = PermitNowStore.getApplicationById(appId);
    if (!app) return;

    this.activeApplicationId = app.id;
    const totalFee = app.feeAmount || 50000;
    const scrutinyPart = Math.round(totalFee * 0.35);
    const cessPart = Math.round(totalFee * 0.50);
    const bettermentPart = totalFee - scrutinyPart - cessPart;

    document.getElementById('pay-modal-app-id').textContent = app.id;
    document.getElementById('pay-modal-scrutiny-fee').innerHTML = `&#8377; ${scrutinyPart.toLocaleString('en-IN')}.00`;
    document.getElementById('pay-modal-cess-fee').innerHTML = `&#8377; ${cessPart.toLocaleString('en-IN')}.00`;
    document.getElementById('pay-modal-betterment-fee').innerHTML = `&#8377; ${bettermentPart.toLocaleString('en-IN')}.00`;
    document.getElementById('pay-modal-total').innerHTML = `&#8377; ${totalFee.toLocaleString('en-IN')}.00`;

    document.getElementById('payment-reference').value = `CHL-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;

    document.getElementById('modal-fee-payment')?.classList.remove('hidden');
  }

  completeSimulatedPayment() {
    const app = PermitNowStore.getApplicationById(this.activeApplicationId);
    if (!app) return;

    const receiptNo = `MNC-REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const mode = document.getElementById('payment-channel')?.value || 'Online Cyber-Treasury';

    app.feeStatus = 'Paid';
    app.feeReceipt = receiptNo;

    // Advance status if it was just Submitted
    if (app.status === 'Submitted') {
      app.status = 'Under Scrutiny';
      // Route to departments
      Object.keys(app.scrutiny).forEach(k => {
        if (app.scrutiny[k].status === 'Draft' || app.scrutiny[k].status === 'Pending') {
          app.scrutiny[k].status = 'Pending';
        }
      });
    }

    app.timeline.unshift({
      title: 'Municipal Scrutiny Fees Confirmed',
      date: 'Just now',
      note: `Receipt ${receiptNo} issued via ${mode} for ₹${app.feeAmount.toLocaleString('en-IN')}. File released to departmental desks.`
    });

    PermitNowStore.saveOrUpdateApplication(app);
    PermitNowStore.addNotification('Fee Payment Verified', `Treasury receipt ${receiptNo} generated for ${app.id}.`, app.id);

    document.getElementById('modal-fee-payment')?.classList.add('hidden');
    this.updateNotificationsUI();
    this.showToast('Payment Successful', `Receipt ${receiptNo} issued. Scrutiny initiated.`, 'success');

    if (this.currentView === 'applicant-dashboard') {
      this.renderApplicantDashboard();
    } else {
      this.renderApplicationDetails(app.id);
    }
  }

  openSanctionModal(appId) {
    const app = PermitNowStore.getApplicationById(appId);
    if (!app) return;

    document.getElementById('sanction-permit-no').textContent = app.permitNo || 'MNC/BP/2026/0412';
    document.getElementById('sanction-issue-date').textContent = app.sanctionDate ? this.formatDate(app.sanctionDate) : '04-Mar-2026';
    document.getElementById('sanction-applicant-name').textContent = app.applicantName;
    document.getElementById('sanction-plot-details').textContent = `${app.plotNo}, ${app.surveyNo}`;
    document.getElementById('sanction-ward-name').textContent = app.ward;

    document.getElementById('sanction-builtup').textContent = `${app.builtupArea} sq. meters`;
    document.getElementById('sanction-far').textContent = app.far;
    document.getElementById('sanction-floors').textContent = app.floors;
    document.getElementById('sanction-height').textContent = `${app.heightMeters} meters`;
    document.getElementById('sanction-occupancy').textContent = app.occupancy;
    document.getElementById('sanction-parking').textContent = `${app.parkingSlots} ECS`;

    document.getElementById('modal-sanction-letter')?.classList.remove('hidden');
  }

  openDocumentModal(doc) {
    const modal = document.getElementById('modal-doc-preview');
    const canvas = document.getElementById('doc-preview-canvas');
    const meta = document.getElementById('doc-preview-meta');

    if (canvas) {
      canvas.innerHTML = `
        <div style="font-size:3rem; margin-bottom:1rem;">📐</div>
        <h3 style="color:#ffffff; font-size:1.25rem; margin-bottom:0.5rem;">${doc.name}</h3>
        <p style="color:#94a3b8; font-size:0.875rem; text-align:center; max-width:400px;">
          Vector CAD drawings and layers verified against municipal building byelaw rules. No encroachments identified.
        </p>
      `;
    }

    if (meta) {
      meta.innerHTML = `
        <strong>File Classification:</strong> ${doc.type} &bull; 
        <strong>Simulated Size:</strong> ${doc.size} &bull; 
        <strong>Upload Date:</strong> ${doc.date} &bull; 
        <strong>Hash Status:</strong> Cryptographically Verified
      `;
    }

    modal?.classList.remove('hidden');
  }

  // --------------------------------------------------------------------------
  // Utility Functions
  // --------------------------------------------------------------------------
  getStatusBadgeClass(status) {
    switch (status) {
      case 'Approved': return 'badge-approved';
      case 'Under Scrutiny': return 'badge-scrutiny';
      case 'Deficiency Raised':
      case 'Deficiency': return 'badge-deficiency';
      case 'Submitted': return 'badge-submitted';
      case 'Rejected': return 'badge-rejected';
      case 'Draft': return 'badge-draft';
      default: return 'badge-draft';
    }
  }

  getSlaAgeClass(days) {
    if (days > 30) return 'breached';
    if (days >= 20) return 'critical';
    if (days >= 10) return 'mid';
    return 'fresh';
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const mIdx = parseInt(parts[1], 10) - 1;
        return `${parts[2]}-${months[mIdx] || parts[1]}-${parts[0]}`;
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  }

  showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'danger') icon = '✕';
    if (type === 'warning') icon = '⚠';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}

// Initialize Application once DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {
  window.permitNowApp = new AppUI();
  window.permitNowApp.init();
});
