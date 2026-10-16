// ============================================================
// Sri Viswa School Management System
// Utility Functions
// ============================================================
// 
// All helper functions used across the app.
// Depends on: config.js (must be loaded first)
// ============================================================

(function() {
  "use strict";

  // ============================================================
  // STUDENT CODE FUNCTIONS
  // ============================================================

  /**
   * Build student code from class, section, roll
   * @param {string} classCode - "01" to "10"
   * @param {string} sectionCode - "A", "B", "C", or "0"
   * @param {number|string} roll - 1 to 99
   * @returns {string} 5-char code (e.g., "06A03")
   */
  function buildStudentCode(classCode, sectionCode, roll) {
    const cfg = window.SV_CONFIG.studentCode;
    const c = String(classCode).padStart(cfg.classDigits, cfg.padChar);
    const s = String(sectionCode || "0").toUpperCase().slice(0, cfg.sectionDigits);
    const r = String(roll).padStart(cfg.rollDigits, cfg.padChar);
    return c + s + r;
  }

  /**
   * Parse student code into parts
   * @param {string} code - e.g., "06A03"
   * @returns {object} { classCode, sectionCode, roll }
   */
  function parseStudentCode(code) {
    const cfg = window.SV_CONFIG.studentCode;
    const str = String(code || "").toUpperCase();
    const c = str.slice(0, cfg.classDigits);
    const s = str.slice(cfg.classDigits, cfg.classDigits + cfg.sectionDigits);
    const r = str.slice(cfg.classDigits + cfg.sectionDigits);
    return { classCode: c, sectionCode: s, roll: r };
  }

  /**
   * Normalize student code input
   * "06a03" → "06A03"
   * " 06-a-03 " → "06A03"
   * @param {string} input
   * @returns {string} normalized 5-char code
   */
  function normalizeStudentCode(input) {
    return String(input || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, window.SV_CONFIG.studentCode.length);
  }

  // ============================================================
  // CLASS HELPERS
  // ============================================================

  /**
   * Get class object by code
   * @param {string} code - e.g., "06"
   * @returns {object|undefined} { display, code }
   */
  function getClassByCode(code) {
    return window.SV_CONFIG.classes.find(c => c.code === code);
  }

  /**
   * Get class display name by code
   * @param {string} code
   * @returns {string} e.g., "6th Class"
   */
  function getClassNameByCode(code) {
    const cls = getClassByCode(code);
    return cls ? cls.display : "—";
  }

  // ============================================================
  // SECTION HELPERS
  // ============================================================

  /**
   * Get section object by code
   * @param {string} code - "A", "B", "C", or "0"
   * @returns {object|undefined} { display, code }
   */
  function getSectionByCode(code) {
    return window.SV_CONFIG.sections.find(s => s.code === code);
  }

  /**
   * Get section display name by code
   * @param {string} code
   * @returns {string} e.g., "A" or "No Section"
   */
  function getSectionNameByCode(code) {
    const sec = getSectionByCode(code);
    return sec ? sec.display : "—";
  }

  // ============================================================
  // SUBJECT HELPERS
  // ============================================================

  /**
   * Get subjects list for a class code
   * @param {string} classCode - e.g., "06"
   * @returns {array} list of subject names
   */
  function getSubjectsForClass(classCode) {
    const group = window.SV_CONFIG.classGroups[classCode];
    return window.SV_CONFIG.subjects[group] || [];
  }

  // ============================================================
  // PIN FUNCTIONS
  // ============================================================

  /**
   * Calculate PIN from phone number
   * PIN = 9999 - (last 4 digits)
   * @param {string} phone
   * @returns {string} 4-digit PIN
   */
  function calculatePIN(phone) {
    const cleaned = String(phone || "").replace(/\D/g, "");
    if (cleaned.length < 4) return "0000";
    const last4 = parseInt(cleaned.slice(-4), 10);
    const pin = window.SV_CONFIG.pinFormula.base - last4;
    return String(pin).padStart(4, "0");
  }

  // ============================================================
  // DATE HELPERS
  // ============================================================

  /**
   * Today's date in ISO format
   * @returns {string} "2026-10-16"
   */
  function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  /**
   * Format ISO date to display format
   * "2026-10-16" → "16-10-2026"
   * @param {string} iso
   * @returns {string}
   */
  function prettyDate(iso) {
    if (!iso) return "";
    const parts = String(iso).split("-");
    if (parts.length !== 3) return iso;
    const [y, m, d] = parts;
    return `${d}-${m}-${y}`;
  }

  /**
   * Format time from timestamp
   * @param {number} ts - milliseconds timestamp
   * @returns {string} e.g., "10:45 AM"
   */
  function prettyTime(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  /**
   * Current timestamp formatted
   * @returns {string} "16-10-2026 at 10:45 AM"
   */
  function nowFormatted() {
    const now = new Date();
    const iso = now.toISOString().slice(0, 10);
    return `${prettyDate(iso)} at ${prettyTime(now.getTime())}`;
  }

  /**
   * Normalize DOB input to ISO format
   * Accepts: DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY, YYYY-MM-DD
   * @param {string} input
   * @returns {string|null} "2014-08-15" or null if invalid
   */
  function normalizeDOB(input) {
    if (!input) return null;
    const cleaned = String(input).trim().replace(/[./]/g, "-");
    
    // Already ISO: YYYY-MM-DD
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(cleaned)) {
      const [y, m, d] = cleaned.split("-");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    
    // DD-MM-YYYY
    if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(cleaned)) {
      const [d, m, y] = cleaned.split("-");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    
    return null;
  }

  // ============================================================
  // HTML HELPERS
  // ============================================================

  /**
   * Escape HTML special characters
   * @param {string} s
   * @returns {string}
   */
  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  // ============================================================
  // DROPDOWN BUILDERS
  // ============================================================

  /**
   * Build class dropdown HTML
   * @param {string} selected - currently selected code
   * @returns {string} HTML options
   */
  function buildClassDropdown(selected) {
    return window.SV_CONFIG.classes.map(c =>
      `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${c.display}</option>`
    ).join("");
  }

  /**
   * Build section dropdown HTML
   * @param {string} selected - currently selected code
   * @returns {string} HTML options
   */
  function buildSectionDropdown(selected) {
    return window.SV_CONFIG.sections.map(s =>
      `<option value="${s.code}" ${s.code === selected ? "selected" : ""}>${s.display}</option>`
    ).join("");
  }

  // ============================================================
  // LOCAL STORAGE HELPERS
  // ============================================================

  /**
   * Save data to localStorage
   * @param {string} key
   * @param {any} value
   */
  function saveLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("localStorage save failed:", e);
      return false;
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key
   * @param {any} defaultValue
   * @returns {any}
   */
  function loadLocal(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("localStorage load failed:", e);
      return defaultValue;
    }
  }

  /**
   * Remove from localStorage
   * @param {string} key
   */
  function clearLocal(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage clear failed:", e);
    }
  }

  // ============================================================
  // SESSION MANAGEMENT
  // ============================================================

  const SESSION_KEY = "svs_session_activity";

  /**
   * Update session activity timestamp
   */
  function touchSession() {
    saveLocal(SESSION_KEY, Date.now());
  }

  /**
   * Check if session is expired
   * @param {number} timeoutMinutes - 0 = no timeout
   * @returns {boolean}
   */
  function isSessionExpired(timeoutMinutes) {
    if (!timeoutMinutes || timeoutMinutes <= 0) return false;
    const last = loadLocal(SESSION_KEY, null);
    if (!last) return false;
    const elapsed = (Date.now() - last) / 1000 / 60; // minutes
    return elapsed >= timeoutMinutes;
  }

  /**
   * Clear session activity
   */
  function clearSession() {
    clearLocal(SESSION_KEY);
  }

  // ============================================================
  // TOAST NOTIFICATION
  // ============================================================

  /**
   * Show a toast message
   * @param {string} message
   * @param {string} type - "success" | "error" | "" (default)
   */
  function toast(message, type) {
    let el = document.getElementById("sv-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "sv-toast";
      el.className = "sv-toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.className = "sv-toast show" + (type ? " " + type : "");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2800);
  }

  // ============================================================
  // EXPORT ALL UTILITIES
  // ============================================================

  window.SV = {
    // Student code
    buildStudentCode,
    parseStudentCode,
    normalizeStudentCode,

    // Class/Section
    getClassByCode,
    getClassNameByCode,
    getSectionByCode,
    getSectionNameByCode,
    getSubjectsForClass,

    // PIN
    calculatePIN,

    // Date/Time
    todayISO,
    prettyDate,
    prettyTime,
    nowFormatted,
    normalizeDOB,

    // HTML
    escapeHtml,

    // Dropdowns
    buildClassDropdown,
    buildSectionDropdown,

    // LocalStorage
    saveLocal,
    loadLocal,
    clearLocal,

    // Session
    touchSession,
    isSessionExpired,
    clearSession,
    SESSION_KEY,

    // UI
    toast
  };

  console.log("✅ utils.js loaded");

})();
