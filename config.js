// ============================================================
// Sri Viswa School Management System
// Master Configuration File
// ============================================================
// 
// ⚠️ This file contains ALL configuration values.
// Change any value here → reflects everywhere in the app.
// No need to edit other files for:
//   • Class names, sections
//   • Subjects
//   • School info
//   • Session times
//   • Retention policies
// ============================================================

window.SV_CONFIG = {

  // ============================================================
  // SCHOOL INFORMATION
  // ============================================================
  school: {
    name: "Sri Viswa School",
    shortName: "Sri Viswa",
    location: "Palakollu",
    tagline: "An initiative of @VALIASS team",
    principalName: "K. Rama Krishna"  // Default (updated after setup)
  },

  // ============================================================
  // VALIASS MASTER CODE (Team only — NEVER show anywhere)
  // ============================================================
  valiass: {
    masterCode: "ippanapadu@533340"
  },

  // ============================================================
  // PIN FORMULA
  // ============================================================
  // Teacher/Office PIN = 9999 - (last 4 digits of phone)
  // Example: Phone 9876543210 → 9999 - 3210 = 6789
  // ============================================================
  pinFormula: {
    base: 9999,
    method: "subtract"
  },

  // ============================================================
  // SESSION TIMEOUT (minutes)
  // ============================================================
  session: {
    staffTimeout: 15,    // Teacher, Office, Principal
    parentTimeout: 0     // 0 = no timeout
  },

  // ============================================================
  // CLASSES (1st to 10th)
  // ============================================================
  // code = used in student code (01-10)
  // display = shown in UI
  // ============================================================
  classes: [
    { display: "1st Class",  code: "01" },
    { display: "2nd Class",  code: "02" },
    { display: "3rd Class",  code: "03" },
    { display: "4th Class",  code: "04" },
    { display: "5th Class",  code: "05" },
    { display: "6th Class",  code: "06" },
    { display: "7th Class",  code: "07" },
    { display: "8th Class",  code: "08" },
    { display: "9th Class",  code: "09" },
    { display: "10th Class", code: "10" }
  ],

  // ============================================================
  // SECTIONS
  // ============================================================
  // A, B, C or "0" (No Section)
  // ============================================================
  sections: [
    { display: "A",          code: "A" },
    { display: "B",          code: "B" },
    { display: "C",          code: "C" },
    { display: "No Section", code: "0" }
  ],

  // ============================================================
  // SUBJECTS BY CLASS GROUP
  // ============================================================
  subjects: {
    primary:      ["Telugu", "Hindi", "English", "Maths", "EVS", "Computers"],
    middle:       ["Telugu", "Hindi", "English", "Maths", "GS", "Social", "Computers", "Vedic Maths"],
    upperMiddle:  ["Telugu", "Hindi", "English", "Maths", "GS", "Social"],
    highSchool:   ["Telugu", "Hindi", "English", "Maths", "Social", "Physics", "Biology"]
  },

  // ============================================================
  // CLASS → GROUP MAPPING
  // ============================================================
  classGroups: {
    "01": "primary",     "02": "primary",
    "03": "middle",      "04": "middle",      "05": "middle",
    "06": "upperMiddle", "07": "upperMiddle",
    "08": "highSchool",  "09": "highSchool",  "10": "highSchool"
  },

  // ============================================================
  // STUDENT CODE SETTINGS
  // ============================================================
  studentCode: {
    length: 5,
    classDigits: 2,
    sectionDigits: 1,
    rollDigits: 2,
    padChar: "0"
  },

  // ============================================================
  // DATA RETENTION (days)
  // ============================================================
  retention: {
    ediary: 10,           // E-Diary auto-delete
    announcements: 30,    // Announcements auto-delete
    notifications: 7,     // Notifications auto-delete
    attendance: 180,      // 6 months
    marks: 365,           // 1 year
    leave: 90,            // 3 months
    fees: 1095            // 3 years
  },

  // ============================================================
  // FEATURE TOGGLES
  // ============================================================
  // true = enabled, false = hidden/disabled
  // ============================================================
  features: {
    diary: true,
    announcements: true,
    attendance: true,
    marks: true,
    fees: false,          // Phase 5
    leave: true,
    timetable: false,     // Phase 6
    events: false,        // Phase 6
    pngGeneration: true,
    whatsappShare: true
  },

  // ============================================================
  // COLORS (Design System)
  // ============================================================
  colors: {
    navy:       "#002B4A",
    blue:       "#005799",
    brightBlue: "#2E83C6",
    green:      "#00923F",
    gold:       "#E0A800",
    goldLight:  "#FFC107",
    red:        "#D32F2F",
    waGreen:    "#25D366",
    muted:      "#607789",
    background: "#F4F8FC"
  },

  // ============================================================
  // CONTACT INFO (Footer)
  // ============================================================
  contact: {
    phone: "+918985361991",
    whatsapp: "918985361991"
  }

};
