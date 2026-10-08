/* ============================================================
   Apex Signing & Biometric Group, LLC — Site JS
   - Sticky nav transparency toggle on scroll
   - Mobile nav open/close
   - Sticky mobile CTA visibility
   - Data-driven services (statuses flip without HTML edits)
   - FAQ accordion rendered from data
   - Contact form demo submit
   - Current year in footer
   ============================================================ */

// Edit SERVICES + FAQS to change site content without touching HTML.

const SERVICES = [
  {
    key: 'loan_signing',
    title: 'Loan Signing Services',
    description: 'Accurate, timely, and detail-oriented loan signings for lenders, title companies, and signing services.',
    status: 'available',
    icon: 'signing'
  },
  {
    key: 'notary',
    title: 'Notary Services',
    description: 'General notary work including acknowledgments, jurats, affidavits, and more.',
    status: 'available',
    icon: 'notary'
  },
  {
    key: 'biometric',
    title: 'Biometric Services',
    description: 'Livescan fingerprinting for background checks, licensing, employment, and more.',
    status: 'coming_soon',
    icon: 'biometric'
  },
  {
    key: 'corporate',
    title: 'Corporate & Business Services',
    description: 'Business document signings, resolutions, agreements, and more.',
    status: 'available',
    icon: 'building'
  },
  {
    key: 'apostille',
    title: 'Apostille & Authentication Support',
    description: 'Guidance and assistance with apostille and document authentication.',
    status: 'available',
    icon: 'apostille'
  },
  {
    key: 'trust_estate',
    title: 'Trust & Estate Document Signings',
    description: 'Compassionate, professional handling of sensitive and important documents.',
    status: 'available',
    icon: 'scales'
  }
];

const STATUS_LABELS = {
  available: 'Available',
  coming_soon: 'Coming Soon',
  by_appointment: 'By Appointment',
  temporarily_unavailable: 'Temporarily Unavailable'
};

const SERVICE_ICONS = {
  notary: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 3 H14 L19 8 V21 H5 V5 A2 2 0 0 1 7 3 Z M14 3 V8 H19 M9 13 H15 M9 17 H14"/></svg>`,
  signing: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 20 L8 20 L20 8 L16 4 L4 16 Z M14 6 L18 10 M4 20 C 8 18, 12 22, 20 20"/></svg>`,
  apostille: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12 H21 M12 3 C 14.5 6, 14.5 18, 12 21 M12 3 C 9.5 6, 9.5 18, 12 21" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  biometric: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M8 21 C 6 18, 5 15, 5 12 A7 7 0 0 1 19 12 C 19 15, 18 18, 16 21 M8.5 12 A3.5 3.5 0 0 1 15.5 12 C 15.5 15, 14.5 18, 13 21 M11.5 12 V16"/></svg>`,
  id: `<svg viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 17 C 6.5 15.5, 8 15, 9 15 C 10 15, 11.5 15.5, 12 17 M14 10 H18 M14 13 H18 M14 16 H17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  documents: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M8 6 H15 L19 10 V20 H8 Z M15 6 V10 H19"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M5 3 H12 L16 7 V17" opacity="0.55"/></svg>`,
  building: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M5 21 V5 H19 V21 Z M9 8 H10 M13 8 H14 M9 12 H10 M13 12 H14 M9 16 H10 M13 16 H14 M11 17 V21"/></svg>`,
  scales: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M12 4 V20 M8 20 H16 M5 8 H19 M12 5 L5 8 L2 14 A3 3 0 0 0 8 14 L5 8 M12 5 L19 8 L16 14 A3 3 0 0 0 22 14 L19 8"/></svg>`
};

const FAQS = [
  {
    q: 'What identification is required for notarization?',
    a: 'A current, government-issued photo ID is typically required. Details will be confirmed during scheduling so you know exactly what to bring.'
  },
  {
    q: 'Do you offer mobile appointments?',
    a: 'Yes. Apex is set up to travel to you at a mutually convenient location. Availability and any travel considerations will be confirmed at scheduling.'
  },
  {
    q: 'How do I schedule an appointment?',
    a: 'Use the Book an Appointment button, or send a message through the contact form on this page. Apex will confirm your appointment personally.'
  },
  {
    q: 'What forms of payment are accepted?',
    a: 'Accepted payment methods will be listed at the time of scheduling. Details will be published here once finalized.'
  },
  {
    q: 'What is a loan signing appointment?',
    a: 'A loan signing is a coordinated appointment where a signing agent walks the signer through mortgage or loan closing documents and notarizes what is required.'
  },
  {
    q: 'What is an apostille?',
    a: 'An apostille is a certification that authenticates the origin of a public document so it can be recognized in another country party to the Hague Convention.'
  },
  {
    q: 'How should I prepare for my appointment?',
    a: 'Have your government-issued ID ready, review your documents in advance, and note any pages that require witnesses or additional signatures. Apex will confirm the specifics with you before the appointment.'
  },
  {
    q: 'Do you provide fingerprinting or Live Scan services?',
    a: 'Live Scan and biometric services are being added and will be marked Available on this page as soon as they launch.'
  }
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Header is solid on this design (hero is white) — no scroll-based transparency
const header = $('#siteHeader');
header.dataset.transparent = 'false';

// Mobile nav toggle
const navToggle = $('#navToggle');
const primaryNav = $('#primaryNav');
navToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
$$('#primaryNav a').forEach(a => a.addEventListener('click', () => {
  primaryNav.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// Sticky mobile CTA — surfaces after the hero on narrow viewports
const stickyCta = $('#stickyCta');
function updateStickyCta() {
  if (window.innerWidth > 720) { stickyCta.classList.remove('visible'); return; }
  const hero = $('.hero');
  const showAfter = hero ? hero.offsetHeight - 100 : 300;
  stickyCta.classList.toggle('visible', window.scrollY > showAfter);
}
window.addEventListener('scroll', updateStickyCta, { passive: true });
window.addEventListener('resize', updateStickyCta);
updateStickyCta();

// Render services
function renderServices() {
  const grid = $('#serviceGrid');
  grid.innerHTML = SERVICES.map(s => `
    <article class="service-card">
      <span class="service-icon" aria-hidden="true">${SERVICE_ICONS[s.icon] || ''}</span>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <span class="status-pill ${s.status}" aria-label="Status: ${STATUS_LABELS[s.status]}">${STATUS_LABELS[s.status]}</span>
    </article>
  `).join('');
}
renderServices();

// Render FAQs
function renderFaqs() {
  const list = $('#faqList');
  list.innerHTML = FAQS.map(f => `
    <details class="faq-item">
      <summary>${f.q}</summary>
      <div class="faq-answer">${f.a}</div>
    </details>
  `).join('');
}
renderFaqs();

// Footer year
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

